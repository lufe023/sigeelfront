import axios from "axios";
import React, { useEffect, useState } from "react";
import getConfig from "../../utils/getConfig";
import Aside from "../Aside";
import Footer from "../Footer";
import Header from "../Header";
import Swal from "sweetalert2";
import NewCandidate from "./NewCandidate";
import Cargando from "../../utils/Cargando";
import "./SeeBallot.css";
import NewParty from "./NewParty";
import SeeParties from "./SeeParties";

const SeeBallot = () => {
    const [candidates, setCandidates] = useState();
    const [parties, setParties] = useState();
    const [searchTerm, setSearchTerm] = useState("");

    const getAllParties = () => {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/ballots/party`;
        axios.get(URL, getConfig()).then((res) => {
            setParties(res.data.rows);
        });
    };

    const getAllCandidates = () => {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/ballots`;
        axios
            .get(URL, getConfig())
            .then((res) => {
                setCandidates(res.data.rows);
            })
            .catch((err) => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 6000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                });

                Toast.fire({
                    icon: "error",
                    title: `Accion no permitida: ${err.response.statusText}`,
                });
            });
    };
    useEffect(() => {
        getAllCandidates();
        getAllParties();
    }, []);

    const totalCandidates = candidates?.length ?? 0;
    const totalParties = parties?.length ?? 0;
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    const filteredCandidates =
        candidates?.filter((candidate) => {
            if (!normalizedSearchTerm) {
                return true;
            }

            const searchableContent = [
                candidate.name,
                candidate.nomination,
                candidate.partyDetails?.partyName,
                candidate.partyDetails?.partyAcronyms,
                candidate.province?.[0]?.Descripcion,
                candidate.municipality?.[0]?.description,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return searchableContent.includes(normalizedSearchTerm);
        }) ?? [];

    //funcion para eliminar un candidato
    const deleteCandidate = (candidateId, candidateName) => {
        Swal.fire({
            title: `¿Seguro quieres eliminar a <p>${candidateName}</p> de la Boleta?`,
            text: `Esta acción no se puede devolver`,
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Quitalo!",
        }).then((result) => {
            if (result.isConfirmed) {
                let timerInterval;
                Swal.fire({
                    title: "Eliminando!",
                    timer: 0,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const b = Swal.getHtmlContainer().querySelector("b");
                        timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft();
                        }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    },
                }).then((result) => {
                    /* Read more about handling dismissals below */
                });
                const URL = `${
                    import.meta.env.VITE_API_SERVER
                }/api/v1/ballots/${candidateId}`;
                axios
                    .delete(URL, getConfig())
                    .then((res) => {
                        Swal.fire(
                            "Eliminando",
                            "Accion realizada con éxito",
                            "success"
                        );
                        getAllCandidates();
                    })
                    .catch((err) => {
                        console.log(err);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Hubo un error!",
                        });
                    });
            }
        });
    };

    return (
        <div>
            <Header />
            <Aside />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Boleta</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="#">Dashboard</a>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        Boleta
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="row ballot-section-row">
                        <div className="col-12">
                            <div className="ballot-hero-card">
                                <div>
                                    <span className="ballot-eyebrow">
                                        Administracion electoral
                                    </span>
                                    <h2 className="ballot-hero-title">
                                        Gestion de boleta
                                    </h2>
                                    <p className="ballot-hero-subtitle">
                                        Centraliza candidatos, partidos y
                                        configuracion visual en una sola vista
                                        mas clara para operar sin perderte.
                                    </p>
                                </div>

                                <div className="ballot-stats-grid">
                                    <div className="ballot-stat-card">
                                        <strong>{totalCandidates}</strong>
                                        <span>Candidatos</span>
                                    </div>
                                    <div className="ballot-stat-card">
                                        <strong>{totalParties}</strong>
                                        <span>Partidos</span>
                                    </div>
                                    <div className="ballot-stat-card">
                                        <strong>{filteredCandidates.length}</strong>
                                        <span>Resultados</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row ballot-section-row">
                        <div className="col-12">
                            <div className="card ballot-candidates-panel">
                                <div className="card-header ballot-panel-header">
                                    <div>
                                        <span className="ballot-panel-kicker">
                                            Candidatos
                                        </span>
                                        <h3 className="card-title ballot-panel-title">
                                            Registro actual de la boleta
                                        </h3>
                                        <p className="ballot-panel-subtitle">
                                            Busca por nombre, partido, cargo o
                                            demarcacion para revisar rapidamente
                                            la informacion cargada.
                                        </p>
                                    </div>

                                    <div className="ballot-search-box">
                                        <span className="ballot-search-icon">
                                            <i className="fas fa-search"></i>
                                        </span>
                                        <div className="ballot-search-copy">
                                            <label htmlFor="ballot-search">
                                                Buscar candidato
                                            </label>
                                            <input
                                                id="ballot-search"
                                                type="text"
                                                name="table_search"
                                                className="form-control ballot-search-input"
                                                placeholder="Ej. senador, PRM, Santo Domingo..."
                                                value={searchTerm}
                                                onChange={(event) =>
                                                    setSearchTerm(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body table-responsive p-0">
                                    <table className="table table-head-fixed ballot-candidates-table">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Candidato</th>
                                                <th>Area</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {candidates ? (
                                                filteredCandidates.length ? (
                                                    filteredCandidates.map((candidate) => (
                                                    <tr
                                                        key={
                                                            candidate.candidateId
                                                        }
                                                    >
                                                        <td className="ballot-photo-cell">
                                                            <img
                                                                className="img-circle img-bordered-sm ballot-candidate-photo"
                                                                src={`${
                                                                    import.meta
                                                                        .env
                                                                        .VITE_API_SERVER
                                                                }/api/v1/images/candidate/${
                                                                    candidate.picture
                                                                }`}
                                                                alt="user image"
                                                                style={{
                                                                    height: "50px",
                                                                    border: `inset 5px ${candidate.partyDetails.color}`,
                                                                }}
                                                            />
                                                        </td>
                                                        <td className="ballot-candidate-cell">
                                                            <ul className="ballot-candidate-list">
                                                                <li>
                                                                    <strong>
                                                                        {
                                                                            candidate.name
                                                                        }
                                                                    </strong>
                                                                </li>
                                                                <li>
                                                                    {
                                                                        candidate.nomination
                                                                    }
                                                                </li>
                                                                <li>
                                                                    {
                                                                        candidate
                                                                            .partyDetails
                                                                            .partyName
                                                                    }{" "}
                                                                    -{" "}
                                                                    {
                                                                        candidate
                                                                            .partyDetails
                                                                            .partyAcronyms
                                                                    }{" "}
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td>
                                                            <ul className="ballot-candidate-list">
                                                                <li>
                                                                    {
                                                                        candidate
                                                                            .province[0]
                                                                            ?.Descripcion
                                                                    }
                                                                </li>
                                                                <li>
                                                                    {
                                                                        candidate
                                                                            .municipality[0]
                                                                            ?.description
                                                                    }
                                                                </li>
                                                                {/* <li>{candidate.DistritoMunicipal[0]?.name}</li> */}
                                                            </ul>
                                                        </td>
                                                        <td className="ballot-action-cell">
                                                            <div className="ballot-action-stack">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-danger ballot-delete-btn"
                                                                    onClick={() =>
                                                                        deleteCandidate(
                                                                            candidate.candidateId,
                                                                            candidate.name
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fas fa-trash-alt mr-2"></i>
                                                                        Eliminar
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={4}>
                                                            <div className="ballot-empty-state">
                                                                <div className="ballot-empty-icon">
                                                                    <i className="fas fa-search"></i>
                                                                </div>
                                                                <h4>
                                                                    No hay coincidencias
                                                                </h4>
                                                                <p>
                                                                    Prueba con
                                                                    otro nombre,
                                                                    partido,
                                                                    cargo o
                                                                    ubicacion.
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            ) : (
                                                <tr>
                                                    <td colSpan={4}>
                                                        <div
                                                            className="loading"
                                                            style={{
                                                                height: "100px",
                                                                marginBottom:
                                                                    "0",
                                                            }}
                                                        >
                                                            <Cargando scala="3" />
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row ballot-section-row">
                        <div className="col-12">
                            <NewCandidate
                                getAllCandidates={getAllCandidates}
                                getAllParties={getAllParties}
                                parties={parties}
                            />
                        </div>
                    </div>

                    <div className="row ballot-section-row">
                        <div className="col-12">
                            <SeeParties
                                getAllParties={getAllParties}
                                parties={parties}
                            />
                        </div>
                    </div>

                    <div className="row ballot-section-row">
                        <div className="col-12">
                            <NewParty getAllParties={getAllParties} />
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default SeeBallot;
