import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import getConfig from "../../utils/getConfig";
import "./SeeParties.css";

const SeeParties = ({ getAllParties, parties }) => {
    const totalParties = parties?.length ?? 0;

    const deleteParty = (id, partyName) => {
        Swal.fire({
            title: `Eliminar ${partyName}?`,
            text: "Esta accion no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Eliminar",
            confirmButtonColor: "#c0392b",
        }).then((result) => {
            if (!result.isConfirmed) {
                return;
            }

            const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/ballots/party/${id}`;

            axios
                .delete(URL, getConfig())
                .then(() => {
                    getAllParties();

                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener(
                                "mouseenter",
                                Swal.stopTimer
                            );
                            toast.addEventListener(
                                "mouseleave",
                                Swal.resumeTimer
                            );
                        },
                    });

                    Toast.fire({
                        icon: "success",
                        title: "Partido eliminado con exito",
                    });
                })
                .catch(() => {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 6000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener(
                                "mouseenter",
                                Swal.stopTimer
                            );
                            toast.addEventListener(
                                "mouseleave",
                                Swal.resumeTimer
                            );
                        },
                    });

                    Toast.fire({
                        icon: "error",
                        title: "Hubo un error, no se borro el partido",
                    });
                });
        });
    };

    return (
        <div className="see-parties-shell">
            <div className="see-parties-card">
                <div className="see-parties-hero">
                    <div>
                        <span className="see-parties-eyebrow">
                            Partidos politicos
                        </span>
                        <h3 className="see-parties-title">
                            Identidades registradas
                        </h3>
                        <p className="see-parties-subtitle">
                            Revisa los partidos disponibles en la boleta,
                            valida sus colores y elimina los que ya no deban
                            mostrarse.
                        </p>
                    </div>

                    <div className="see-parties-summary">
                        <strong>{totalParties}</strong>
                        <span>
                            {totalParties === 1
                                ? "partido cargado"
                                : "partidos cargados"}
                        </span>
                    </div>
                </div>

                {totalParties ? (
                    <div className="see-parties-grid">
                        {parties.map((party) => (
                            <article className="see-parties-item" key={party.id}>
                                <div
                                    className="see-parties-item-top"
                                    style={{
                                        background: `linear-gradient(135deg, ${party.color}, #243447)`,
                                    }}
                                >
                                    <span className="see-parties-badge">
                                        Partido
                                    </span>
                                    <div className="see-parties-acronym">
                                        {party.partyAcronyms}
                                    </div>
                                    <p className="see-parties-name">
                                        {party.partyName}
                                    </p>
                                </div>

                                <div className="see-parties-item-body">
                                    <div className="see-parties-compact-meta">
                                        <div className="see-parties-color-row">
                                            <span
                                                className="see-parties-color-dot"
                                                style={{
                                                    backgroundColor:
                                                        party.color,
                                                }}
                                            ></span>
                                            <strong>
                                                {party.color?.toUpperCase()}
                                            </strong>
                                        </div>
                                        <span className="see-parties-mini-label">
                                            Color oficial
                                        </span>
                                    </div>
                                </div>

                                <div className="see-parties-item-footer">
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger see-parties-delete"
                                        onClick={() =>
                                            deleteParty(
                                                party.id,
                                                party.partyName
                                            )
                                        }
                                    >
                                        <i className="fas fa-trash-alt mr-2"></i>
                                        Eliminar
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="see-parties-empty">
                        <div className="see-parties-empty-icon">
                            <i className="fas fa-flag"></i>
                        </div>
                        <h4>No hay partidos registrados</h4>
                        <p>
                            Crea el primer partido para empezar a asignarlo a
                            los candidatos de la boleta.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SeeParties;
