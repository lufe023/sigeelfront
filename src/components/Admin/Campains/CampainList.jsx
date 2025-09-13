import axios from "axios";
import React, { useState } from "react";
import getConfig from "../../../utils/getConfig";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const CampainList = ({ campain, getCampains }) => {
    const activar = () => {
        axios
            .patch(
                `${import.meta.env.VITE_API_SERVER}/api/v1/campains/?id=${
                    campain.id
                }&active=${!campain.isActive}`,
                {},
                getConfig()
            )
            .then((response) => {
                // Restablecer el formulario después de enviar los datos (opcional)
                getCampains();
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
                    title: "Campaña actualizada",
                });
            })
            .catch((error) => {
                console.log(error);
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
                    title: "Algo anda mal",
                });
            });
    };

    return (
        <div className="col-md-6">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">{campain.name}</h3>
                </div>

                <div className="card-body p-0">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>Detalles</th>
                                <th>Territorio</th>
                                <th>Fechas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{campain.details}</td>
                                <td>
                                    <ul
                                        style={{
                                            padding: "0",
                                            fontSize: "14px",
                                        }}
                                    >
                                        <li>
                                            Prov:
                                            <b>{campain?.provinces?.name}</b>
                                        </li>
                                        <li>
                                            Mun:
                                            <b>
                                                {campain?.municipalities?.name}
                                            </b>
                                        </li>
                                        {campain.districts ? (
                                            <li>
                                                Dis:
                                                <b>
                                                    {
                                                        campain.municipalities
                                                            .name
                                                    }
                                                </b>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                    </ul>
                                </td>
                                <td>
                                    <ul
                                        style={{
                                            padding: "0",
                                            fontSize: "14px",
                                        }}
                                    >
                                        <li>
                                            Inicio:{" "}
                                            <b>
                                                {campain.startAt.substring(
                                                    0,
                                                    10
                                                )}
                                            </b>
                                        </li>
                                        <li>
                                            Finaliza:{" "}
                                            <b>
                                                {campain.finishAt.substring(
                                                    0,
                                                    10
                                                )}
                                            </b>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    Encuestas:{" "}
                                    <b>{campain.encuestasCount || 0},</b> Con
                                    Informacion:{" "}
                                    <b> {campain.pollWithAnyComplete || 0}</b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="card-footer ">
                    <div
                        className="btn-group btn-group-toggle float-right"
                        data-toggle="buttons"
                    >
                        <button
                            className={`btn  ${
                                campain.isActive ? "btn-warning" : "btn-success"
                            }`}
                            onClick={activar}
                        >
                            {campain.isActive ? "Desactivar" : "Activar"}
                        </button>

                        <Link to="/informs" className="btn btn-primary">
                            Informe{" "}
                        </Link>

                        <label className="btn btn-danger">
                            <input
                                type="radio"
                                name="options"
                                id="option_a2"
                                autoComplete="off"
                            />{" "}
                            Eliminar
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampainList;
