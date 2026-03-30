import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import getConfig from "../../utils/getConfig";
import Cargando from "../../utils/Cargando";
//import "./AdUserToTeams.css"

const SEARCH_DEBOUNCE_MS = 450;

const AddTies = ({ aCitizenId, getTies, setTies }) => {
    const [results, setResults] = useState([]);
    const [tiesTypes, setTiesTypes] = useState();
    const [finding, setFinding] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const getTiesTypes = () => {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/ties/types`;
        axios
            .get(URL, getConfig())
            .then((res) => {
                setTiesTypes(res.data.data.rows);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const findPeople = (findWord) => {
        setFinding(true);
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/search`;
        axios
            .post(
                URL,
                {
                    findWord,
                    page: 1,
                    size: 10,
                },
                getConfig(),
            )
            .then((res) => {
                const payload = res.data?.data;
                const rows = Array.isArray(payload) ? payload : payload?.rows || [];

                setResults(rows);
                setFinding(false);
            })
            .catch(() => {
                setResults([]);
                setFinding(false);
            });
    };

    const findingWord = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        getTiesTypes();
    }, []);

    useEffect(() => {
        const normalizedTerm = searchTerm.trim();

        if (normalizedTerm.length < 3) {
            setResults([]);
            setFinding(false);
            return undefined;
        }

        const debounceId = setTimeout(() => {
            findPeople(normalizedTerm);
        }, SEARCH_DEBOUNCE_MS);

        return () => clearTimeout(debounceId);
    }, [searchTerm]);

    const addTies = (aCitizenId, bCitizenId, tiesType) => {
        setTies();
        const URL = `${
            import.meta.env.VITE_API_SERVER
        }/api/v1/ties/${aCitizenId}/${bCitizenId}/${tiesType}`;
        axios
            .post(URL, "", getConfig())
            .then(() => {
                getTies();
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
                    title: "Vinculo Establecido",
                });
            })
            .catch((err) => {
                getTies();
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
                    title: `${err.response.data.msg}`,
                });
            });
    };

    return (
        <div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Añadir Vinculo</label>
                <input
                    type="text"
                    autoComplete="off"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Apodo, nombre, apellido o cedula sin guiones"
                    value={searchTerm}
                    onChange={findingWord}
                />
            </div>

            <ul style={{ padding: 0, marginBottom: "20px", height: "auto" }}>
                {finding ? (
                    <div
                        className="loading"
                        style={{ height: "100px", marginBottom: "50px" }}
                    >
                        <Cargando escala="1" />
                    </div>
                ) : (
                    ""
                )}

                {results?.map((user) => (
                    <li key={user.id} className="list-select-user-item">
                        <div className="user-block list-select-user">
                            <div>
                                <div className="btn-group float-right">
                                    <button
                                        type="button"
                                        className="btn btn-default"
                                    >
                                        Agregar
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-default dropdown-toggle dropdown-icon"
                                        data-toggle="dropdown"
                                        aria-expanded="false"
                                    ></button>
                                    <div className="dropdown-menu ties-menu" role="menu">
                                        {tiesTypes?.map((type) => (
                                            <button
                                                key={type.id}
                                                className="dropdown-item"
                                                onClick={() =>
                                                    addTies(
                                                        aCitizenId,
                                                        user.citizenID,
                                                        type.id
                                                    )
                                                }
                                            >
                                                {type.tiesDescription}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img
                                    className="img-circle img-bordered-sm"
                                    src={user?.picture}
                                    alt="user image"
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        marginRight: "5px",
                                    }}
                                />
                                <span className="username">
                                    {user.firstName}
                                </span>
                                <span className="description">
                                    {user?.districts?.name ||
                                        user?.municipalities?.description}
                                </span>
                                <span className="description">
                                    {user?.adress}
                                </span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddTies;
