import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import getConfig from "../../../utils/getConfig";
import { Link } from "react-router-dom";

const SuperAdminSettings = () => {
    // 1. Estados de las Configuraciones Globales (El Mock del Sistema)
    const [globalSettings, setGlobalSettings] = useState({
        maintenanceMode: false,
        allowNewRegistrations: true,
        maxLoginAttempts: 5
    });
    const [isSavingGlobal, setIsSavingGlobal] = useState(false);

    // 2. Estados para el control de Personas Protegidas (Producción)
    const [protectedList, setProtectedList] = useState([]);
    const [isLoadingList, setIsLoadingList] = useState(false);
    const [newCitizenID, setNewCitizenID] = useState("");

    const API_URL = `${import.meta.env.VITE_API_SERVER}/api/v1/protected-citizens`;

    // Cargar el listado de control desde el Backend al montar el componente
    const fetchProtectedDashboard = async () => {
        setIsLoadingList(true);
        try {
            const res = await axios.get(`${API_URL}/dashboard`, getConfig());
            setProtectedList(res.data);
        } catch (error) {
            console.error("Error cargando dashboard de protección:", error);
            Swal.fire({
                icon: "error",
                title: "Error de conexión",
                text: "No se pudieron cargar los registros de ciudadanos protegidos.",
            });
        } finally {
            setIsLoadingList(false);
        }
    };

    useEffect(() => {
        fetchProtectedDashboard();
    }, []);

    // Manejadores para el Mock de Configuración Global
    const handleGlobalToggle = (key) => {
        setGlobalSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleSaveGlobalSettings = async () => {
        setIsSavingGlobal(true);
        // Aquí harás el fetch a tu endpoint de config global cuando lo crees
        console.log("Guardando configuración global:", globalSettings);

        setTimeout(() => {
            setIsSavingGlobal(false);
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Configuraciones del sistema guardadas (Local)",
                showConfirmButton: false,
                timer: 2500
            });
        }, 600);
    };

    // Manejador para Añadir una persona a la lista protegida
    const handleAddProtection = async (e) => {
        e.preventDefault();
        if (!newCitizenID.trim()) return;

        setIsLoadingList(true);
        try {
            const res = await axios.post(
                `${API_URL}/toggle`,
                {
                    citizenID: newCitizenID.trim(),
                    protectedStatus: true
                },
                getConfig()
            );

            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: res.data.message || "Ciudadano protegido con éxito",
                showConfirmButton: false,
                timer: 3000
            });

            setNewCitizenID("");
            fetchProtectedDashboard();
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error al registrar",
                text: error.response?.data?.message || "Ocurrió un error en el servidor.",
            });
        } finally {
            setIsLoadingList(false);
        }
    };

    // Manejador para Alternar el estado (True/False) en la tabla
    const handleToggleStatus = async (citizenID, currentStatus) => {
        const nextStatus = !currentStatus;

        try {
            const res = await axios.post(
                `${API_URL}/toggle`,
                {
                    citizenID,
                    protectedStatus: nextStatus
                },
                getConfig()
            );

            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: `Estado de protección actualizado`,
                showConfirmButton: false,
                timer: 2000
            });

            setProtectedList(prev =>
                prev.map(item =>
                    item.citizenID === citizenID
                        ? { ...item, protected: nextStatus, updatedBy: res.data.data.updatedBy }
                        : item
                )
            );
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "No se pudo cambiar el estado",
                text: error.response?.data?.message || "Error al procesar la solicitud.",
            });
        }
    };

    return (
        <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
            {/* Encabezado General */}
            <header style={{ marginBottom: "2rem", borderBottom: "1px solid #eee", paddingBottom: "12px" }}>
                <h1 style={{ fontSize: "2rem", color: "#1a1a1a", margin: 0 }}> Panel de Control Global (Super Admin)</h1>
                <p style={{ color: "#666", marginTop: "0.5rem" }}>Administración de directivas del sistema y listas de restricciones críticas.</p>
            </header>

            <div style={{ display: "grid", gap: "2rem" }}>

                {/* CARD 1: Configuración de Parámetros Globales (MOCK ANTERIOR) */}
                <section style={{ background: "#fff", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                    <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem", color: "#333", borderBottom: "1px solid #f0f0f0", paddingBottom: "8px" }}>
                        ⚙️ Estados y Parámetros del Sistema
                    </h2>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <strong>Modo Mantenimiento</strong>
                                <p style={{ margin: 0, fontSize: "0.875rem", color: "#666" }}>Bloquea el acceso a usuarios comunes temporalmente.</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={globalSettings.maintenanceMode}
                                onChange={() => handleGlobalToggle("maintenanceMode")}
                                style={{ width: "40px", height: "20px", cursor: "pointer" }}
                            />
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f0f0f0", paddingTop: "1rem" }}>
                            <div>
                                <strong>Permitir Nuevos Registros</strong>
                                <p style={{ margin: 0, fontSize: "0.875rem", color: "#666" }}>Habilita o deshabilita la creación de cuentas públicas.</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={globalSettings.allowNewRegistrations}
                                onChange={() => handleGlobalToggle("allowNewRegistrations")}
                                style={{ width: "40px", height: "20px", cursor: "pointer" }}
                            />
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", borderTop: "1px solid #f0f0f0", paddingTop: "1rem" }}>
                            <label htmlFor="loginAttempts" style={{ fontWeight: "600" }}>Intentos máximos de login antes de bloqueo:</label>
                            <input
                                id="loginAttempts"
                                type="number"
                                value={globalSettings.maxLoginAttempts}
                                onChange={(e) => setGlobalSettings(prev => ({ ...prev, maxLoginAttempts: parseInt(e.target.value) || 0 }))}
                                style={{ width: "70px", padding: "0.4rem", borderRadius: "4px", border: "1px solid #ccc" }}
                            />
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem" }}>
                        <button
                            onClick={handleSaveGlobalSettings}
                            disabled={isSavingGlobal}
                            style={{
                                padding: "0.6rem 1.5rem",
                                background: "#0070f3",
                                color: "#fff",
                                border: "none",
                                borderRadius: "6px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                opacity: isSavingGlobal ? 0.7 : 1
                            }}
                        >
                            {isSavingGlobal ? "Guardando..." : "Guardar Parámetros"}
                        </button>
                    </div>
                </section>


                {/* CARD 2: Formulario de Adición (PRODUCCIÓN - PERSONAS PROTEGIDAS) */}
                <section style={{ background: "#fff", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                    <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "#333" }}>🛡️ Restricción: Proteger Cédula</h2>
                    <form onSubmit={handleAddProtection} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <div style={{ flex: 1 }}>
                            <input
                                type="text"
                                placeholder="Ingrese Cédula del Ciudadano (ej. 001XXXXXXX)"
                                value={newCitizenID}
                                onChange={(e) => setNewCitizenID(e.target.value)}
                                disabled={isLoadingList}
                                style={{
                                    width: "100%",
                                    padding: "0.75rem",
                                    borderRadius: "6px",
                                    border: "1px solid #ccc",
                                    fontSize: "1rem"
                                }}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoadingList || !newCitizenID.trim()}
                            style={{
                                padding: "0.75rem 2rem",
                                background: "#28a745",
                                color: "#fff",
                                border: "none",
                                borderRadius: "6px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                opacity: isLoadingList ? 0.7 : 1
                            }}
                        >
                            {isLoadingList ? "Aplicando..." : "Activar Protección"}
                        </button>
                    </form>
                </section>


                {/* CARD 3: Tabla del Dashboard de Personas Protegidas (PRODUCCIÓN) */}
                <section style={{ background: "#fff", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                        <h2 style={{ fontSize: "1.25rem", margin: 0, color: "#333" }}>📊 Listado de Control de Ciudadanos Protegidos</h2>
                        <button
                            onClick={fetchProtectedDashboard}
                            style={{ background: "none", border: "none", color: "#0070f3", cursor: "pointer", fontWeight: "600" }}
                        >
                            🔄 Sincronizar Tabla
                        </button>
                    </div>

                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #dee2e6" }}>
                                    <th style={{ padding: "12px" }}>Cédula (CitizenID)</th>
                                    <th style={{ padding: "12px" }}>Nombre</th>
                                    <th style={{ padding: "12px" }}>Estado Actual</th>
                                    <th style={{ padding: "12px" }}>Creado por</th>
                                    <th style={{ padding: "12px" }}>Actualizado por</th>
                                    <th style={{ padding: "12px" }}>Último Cambio</th>
                                    <th style={{ padding: "12px", textAlign: "center" }}>Acción Rápida</th>
                                </tr>
                            </thead>
                            <tbody>
                                {protectedList.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" style={{ padding: "20px", textAlign: "center", color: "#888" }}>
                                            {isLoadingList ? "Cargando registros desde la base de datos..." : "No hay ciudadanos registrados en la lista de control."}
                                        </td>
                                    </tr>
                                ) : (
                                    protectedList.map((item) => (
                                        <tr key={item.id} style={{ borderBottom: "1px solid #dee2e6" }}>
                                            <td style={{ padding: "12px", fontWeight: "500" }}>{item.citizenID}</td>
                                            <td style={{ padding: "12px", fontWeight: "500" }}>
                                                {item.citizen ? (
                                                    `${item.citizen.firstName} ${item.citizen.lastName} ${item.citizen.lastNameB || ""}`.trim()
                                                ) : (
                                                    "N/D"
                                                )}
                                            </td>
                                            <td style={{ padding: "12px" }}>
                                                <span style={{
                                                    padding: "4px 8px",
                                                    borderRadius: "4px",
                                                    fontSize: "0.85rem",
                                                    fontWeight: "bold",
                                                    background: item.protected ? "#d4edda" : "#f8d7da",
                                                    color: item.protected ? "#155724" : "#721c24"
                                                }}>
                                                    {item.protected ? "🛡️ PROTEGIDO" : "🔓 DESPROTEGIDO"}
                                                </span>
                                            </td>
                                            <td style={{ padding: "12px", color: "#555", fontSize: "0.9rem" }}>
                                                {item.creatorUser ? (
                                                    <Link
                                                        to={`/users/${item.creatorUser.id}`}
                                                        style={{
                                                            color: "#0070f3",
                                                            textDecoration: "none",
                                                            fontWeight: "500"
                                                        }}
                                                        title={`Ver perfil de ${item.creatorUser.email}`}
                                                    >
                                                        {item.creatorUser.email}
                                                    </Link>
                                                ) : (
                                                    <span>Sistema</span>
                                                )}
                                            </td>
                                            <td style={{ padding: "12px", color: "#555", fontSize: "0.9rem" }}>
                                                {item.updaterUser ? (
                                                    <Link
                                                        to={`/users/${item.updaterUser.id}`}
                                                        style={{
                                                            color: "#0070f3",
                                                            textDecoration: "none",
                                                            fontWeight: "500"
                                                        }}
                                                        title={`Ver perfil de ${item.updaterUser.email}`}
                                                    >
                                                        {item.updaterUser.email}
                                                    </Link>
                                                ) : (
                                                    <span>Sistema</span>
                                                )}
                                            </td>
                                            <td style={{ padding: "12px", color: "#777", fontSize: "0.9rem" }}>
                                                {new Date(item.updatedAt).toLocaleString("es-DO")}
                                            </td>
                                            <td style={{ padding: "12px", textAlign: "center" }}>
                                                <button
                                                    onClick={() => handleToggleStatus(item.citizenID, item.protected)}
                                                    style={{
                                                        padding: "6px 12px",
                                                        backgroundColor: item.protected ? "#dc3545" : "#007bff",
                                                        color: "#fff",
                                                        border: "none",
                                                        borderRadius: "4px",
                                                        cursor: "pointer",
                                                        fontSize: "0.85rem",
                                                        fontWeight: "600"
                                                    }}
                                                >
                                                    {item.protected ? "Liberar" : "Restringir"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default SuperAdminSettings;