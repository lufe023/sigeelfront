import React, { useEffect, useState } from "react";
import Footer from "../../Footer";
import Header from "../../Header";
import Aside from "../../Aside";
import CreateOrUpdateVoteGrupal from "./createOrUpdateVoteGrupal";
import axios from "axios";
import getConfig from "../../../utils/getConfig";
import Swal from "sweetalert2";

const VoteGrupal = () => {
    const [positions, setPositions] = useState("");
    const [collegeId, setCollegeId] = useState("");
    const [suffrageValue, setSuffrageValue] = useState(false);
    const [precints, setPrecints] = useState([]);
    const [selectedPrecintColegios, setSelectedPrecintColegios] = useState([]);

    const getAllPrecints = () => {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/jce/precints`;
        axios
            .get(URL, getConfig())
            .then((res) => setPrecints(res.data.rows))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getAllPrecints();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!collegeId || !positions) {
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Por favor selecciona un colegio e ingresa las posiciones.",
            });
            return;
        }

        const colegioEncontrado = selectedPrecintColegios.find(
            (c) => c.CollegeId === collegeId,
        );

        const mesaFormateada = colegioEncontrado?.collegeNumber
            ? colegioEncontrado.collegeNumber.toString().padStart(4, "0")
            : "N/A";

        const positionsArray = positions
            .split(",")
            .map((pos) => pos.trim())
            .filter((pos) => pos !== "")
            .map(Number);

        // --- CONFIGURACIÓN DINÁMICA SEGÚN EL ESTADO ---
        // Si es falso (Pendiente), usamos rojo y advertencia. Si es verdadero, verde y pregunta.
        const isRemoving = suffrageValue === false;

        Swal.fire({
            title: isRemoving
                ? `¿Deseas quitar los votos?`
                : `¿Confirmar Registro?`,
            html: `
            <div class="text-left">
                <p><strong>Mesa/Colegio:</strong> <span class="badge badge-info" style="font-size: 1.1rem"># ${mesaFormateada}</span></p>
                <p><strong>Electores:</strong> ${positionsArray.length} seleccionados</p>
                <p><strong>Estado a aplicar:</strong> 
                    <span class="badge ${isRemoving ? "badge-danger" : "badge-success"}">
                        ${isRemoving ? "PENDIENTE (FALSO)" : "VOTADO (VERDADERO)"}
                    </span>
                </p>
                <p class="text-muted small mt-2">ID Interno Colegio: ${collegeId}</p>
            </div>
            `,
            icon: isRemoving ? "warning" : "question",
            showCancelButton: true,
            confirmButtonColor: isRemoving ? "#d33" : "#28a745", // Rojo si quita, Verde si pone
            cancelButtonColor: "#6c757d",
            confirmButtonText: isRemoving
                ? '<i class="fas fa-trash-alt"></i> Sí, quitar votos'
                : '<i class="fas fa-check"></i> Sí, guardar votos',
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                CreateOrUpdateVoteGrupal(
                    positionsArray,
                    collegeId,
                    suffrageValue,
                );

                Swal.fire({
                    title: isRemoving ? "Acción Completada" : "¡Éxito!",
                    text: isRemoving
                        ? `Se han marcado como pendientes los votos en el colegio ${mesaFormateada}`
                        : `Votos registrados con éxito en el colegio ${mesaFormateada}`,
                    icon: "success",
                    timer: 2500,
                    showConfirmButton: false,
                });

                setPositions("");
            }
        });
    };

    // Estilo común para los contenedores de listas
    const listContainerStyle = {
        backgroundColor: "white",
        padding: "15px",
        overflowX: "hidden",
        overflowY: "auto",
        height: "200px",
        border: "1px solid #dee2e6",
        borderRadius: "4px",
    };

    return (
        <>
            <Header />
            <Aside />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <h1>Registro de Voto Grupal</h1>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        <div className="card card-primary card-outline">
                            <div className="card-body">
                                <div className="row">
                                    {/* SECCIÓN RECINTOS */}
                                    <div className="col-md-7">
                                        <div className="form-group">
                                            <label>
                                                <i className="fas fa-landmark"></i>{" "}
                                                Seleccione Recinto
                                            </label>
                                            <div style={listContainerStyle}>
                                                {precints?.map((recinto) => (
                                                    <div
                                                        key={
                                                            recinto?.PrecinctId
                                                        } // Cambiado: Era PrecinctId según tu log
                                                        className="custom-control custom-radio mb-2"
                                                    >
                                                        <input
                                                            className="custom-control-input"
                                                            type="radio"
                                                            // Cambiado: Usamos PrecinctId para que el ID sea único y válido
                                                            id={`precinct-${recinto?.PrecinctId}`}
                                                            name="precinct"
                                                            onChange={() => {
                                                                setSelectedPrecintColegios(
                                                                    recinto?.colegios ||
                                                                        [],
                                                                );
                                                                setCollegeId(
                                                                    "",
                                                                );
                                                            }}
                                                        />
                                                        <label
                                                            // Importante: htmlFor debe coincidir exactamente con el id del input
                                                            htmlFor={`precinct-${recinto?.PrecinctId}`}
                                                            className="custom-control-label"
                                                        >
                                                            <span className="badge badge-primary mr-2">
                                                                {recinto?.precintNumber
                                                                    ?.toString()
                                                                    .padStart(
                                                                        5,
                                                                        "0",
                                                                    )}
                                                            </span>
                                                            {/* Cambiado: Tu objeto usa 'descripcion' o 'DescripcionLarga' */}
                                                            {
                                                                recinto?.descripcion
                                                            }
                                                            <br />
                                                            <small className="text-muted">
                                                                {/* Agregado: Aquí puedes mostrar la dirección */}
                                                                <i className="fas fa-map-marker-alt"></i>{" "}
                                                                {
                                                                    recinto?.direccionRecinto
                                                                }
                                                            </small>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* SECCIÓN COLEGIOS (Mismo estilo que Recintos) */}
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label>
                                                <i className="fas fa-door-open"></i>{" "}
                                                Colegios en este recinto
                                            </label>
                                            <div style={listContainerStyle}>
                                                {selectedPrecintColegios.length >
                                                0 ? (
                                                    selectedPrecintColegios.map(
                                                        (colegio) => (
                                                            <div
                                                                key={
                                                                    colegio?.CollegeId
                                                                } // Corregido: Usar CollegeId
                                                                className="custom-control custom-radio mb-2"
                                                            >
                                                                <input
                                                                    className="custom-control-input"
                                                                    type="radio"
                                                                    id={`college-${colegio?.CollegeId}`} // Corregido: Usar CollegeId
                                                                    name="college"
                                                                    checked={
                                                                        collegeId ===
                                                                        colegio?.CollegeId
                                                                    } // Corregido: Comparar con CollegeId
                                                                    onChange={() =>
                                                                        setCollegeId(
                                                                            colegio?.CollegeId,
                                                                        )
                                                                    } // Corregido: Guardar CollegeId
                                                                />
                                                                <label
                                                                    htmlFor={`college-${colegio?.CollegeId}`} // Corregido: Debe ser igual al id del input
                                                                    className="custom-control-label"
                                                                >
                                                                    <span className="badge badge-info">
                                                                        Colegio{" "}
                                                                        {colegio?.collegeNumber
                                                                            ?.toString()
                                                                            .padStart(
                                                                                4,
                                                                                "0",
                                                                            )}
                                                                    </span>
                                                                    {/* Opcional: Mostrar electores si lo necesitas */}
                                                                    <small className="ml-2 text-muted">
                                                                        (
                                                                        {
                                                                            colegio?.electLocal
                                                                        }{" "}
                                                                        electores)
                                                                    </small>
                                                                </label>
                                                            </div>
                                                        ),
                                                    )
                                                ) : (
                                                    <p className="text-muted text-center mt-4">
                                                        Seleccione un recinto
                                                        primero
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr />

                                {/* SECCIÓN POSICIONES Y ENVÍO */}
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label>
                                                    Posiciones IDs (Separados
                                                    por comas)
                                                </label>
                                                <textarea
                                                    value={positions}
                                                    onChange={(e) =>
                                                        setPositions(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="form-control form-control-border border-width-2"
                                                    rows="3"
                                                    placeholder="Ej: 101, 205, 308..."
                                                    style={{
                                                        resize: "none",
                                                        fontSize: "1.1rem",
                                                    }}
                                                ></textarea>
                                                <small className="text-muted">
                                                    Ingrese los IDs de los
                                                    electores que recibirán el
                                                    voto.
                                                </small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <div className="form-group">
                                                    <label>
                                                        Estado del Sufragio
                                                    </label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span
                                                                className={`input-group-text ${suffrageValue ? "bg-success" : "bg-danger"} text-white`}
                                                            >
                                                                <i
                                                                    className={`fas ${suffrageValue ? "fa-check-circle" : "fa-times-circle"}`}
                                                                ></i>
                                                            </span>
                                                        </div>
                                                        <select
                                                            className="form-control"
                                                            value={
                                                                suffrageValue
                                                            }
                                                            onChange={(e) =>
                                                                setSuffrageValue(
                                                                    e.target
                                                                        .value ===
                                                                        "true",
                                                                )
                                                            }
                                                        >
                                                            <option value="false">
                                                                Pendiente
                                                                (Falso)
                                                            </option>
                                                            <option value="true">
                                                                Votado
                                                                (Verdadero)
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div className="mt-1">
                                                        {suffrageValue ? (
                                                            <span className="badge badge-success">
                                                                Se marcarán como
                                                                VOTADOS
                                                            </span>
                                                        ) : (
                                                            <span className="badge badge-danger">
                                                                Se marcarán como
                                                                PENDIENTES
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <button
                                                    type="submit"
                                                    className="btn btn-success btn-block btn-lg"
                                                >
                                                    <i className="fas fa-paper-plane mr-2"></i>{" "}
                                                    Enviar Votos Grupales
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default VoteGrupal;
