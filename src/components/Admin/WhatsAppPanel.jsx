import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Header from "../Header";
import Aside from "../Aside";
import Footer from "../Footer";
import getConfig from "../../utils/getConfig";
import "./WhatsAppPanel.css";

const API_BASE = import.meta.env.VITE_API_SERVER;

const STATUS_META = {
    ready: { label: "Conectado", badge: "badge-success", icon: "fas fa-check-circle" },
    authenticated: { label: "Autenticado", badge: "badge-info", icon: "fas fa-user-shield" },
    qr: { label: "Esperando QR", badge: "badge-warning", icon: "fas fa-qrcode" },
    loading: { label: "Cargando", badge: "badge-primary", icon: "fas fa-spinner" },
    disconnected: { label: "Desconectado", badge: "badge-danger", icon: "fas fa-plug" },
    auth_failure: { label: "Fallo de autenticacion", badge: "badge-danger", icon: "fas fa-exclamation-triangle" },
    init_error: { label: "Error de inicio", badge: "badge-danger", icon: "fas fa-times-circle" },
    starting: { label: "Iniciando", badge: "badge-secondary", icon: "fas fa-power-off" },
    initializing: { label: "Inicializando", badge: "badge-secondary", icon: "fas fa-cog" },
};

const inferClientState = (state) => {
    if (state?.clientState) return state.clientState;

    if (state?.status === "ready") return "CONNECTED";
    if (state?.status === "qr") return "UNPAIRED";
    if (state?.status === "loading" || state?.status === "starting" || state?.status === "authenticated") {
        return "OPENING";
    }

    if (state?.status === "disconnected") return "DISCONNECTED";
    return "-";
};

const WhatsAppPanel = () => {
    const [session, setSession] = useState(null);
    const [socketConnected, setSocketConnected] = useState(false);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchStatus = useCallback(async () => {
        try {
            setError("");
            const URL = `${API_BASE}/api/v1/whatsapp/admin/session-status`;
            const res = await axios.get(URL, getConfig());

            setSession((prev) => {
                const next = {
                    ...(prev || {}),
                    ...(res.data || {}),
                };

                next.clientState = inferClientState(next);
                return next;
            });
        } catch (err) {
            setError(err?.response?.data?.message || "No se pudo cargar el estado de WhatsApp");
        } finally {
            setLoading(false);
        }
    }, []);

    const executeAction = async (endpoint) => {
        try {
            setActionLoading(true);
            setError("");
            const URL = `${API_BASE}${endpoint}`;
            await axios.post(URL, {}, getConfig());
        } catch (err) {
            setError(err?.response?.data?.message || "La accion no pudo completarse");
        } finally {
            setActionLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();

        const socket = io(API_BASE, {
            transports: ["websocket", "polling"],
            withCredentials: true,
        });

        socket.on("connect", () => setSocketConnected(true));
        socket.on("disconnect", () => setSocketConnected(false));

        socket.on("whatsapp:status", (payload) => {
            setSession((prev) => {
                const next = {
                    ...(prev || {}),
                    ...(payload || {}),
                };

                next.clientState = inferClientState(next);
                return next;
            });
            setLoading(false);
        });

        socket.on("whatsapp:qr", (payload) => {
            setSession((prev) => {
                const next = {
                    ...(prev || {}),
                    qrImageUrl: payload?.qrImageUrl || null,
                    updatedAt: payload?.updatedAt || prev?.updatedAt,
                };

                next.clientState = inferClientState(next);
                return next;
            });
        });

        return () => {
            socket.disconnect();
        };
    }, [fetchStatus]);

    useEffect(() => {
        if (socketConnected) return undefined;

        const intervalId = setInterval(() => {
            fetchStatus();
        }, 12000);

        return () => clearInterval(intervalId);
    }, [socketConnected, fetchStatus]);

    const qrSrc = useMemo(() => {
        if (!session?.qrImageUrl) return "";
        if (session.qrImageUrl.startsWith("http")) return session.qrImageUrl;
        return `${API_BASE}${session.qrImageUrl}`;
    }, [session]);

    const statusMeta = STATUS_META[session?.status] || {
        label: session?.status || "Sin datos",
        badge: "badge-secondary",
        icon: "fas fa-info-circle",
    };

    return (
        <>
            <Header />
            <Aside />

            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Panel de WhatsApp</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">Administracion</li>
                                    <li className="breadcrumb-item active">WhatsApp</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        {error ? (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        ) : null}

                        <div className="row">
                            <div className="col-lg-5 mb-3">
                                <div className="card card-outline card-primary h-100 wa-summary-card">
                                    <div className="card-header border-0 d-flex justify-content-between align-items-center">
                                        <h3 className="card-title mb-0">Estado en vivo</h3>
                                        <span className={`badge ${socketConnected ? "badge-success" : "badge-secondary"}`}>
                                            {socketConnected ? "Socket online" : "Socket offline"}
                                        </span>
                                    </div>
                                    <div className="card-body">
                                        {loading ? (
                                            <p className="text-muted mb-0">Cargando estado...</p>
                                        ) : (
                                            <>
                                                <div className="d-flex align-items-center mb-3 wa-status-line">
                                                    <i className={`${statusMeta.icon} mr-2`} />
                                                    <span className={`badge ${statusMeta.badge}`}>{statusMeta.label}</span>
                                                </div>

                                                <div className="wa-detail-grid">
                                                    <div>
                                                        <small className="text-muted d-block">Cliente</small>
                                                        <strong>{session?.clientState || "-"}</strong>
                                                    </div>
                                                    <div>
                                                        <small className="text-muted d-block">Actualizado</small>
                                                        <strong>
                                                            {session?.updatedAt
                                                                ? new Date(session.updatedAt).toLocaleString()
                                                                : "-"}
                                                        </strong>
                                                    </div>
                                                </div>

                                                <div className="wa-message-box mt-3">
                                                    <small className="text-muted d-block">Mensaje</small>
                                                    <span>{session?.message || "Sin mensaje"}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="card-footer bg-transparent border-0 d-flex" style={{ gap: "0.5rem" }}>
                                        <button
                                            className="btn btn-warning"
                                            disabled={actionLoading}
                                            onClick={() => executeAction("/api/v1/whatsapp/admin/session-restart")}
                                        >
                                            Reiniciar sesion
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            disabled={actionLoading}
                                            onClick={() => executeAction("/api/v1/whatsapp/admin/session-logout")}
                                        >
                                            Cerrar sesion
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-7 mb-3">
                                <div className="card card-outline card-success h-100 wa-qr-card">
                                    <div className="card-header border-0">
                                        <h3 className="card-title">Codigo QR</h3>
                                    </div>
                                    <div className="card-body text-center d-flex align-items-center justify-content-center">
                                        {qrSrc ? (
                                            <img src={qrSrc} alt="QR de WhatsApp" className="wa-qr-image" />
                                        ) : (
                                            <div className="wa-empty-state">
                                                <i className="fas fa-mobile-alt mb-2" />
                                                <p className="mb-0">
                                                    No hay QR activo. Si la sesion esta conectada, esto es normal.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
};

export default WhatsAppPanel;
