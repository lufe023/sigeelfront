import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getConfig from "../../../utils/getConfig";
import Swal from "sweetalert2";

const ShowTies = ({ ties, setPeople, getTies }) => {
    const estilo = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
    };

    const cursor = {
        cursor: "pointer",
    };

    const deleteTies = (tieId) => {
        Swal.fire({
            title: `¿Seguro quieres eliminar este vinculo?`,
            text: `Esta acción no se puede deshacer`,
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Dejar sin efecto",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, deseo Eliminar!",
        }).then((result) => {
            if (result.isConfirmed) {
                let timerInterval;
                Swal.fire({
                    title: "Eliminado!",
                    timer: 0,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const b = Swal.getHtmlContainer().querySelector("b");
                        timerInterval = setInterval(() => {}, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    },
                }).then((result) => {
                    /* Read more about handling dismissals below */
                });

                const URL = `${
                    import.meta.env.VITE_API_SERVER
                }/api/v1/ties/${tieId}`;
                axios
                    .delete(URL, {
                        headers: {
                            Authorization: getConfig().headers.Authorization,
                            "Content-Type": "application/json",
                        },
                    })
                    .then((res) => {
                        Swal.fire(
                            "Eliminando",
                            "Accion realizada con éxito",
                            "success"
                        );
                        getTies();
                    })
                    .catch((err) => {
                        console.error(err);
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
        <>
            {ties?.rows?.map((tie) => (
                <div
                    className="col-lg-3"
                    key={tie.id}
                    style={{ display: "inline-block", minWidth: "250px" }}
                >
                    <div className="small-box">
                        <div className="inner" style={estilo}>
                            <Link
                                to={`/mypeople/${tie.aties.id}`}
                                onClick={() => setPeople()}
                            >
                                <img
                                    src={`${
                                        import.meta.env.VITE_API_SERVER
                                    }/api/v1/images/pic/mun/${
                                        ties?.aties?.municipality
                                    }/${tie.aties.citizenID}`}
                                    alt="User Image"
                                    className="concurrencia-citizen-image"
                                />
                            </Link>
                            {tie.tieType.tiesDescription}
                            <Link
                                to={`/mypeople/${tie.bties.id}`}
                                onClick={() => setPeople()}
                            >
                                <img
                                    src={`${
                                        import.meta.env.VITE_API_SERVER
                                    }/api/v1/images/pic/mun/${
                                        ties?.bties?.municipality
                                    }/${tie.bties.citizenID}`}
                                    className="concurrencia-citizen-image"
                                />
                            </Link>
                        </div>

                        <a
                            className="small-box-footer bg-gradient-danger"
                            style={cursor}
                            onClick={() => deleteTies(tie.id)}
                        >
                            <i className="fas fa-trash" /> Eliminar
                        </a>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ShowTies;
