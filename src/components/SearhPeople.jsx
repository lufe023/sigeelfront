import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/SearhPeople.css";
import Cargando from "../utils/Cargando";
import getConfig from "../utils/getConfig";

const SearhPeople = () => {
    const [isShow, setIsShow] = useState(false);
    const [results, setResults] = useState([]);
    const [count, setCount] = useState(0);
    const [isLoading, setIsloading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const searchContainerRef = useRef(null);
    const normalizedSearchTerm = searchTerm.trim();

    useEffect(() => {
        if (normalizedSearchTerm.length >= 3) {
            setIsloading(true);

            const delayDebounceFn = setTimeout(() => {
                findPeople(normalizedSearchTerm);
            }, 500);

            return () => clearTimeout(delayDebounceFn);
        }

        setIsloading(false);
        setResults([]);
        setCount(0);
    }, [normalizedSearchTerm]);

    useEffect(() => {
        if (!isShow) return;

        const handleClickOutside = (event) => {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target)
            ) {
                setIsShow(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isShow]);

    const addPeople = (people, citizenID) => {
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
            .then(() => {
                findPeople(citizenID);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const toggleSearch = () => {
        setIsShow((prev) => !prev);
    };

    const openSearch = () => {
        setIsShow(true);
    };

    const findPeople = (findWord) => {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/search`;
        axios
            .post(URL, { findWord }, getConfig())
            .then((res) => {
                setResults(res.data.data.rows);
                setCount(res.data.data.count);
                setIsloading(false);
            })
            .catch((err) => {
                console.error(err);
                setResults([]);
                setCount(0);
                setIsloading(false);
            });
    };

    const findingWord = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div
            className={`header-search ${isShow ? "is-open" : ""}`}
            ref={searchContainerRef}
        >
            <button
                className="header-search-toggle"
                type="button"
                aria-label="Abrir buscador"
                onClick={toggleSearch}
            >
                <i className={`fas ${isShow ? "fa-times" : "fa-search"}`} />
            </button>

            <div className="header-search-input-wrap">
                <form
                    className="form-inline w-100"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="input-group input-group-sm w-100">
                        <div className="input-group-prepend">
                            <span className="input-group-text border-0 bg-transparent">
                                <i className="fas fa-search text-muted" />
                            </span>
                        </div>
                        <input
                            className="form-control form-control-navbar header-search-input"
                            type="search"
                            placeholder="Nombre, apellido o cédula"
                            aria-label="Search"
                            value={searchTerm}
                            onFocus={openSearch}
                            onChange={findingWord}
                        />
                    </div>
                </form>
            </div>

            <div
                className="searchBox callout callout-info"
                style={{ display: isShow ? "block" : "none" }}
            >
                <span className="dropdown-item dropdown-header">
                    {count > 1
                        ? `${count.toLocaleString("en-US")} coincidencias`
                        : count === 1
                          ? `${count.toLocaleString("en-US")} coincidencia`
                          : ""}
                </span>
                <div className="table-responsive p-0 container-table-search">
                    {normalizedSearchTerm.length < 3 ? (
                        <div>
                            <h5>Empieza a escribir</h5>
                            <p>
                                Usa nombre, apellido, apodo o cédula sin
                                guiones para buscar.
                            </p>
                        </div>
                    ) : count ? (
                        <table className="table ">
                            <thead></thead>
                            <tbody>
                                {results?.map((people) => (
                                    <tr
                                        key={people.id}
                                        className="people-finding"
                                    >
                                        <td>
                                            <img
                                                style={{
                                                    float: "left",
                                                    width: "125px",
                                                    marginRight: "5px",
                                                }}
                                                src={people?.picture}
                                                alt={people?.firstName}
                                            />
                                            <ul
                                                className="demographic-information"
                                                style={{
                                                    margin: "0",
                                                    padding: "0",
                                                }}
                                            >
                                                <li className="text-xs">
                                                    <span>
                                                        {people?.firstName}{" "}
                                                        {people?.lastName}{" "}
                                                        {people?.lastNameB}{" "}
                                                        {people?.nickname ? (
                                                            <small>
                                                                (
                                                                {
                                                                    people?.nickname
                                                                }
                                                                )
                                                            </small>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </span>
                                                </li>
                                                <li className="text-xs">
                                                    <span>{`${people?.citizenID.substr(
                                                        0,
                                                        3,
                                                    )}-${people?.citizenID.substr(
                                                        3,
                                                        7,
                                                    )}-${people?.citizenID.substr(
                                                        10,
                                                        1,
                                                    )}`}</span>
                                                </li>
                                                <li className="text-xs">
                                                    Sector:{" "}
                                                    <span>
                                                        {
                                                            people?.sector
                                                                ?.Descripcion
                                                        }{" "}
                                                    </span>
                                                </li>
                                                <li className="text-xs">
                                                    Distrito:{" "}
                                                    <span>
                                                        {
                                                            people?.district
                                                                ?.descripcion
                                                        }{" "}
                                                    </span>
                                                </li>
                                                <li className="text-xs">
                                                    <span></span>
                                                    Municipio:{" "}
                                                    <span>
                                                        {
                                                            people
                                                                ?.municipalities
                                                                ?.description
                                                        }
                                                    </span>
                                                </li>
                                                <li className="text-xs">
                                                    Provincia:{" "}
                                                    <span>
                                                        {
                                                            people?.provinces
                                                                ?.Descripcion
                                                        }{" "}
                                                    </span>
                                                </li>
                                                <li className="text-xs">
                                                    Colegio:{" "}
                                                    <span>
                                                        {people?.colegio?.collegeNumber
                                                            .toString()
                                                            .padStart(4, "0")}
                                                    </span>
                                                </li>
                                                <li className="text-xs">
                                                    Recinto:{" "}
                                                    <span>
                                                        {
                                                            people?.colegio
                                                                ?.precinctData
                                                                ?.descripcion
                                                        }{" "}
                                                        {people?.colegio?.precinctData?.precintNumber
                                                            .toString()
                                                            .padStart(4, "0")}
                                                    </span>
                                                </li>
                                                <li className="text-xs">
                                                    {people?.leaders ? (
                                                        <Link
                                                            to={`/mypeople/${people?.leaders?.censu?.id}`}
                                                        >
                                                            {
                                                                people?.leaders
                                                                    ?.censu
                                                                    ?.firstName
                                                            }
                                                        </Link>
                                                    ) : (
                                                        ""
                                                    )}
                                                </li>
                                                <div className="card-footer d-flex justify-content-between align-items-center flex-wrap gap-2 mt-4">
                                                    <div className="d-flex gap-2">
                                                        <Link
                                                            onClick={toggleSearch}
                                                            to={`/mypeople/${people?.id}`}
                                                            className="btn btn-outline-primary btn-sm"
                                                        >
                                                            <i className="far fa-eye"></i>
                                                        </Link>

                                                        {people?.leader ? (
                                                            <Link
                                                                to={`/mypeople/${people?.leaders?.censu?.id}`}
                                                                className="btn btn-outline-info btn-sm"
                                                            >
                                                                <i className="fas fa-user-check"></i>
                                                            </Link>
                                                        ) : (
                                                            <button
                                                                className="btn btn-outline-success btn-sm"
                                                                onClick={() =>
                                                                    addPeople(
                                                                        people?.id,
                                                                        people?.citizenID,
                                                                    )
                                                                }
                                                            >
                                                                <i className="fas fa-user-plus"></i>
                                                            </button>
                                                        )}

                                                        <Link
                                                            to={`/mypeople/${people?.id}`}
                                                            className="btn btn-outline-warning btn-sm"
                                                        >
                                                            <i className="fas fa-user-edit"></i>
                                                        </Link>
                                                    </div>

                                                    <div className="d-flex gap-2 align-items-center">
                                                        <span
                                                            className={`badge ${people?.sufragio?.suffrage ? "bg-success" : "bg-danger"} p-2`}
                                                        >
                                                            {people?.sufragio
                                                                ?.suffrage
                                                                ? "Votó"
                                                                : "No Votó"}
                                                        </span>
                                                        <span className="badge bg-dark p-2">
                                                            Posición:{" "}
                                                            {people?.position}
                                                        </span>
                                                    </div>
                                                </div>
                                            </ul>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>
                            <h5>Sin resultados</h5>
                            <p>
                                Intente buscar por nombre, apellido o apodo
                                numero de cedula sin los guiones
                            </p>
                        </div>
                    )}
                </div>

                <div className="dropdown-divider" />
                {count ? (
                    <a href="#" className="dropdown-item dropdown-footer">
                        Ver todos los resultados
                    </a>
                ) : (
                    ""
                )}
                <div className="loading">
                    {isLoading ? <Cargando escala="0.3" /> : ""}
                </div>
            </div>
        </div>
    );
};

export default SearhPeople;
