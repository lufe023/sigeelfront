import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import getConfig from "../../utils/getConfig";
import { Link } from "react-router-dom";

const LookUser = () => {
    const [results, setResults] = useState([]);

    const findPeople = (findWord) => {
        const URL = `${
            import.meta.env.VITE_API_SERVER
        }/api/v1/users/userSearch`;
        axios
            .post(
                URL,
                {
                    findUser: findWord,
                },
                getConfig()
            )
            .then((res) => {
                setResults(res.data.data.rows);
            })
            .catch((err) => {
                setResults([]);
                console.error(err);
            });
    };

    const findingWord = (e) => {
        const fn = e.target.value.trim();

        if (fn != "") {
            findPeople(fn);
        } else {
            setResults([]);
        }
    };
    return (
        <div className="card">
            <div className="card-body">
                <div className="col-12">
                    <div className="form-group">
                        <h4>Encontrar un usuario</h4>

                        <div className="form-group">
                            <input
                                autoComplete="off"
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Apodo, nombre, apellido o cedula"
                                onChange={findingWord}
                            />
                        </div>
                    </div>
                    <ul style={{ padding: 0, maxWidth: "300px" }}>
                        {results?.map((user) => (
                            <li
                                key={user?.id}
                                className={
                                    user?.colaborador?.email
                                        ? "list-select-user-item"
                                        : "ist-select-user-item notPosible"
                                }
                            >
                                <div className="user-block list-select-user">
                                    <div></div>
                                    <div>
                                        <img
                                            src={`${
                                                import.meta.env.VITE_API_SERVER
                                            }/api/v1/images/pic/mun/${
                                                user?.municipality
                                            }/${user?.citizenID}`}
                                            className="img-circle img-bordered-sm"
                                            alt="user image"
                                        />
                                        <span className="username">
                                            <Link to={`/mypeople/${user?.id}`}>
                                                {user?.firstName}
                                            </Link>
                                        </span>
                                        <span className="description">
                                            {user?.colaborador?.email ||
                                                user?.citizenID}
                                        </span>
                                    </div>
                                </div>
                                <div className="product-info">
                                    <Link
                                        to={`/peoplebyuser/${user?.colaborador?.id}`}
                                    >
                                        <button className="btn btn-primary btn-xs">
                                            Seguimiento
                                        </button>
                                    </Link>{" "}
                                    <Link
                                        to={`/users/${user?.colaborador?.id}`}
                                    >
                                        <button className="btn btn-warning btn-xs">
                                            Adminsitrar
                                        </button>
                                    </Link>{" "}
                                    <Link
                                        to={`/users/${user?.colaborador?.id}`}
                                    >
                                        <button
                                            className={`btn btn-xs ${
                                                user?.colaborador?.user_role
                                                    ?.roleName ==
                                                "Administrador"
                                                    ? "btn-warning"
                                                    : user?.colaborador
                                                          ?.user_role
                                                          ?.roleName ==
                                                      "Super Admin"
                                                    ? "btn-danger"
                                                    : user?.colaborador
                                                          ?.user_role
                                                          ?.roleName ==
                                                      "Delegado"
                                                    ? "btn-info"
                                                    : "btn-success"
                                            }`}
                                        >
                                            {
                                                user?.colaborador?.user_role
                                                    ?.roleName
                                            }
                                        </button>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LookUser;
