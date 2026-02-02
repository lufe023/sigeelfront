import React, { useEffect, useState } from "react";
import Header from "../../Header";
import Aside from "../../Aside";
import Footer from "../../Footer";
import axios from "axios";
import getConfig from "../../../utils/getConfig";
import Cargando from "../../../utils/Cargando";
import "../../Precints/CitizenByCollege.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ListByCollege from "./ListByCollege";
import { set } from "react-hook-form";
const Delegate = () => {
    const [precints, setPrecints] = useState();
    const [selectedPrecint, setSelectedPrecint] = useState();
    const [isLoading, setIsloading] = useState(false);
    const [formData, setFormData] = useState({
        id: 0,
        precinct: "",
        electLocal: 0,
        electExterior: 0,
        meta: 0,
        college: "",
    });

    const [searchTerm, setSearchTerm] = useState("");
    const getAllPrecints = () => {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/jce/precints`;
        axios
            .get(URL, getConfig())
            .then((res) => {
                setPrecints(res.data.rows);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getAllPrecints();
    }, []);

    const [citizens, setCitizens] = useState();
    const [collegeData, setCollegeData] = useState();

    const [pagination, setPagination] = useState({
        offset: 0,
        limit: 10,
        count: 0,
        next: "",
        prev: "",
        includeExterior: false,
    });

    const onCollegeChange = () => {
        setCitizens();
        setCollegeData();
        setPagination({
            offset: 0,
            limit: 10,
            count: 0,
            next: "",
            prev: "",
            includeExterior: pagination.includeExterior,
        });
    };

    const getAllPeopleyByCollege = (collegeId, offset, limit) => {
        setIsloading(true);

        let URL = `${
            import.meta.env.VITE_API_SERVER
        }/api/v1/census/colegio/${collegeId}?offset=${offset}&limit=${limit}`;

        if (pagination.includeExterior) {
            URL = `${
                import.meta.env.VITE_API_SERVER
            }/api/v1/census/colegio/${collegeId}?offset=${offset}&limit=${limit}&includeExterior=${
                pagination.includeExterior
            }`;
        }

        axios
            .get(URL, getConfig())
            .then((res) => {
                setCitizens(res.data.results);
                setCollegeData(res.data.precinctData);
                setIsloading(false);
                setPagination({
                    offset: res.data.offset,
                    limit: res.data.limit,
                    count: res.data.count,
                    next: res.data.next,
                    prev: res.data.prev,
                    includeExterior: res.data.includeExterior,
                });
            })
            .catch((err) => {
                console.log(err);
                setIsloading(false);
            });
    };
    const handleChange = (e) => {
        onCollegeChange();
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleChangePagination = (e) => {
        const { name, value, checked } = e.target;
        setPagination((prevData) => ({
            ...prevData,
            [name]: name === "includeExterior" ? checked : value,
        }));
    };

    const addPeople = (people) => {
        const URL = `${
            import.meta.env.VITE_API_SERVER
        }/api/v1/census/addpeople`;
        axios
            .post(
                URL,
                {
                    peopleId: people,
                },
                getConfig(),
            )
            .then((res) => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                });

                Toast.fire({
                    icon: "success",
                    title: "Ciudadano agregado con exito",
                });
                getAllPeopleyByCollege(
                    formData.college,
                    pagination.offset,
                    pagination.limit,
                );
            })
            .catch((err) => {
                console.log(err);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                });
                console.log(error);
                Toast.fire({
                    icon: "error",
                    title: "Algo anda mal, no se agregó el ciudadano",
                });
            });
    };

    const totalPages = Math.ceil(pagination.count / pagination.limit);
    const currentPage = Math.floor(pagination.offset / pagination.limit) + 1;

    const maxPagesToShow = 5; // Número máximo de páginas a mostrar
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pageNumbers = [...Array(endPage - startPage + 1).keys()].map(
        (num) => num + startPage,
    );

    const paginationElements = pageNumbers.map((pageNumber) => (
        <li
            key={pageNumber}
            className={`paginate_button page-item ${
                pageNumber === currentPage ? "active" : ""
            }`}
        >
            <button
                href="#"
                aria-controls="example2"
                className="page-link"
                onClick={() =>
                    getAllPeopleyByCollege(
                        formData.college,
                        (pageNumber - 1) * pagination.limit,
                        pagination.limit,
                        pagination.includeExterior,
                    )
                }
            >
                {pageNumber}
            </button>
        </li>
    ));

    return (
        <>
            <Header />
            <Aside />
            <div className="content-wrapper" style={{ minHeight: "1258.94px" }}>
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        <h2
                            className="text-center"
                            style={{ paddingTop: "50px" }}
                        >
                            Ciudadanos por Colegios
                        </h2>

                        <div className="row">
                            <div className="col-md-10 offset-md-1">
                                <form>
                                    <div className="row">
                                        {/* COLUMNA DE RECINTOS */}
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="font-weight-bold text-primary">
                                                    <i className="fa fa-building mr-1"></i>{" "}
                                                    Seleccione un Recinto
                                                </label>

                                                {/* BUSCADOR INTEGRADO */}
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm mb-2"
                                                    placeholder="Filtrar recinto..."
                                                    value={searchTerm}
                                                    onChange={(e) =>
                                                        setSearchTerm(
                                                            e.target.value,
                                                        )
                                                    }
                                                />

                                                <div
                                                    className="scroll-container"
                                                    style={{
                                                        backgroundColor:
                                                            "#f8f9fa",
                                                        padding: "10px",
                                                        borderRadius: "8px",
                                                        border: "1px solid #dee2e6",
                                                        overflowY: "auto",
                                                        height: "300px",
                                                    }}
                                                >
                                                    {precints
                                                        ?.filter((r) =>
                                                            r.descripcion
                                                                .toLowerCase()
                                                                .includes(
                                                                    searchTerm.toLowerCase(),
                                                                ),
                                                        )
                                                        .map((recinto) => (
                                                            <div
                                                                key={
                                                                    recinto?.PrecinctId
                                                                }
                                                                className="custom-control custom-radio border-bottom py-2"
                                                                style={{
                                                                    cursor: "pointer",
                                                                }}
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    className="custom-control-input"
                                                                    id={`precinct-${recinto?.PrecinctId}`}
                                                                    name="precinct"
                                                                    onChange={() => {
                                                                        setSelectedPrecint(
                                                                            recinto?.colegios,
                                                                        );
                                                                    }}
                                                                />
                                                                <label
                                                                    htmlFor={`precinct-${recinto?.PrecinctId}`}
                                                                    className="custom-control-label d-flex flex-column w-100"
                                                                    style={{
                                                                        cursor: "pointer",
                                                                    }}
                                                                >
                                                                    <div className="d-flex align-items-center mb-1">
                                                                        <span className="badge badge-primary mr-2">
                                                                            {recinto?.precintNumber
                                                                                ?.toString()
                                                                                .padStart(
                                                                                    4,
                                                                                    "0",
                                                                                )}
                                                                        </span>
                                                                        <span
                                                                            className="font-weight-bold text-dark text-uppercase"
                                                                            style={{
                                                                                fontSize:
                                                                                    "0.85rem",
                                                                            }}
                                                                        >
                                                                            {
                                                                                recinto?.descripcion
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="text-muted small">
                                                                        {
                                                                            recinto?.direccionRecinto
                                                                        }
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* COLUMNA DE COLEGIOS */}
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="font-weight-bold text-success d-flex justify-content-between align-items-center">
                                                    <span>
                                                        <i className="fa fa-list-ol mr-1"></i>{" "}
                                                        Colegios en este recinto
                                                    </span>
                                                    {/* CONTADOR DE TOTAL DE COLEGIOS */}
                                                    {selectedPrecint &&
                                                        selectedPrecint.length >
                                                            0 && (
                                                            <span className="badge badge-success badge-pill">
                                                                Total:{" "}
                                                                {
                                                                    selectedPrecint.length
                                                                }
                                                            </span>
                                                        )}
                                                </label>

                                                {/* Input vacío para mantener la simetría de altura con el buscador de la izquierda */}
                                                <div
                                                    style={{
                                                        height: "31px",
                                                        marginBottom: "0.5rem",
                                                    }}
                                                ></div>

                                                <div
                                                    className="scroll-container"
                                                    style={{
                                                        backgroundColor:
                                                            "white",
                                                        padding: "10px",
                                                        borderRadius: "8px",
                                                        border: "1px solid #dee2e6",
                                                        overflowY: "auto",
                                                        height: "300px",
                                                        boxShadow:
                                                            "inset 0 2px 4px rgba(0,0,0,0.05)",
                                                    }}
                                                >
                                                    {!selectedPrecint ||
                                                    selectedPrecint.length ===
                                                        0 ? (
                                                        <div className="text-center text-muted mt-5">
                                                            <i className="fa fa-arrow-left d-block mb-2"></i>
                                                            <small>
                                                                Seleccione un
                                                                recinto para ver
                                                                sus colegios
                                                            </small>
                                                        </div>
                                                    ) : (
                                                        selectedPrecint.map(
                                                            (colegio) => (
                                                                <div
                                                                    key={
                                                                        colegio?.CollegeId
                                                                    }
                                                                    className="custom-control custom-radio border-bottom py-2"
                                                                >
                                                                    <input
                                                                        type="radio"
                                                                        className="custom-control-input"
                                                                        id={`college-${colegio?.CollegeId}`}
                                                                        name="college"
                                                                        value={
                                                                            colegio?.CollegeId
                                                                        }
                                                                        checked={
                                                                            String(
                                                                                formData.college,
                                                                            ) ===
                                                                            String(
                                                                                colegio?.CollegeId,
                                                                            )
                                                                        }
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                        required
                                                                    />
                                                                    <label
                                                                        htmlFor={`college-${colegio?.CollegeId}`}
                                                                        className="custom-control-label d-flex flex-row align-items-center justify-content-between w-100"
                                                                        style={{
                                                                            cursor: "pointer",
                                                                        }}
                                                                    >
                                                                        <div>
                                                                            <span
                                                                                className="font-weight-bold text-success"
                                                                                style={{
                                                                                    fontSize:
                                                                                        "1.1rem",
                                                                                }}
                                                                            >
                                                                                Colegio{" "}
                                                                                {colegio?.collegeNumber
                                                                                    ?.toString()
                                                                                    .padStart(
                                                                                        4,
                                                                                        "0",
                                                                                    )}
                                                                            </span>
                                                                            <div className="text-muted small">
                                                                                <span className="mr-2">
                                                                                    Local:{" "}
                                                                                    <strong>
                                                                                        {
                                                                                            colegio?.electLocal
                                                                                        }
                                                                                    </strong>
                                                                                </span>
                                                                                <span>
                                                                                    Exterior:{" "}
                                                                                    <strong>
                                                                                        {
                                                                                            colegio?.electExterior
                                                                                        }
                                                                                    </strong>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        {colegio?.TieneCupo ===
                                                                            "S" && (
                                                                            <span className="badge badge-success">
                                                                                Disponible
                                                                            </span>
                                                                        )}
                                                                    </label>
                                                                </div>
                                                            ),
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* PAGINACIÓN Y FILTROS EXTRA */}
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="small font-weight-bold">
                                                    Personas por Página
                                                </label>
                                                <select
                                                    className="form-control"
                                                    value={pagination.limit}
                                                    onChange={(e) =>
                                                        setPagination(
                                                            (prev) => ({
                                                                ...prev,
                                                                limit: parseInt(
                                                                    e.target
                                                                        .value,
                                                                ),
                                                            }),
                                                        )
                                                    }
                                                >
                                                    {[10, 20, 50, 70, 100].map(
                                                        (num) => (
                                                            <option
                                                                key={num}
                                                                value={num}
                                                            >
                                                                {num}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="small font-weight-bold">
                                                    Incluir Padrón Exterior
                                                </label>
                                                <div className="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="includeExteriorSwitch"
                                                        name="includeExterior"
                                                        checked={
                                                            pagination.includeExterior
                                                        }
                                                        onChange={
                                                            handleChangePagination
                                                        }
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="includeExteriorSwitch"
                                                    >
                                                        {pagination.includeExterior
                                                            ? "Incluyendo"
                                                            : "Excluyendo"}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* BOTÓN DE ACCIÓN */}
                                    <div className="row">
                                        <div className="col-md-12">
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-block shadow-sm"
                                                disabled={!formData.college}
                                                onClick={() => {
                                                    getAllPeopleyByCollege(
                                                        formData.college,
                                                        pagination.offset,
                                                        pagination.limit,
                                                    );
                                                }}
                                            >
                                                <i className="fa fa-search mr-1" />{" "}
                                                Ver Resultados
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {paginationElements.length > 0 ? (
                            <div
                                className="col-sm-12 col-md-12 "
                                style={{ textAlign: "center" }}
                            >
                                {" "}
                                {/* Agrega la clase text-center para centrar horizontalmente */}
                                <div
                                    className="dataTables_paginate paging_simple_numbers"
                                    id="example2_paginate"
                                >
                                    <ul
                                        className="pagination"
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <li
                                            className="paginate_button page-item previous"
                                            id="example2_previous"
                                        >
                                            <button
                                                href="#"
                                                aria-controls="example2"
                                                onClick={() =>
                                                    getAllPeopleyByCollege(
                                                        formData.college,
                                                        pagination.offset -
                                                            pagination.limit,
                                                        pagination.limit,
                                                    )
                                                }
                                                className="page-link"
                                            >
                                                Anterior
                                            </button>
                                        </li>

                                        {paginationElements}

                                        <li
                                            className="paginate_button page-item next"
                                            id="example2_next"
                                        >
                                            <button
                                                href="#"
                                                aria-controls="example2"
                                                onClick={() =>
                                                    getAllPeopleyByCollege(
                                                        formData.college,
                                                        pagination.offset +
                                                            pagination.limit,
                                                        pagination.limit,
                                                    )
                                                }
                                                className="page-link"
                                            >
                                                Siguiente
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        {isLoading ? (
                            <div
                                className="w100 text-center my-4 h-100"
                                style={{ minHeight: 400 }}
                            >
                                <Cargando escala="2" />
                            </div>
                        ) : (
                            ""
                        )}

                        {citizens && !isLoading ? (
                            <>
                                <div className="card">
                                    <div className="card-header bg-dark">
                                        <h3 className="card-title">
                                            {
                                                collegeData?.precinctData
                                                    .recintoNombre
                                            }
                                            <small
                                                style={{ marginLeft: "10px" }}
                                            >
                                                <b>Mesa:</b>{" "}
                                                {collegeData?.collegeNumber
                                                    .toString()
                                                    .padStart(4, "0")}
                                            </small>
                                            <small
                                                style={{ marginLeft: "10px" }}
                                            >
                                                <b>Total Colegio:</b>{" "}
                                                {pagination.count}
                                            </small>
                                        </h3>
                                    </div>
                                    {/* /.card-header */}
                                </div>

                                <ListByCollege
                                    citizens={citizens}
                                    getAllPeopleyByCollege={
                                        getAllPeopleyByCollege
                                    }
                                    formData={formData.college}
                                    pagination={pagination.limit}
                                    addPeople={addPeople}
                                />
                            </>
                        ) : (
                            ""
                        )}

                        {paginationElements.length > 0 ? (
                            <div
                                className="col-sm-12 col-md-12 "
                                style={{ textAlign: "center" }}
                            >
                                {" "}
                                {/* Agrega la clase text-center para centrar horizontalmente */}
                                <div
                                    className="dataTables_paginate paging_simple_numbers"
                                    id="example2_paginate"
                                >
                                    <ul
                                        className="pagination"
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <li
                                            className="paginate_button page-item previous"
                                            id="example2_previous"
                                        >
                                            <button
                                                href="#"
                                                aria-controls="example2"
                                                onClick={() =>
                                                    getAllPeopleyByCollege(
                                                        formData.college,
                                                        pagination.offset -
                                                            pagination.limit,
                                                        pagination.limit,
                                                    )
                                                }
                                                className="page-link"
                                            >
                                                Anterior
                                            </button>
                                        </li>

                                        {paginationElements}

                                        <li
                                            className="paginate_button page-item next"
                                            id="example2_next"
                                        >
                                            <button
                                                href="#"
                                                aria-controls="example2"
                                                onClick={() =>
                                                    getAllPeopleyByCollege(
                                                        formData.college,
                                                        pagination.offset +
                                                            pagination.limit,
                                                        pagination.limit,
                                                    )
                                                }
                                                className="page-link"
                                            >
                                                Siguiente
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
};

export default Delegate;
