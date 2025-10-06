import React, { useState } from "react";
import getConfig from "../../utils/getConfig";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import Cargando from "../../utils/Cargando";

const TeamMembersTodo = ({ member, getOneteam }) => {
    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    let randomColor = getRandomColor();

    const exitFromTeam = (memberId, teamId, memberName) => {
        Swal.fire({
            title: `¿Seguro quieres expulsar a ${memberName}?`,
            text: `Ya no se mostraran los datos de ${memberName} en este grupo`,
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Dejar sin efecto",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, expulsar!",
        }).then((result) => {
            if (result.isConfirmed) {
                let timerInterval;
                Swal.fire({
                    title: "Expulsando!",
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
                const data = {
                    teamId,
                    memberId,
                };

                const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/teams`;
                axios
                    .delete(URL, {
                        data: data,
                        headers: {
                            Authorization: getConfig().headers.Authorization,
                            "Content-Type": "application/json",
                        },
                    })
                    .then((res) => {
                        getOneteam(teamId);
                        Swal.fire(
                            "Expulsado",
                            "Accion realizada con éxito",
                            "success"
                        );
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Hubo un error!",
                        });
                    });
            }
        });
    };

    const obtenerFechaActual = () => {
        const fechaActual = new Date();
        const año = fechaActual.getFullYear();
        const mes = String(fechaActual.getMonth() + 1).padStart(2, "0"); // Agregar cero inicial si el mes es menor a 10
        const dia = String(fechaActual.getDate()).padStart(2, "0"); // Agregar cero inicial si el día es menor a 10
        const horas = String(fechaActual.getHours()).padStart(2, "0"); // Agregar cero inicial si las horas son menores a 10
        const minutos = String(fechaActual.getMinutes()).padStart(2, "0"); // Agregar cero inicial si los minutos son menores a 10
        const segundos = String(fechaActual.getSeconds()).padStart(2, "0"); // Agregar cero inicial si los segundos son menores a 10
        const milisegundos = String(fechaActual.getMilliseconds()).padStart(
            3,
            "0"
        ); // Agregar ceros iniciales si los milisegundos son menores a 100 o 10

        return `${año}-${mes}-${dia}T${horas}:${minutos}:${segundos}.${milisegundos}Z`;
    };

    const fechaHoy = obtenerFechaActual();

    const [personas, setPersonas] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const getPeopleById = (userId) => {
        setIsLoading(true);
        const URL = `${
            import.meta.env.VITE_API_SERVER
        }/api/v1/census/simpleCensus`;
        axios
            .post(
                URL,
                {
                    leaderId: userId,
                },
                getConfig()
            )
            .then((res) => {
                setPersonas(res.data.rows);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
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
    return (
        <>
            <div className="col-md-6">
                <div className="card collapsed-card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">
                            {member?.memberData.censu.firstName}
                        </h3>
                        <div className="card-tools">
                            <button
                                type="button"
                                className="btn btn-tool"
                                data-card-widget="collapse"
                            >
                                <i className="fas fa-plus" />
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div
                                    className="card card-primary card-outline"
                                    style={{
                                        borderTop: `3px solid ${randomColor}`,
                                    }}
                                >
                                    <div className="card-body box-profile">
                                        <div className="text-center">
                                            <img
                                                className="profile-user-img img-fluid img-circle"
                                                src={`${
                                                    import.meta.env
                                                        .VITE_API_SERVER
                                                }/api/v1/images/pic/mun/${
                                                    member.memberData.censu
                                                        ?.municipality
                                                }/${
                                                    member.memberData.censu
                                                        .citizenID
                                                }`}
                                                alt="User profile picture"
                                            />
                                        </div>
                                        <Link
                                            to={`/peoplebyuser/${member?.memberId}`}
                                        >
                                            <h3 className="profile-username text-center">
                                                {
                                                    member?.memberData.censu
                                                        .firstName
                                                }
                                            </h3>
                                        </Link>
                                        <p className="text-muted text-center">
                                            {member.teamLeader
                                                ? "Team Leader"
                                                : "Miembro"}
                                        </p>
                                        <ul className="list-group list-group-unbordered mb-3">
                                            <li className="list-group-item">
                                                <b>Telefono</b>{" "}
                                                <a
                                                    href={`tel:${member.memberData.censu.celphone}`}
                                                    className="float-right"
                                                >
                                                    {
                                                        member.memberData.censu
                                                            .celphone
                                                    }
                                                </a>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Tareas</b>{" "}
                                                <a className="float-right">
                                                    {
                                                        member.memberData.tasks
                                                            .length
                                                    }
                                                </a>
                                            </li>
                                        </ul>
                                        <button
                                            href="#"
                                            className="btn btn-danger btn-block"
                                            onClick={() =>
                                                exitFromTeam(
                                                    member.memberId,
                                                    member.teamId,
                                                    member.memberData.censu
                                                        .firstName
                                                )
                                            }
                                        >
                                            <b>Expulsar</b>
                                        </button>
                                    </div>
                                    {/* /.card-body */}
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div
                                    className="card collapsed-card card-primary card-outline"
                                    style={{
                                        borderTop: `3px solid ${randomColor}`,
                                    }}
                                >
                                    <div className="card-header">
                                        <h3 className="card-title">Tareas</h3>
                                        <div className="card-tools">
                                            <button
                                                type="button"
                                                className="btn btn-tool"
                                                data-card-widget="collapse"
                                            >
                                                <i className="fas fa-plus" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        {member.memberData.tasks?.map(
                                            (task) => (
                                                <div
                                                    key={task.id}
                                                    className={
                                                        task.isActive == ""
                                                            ? "callout callout-success"
                                                            : task.limit.substring(
                                                                  0,
                                                                  10
                                                              ) <
                                                              fechaHoy.substring(
                                                                  0,
                                                                  10
                                                              )
                                                            ? "callout callout-danger"
                                                            : task.limit.substring(
                                                                  0,
                                                                  10
                                                              ) >=
                                                              fechaHoy.substring(
                                                                  0,
                                                                  10
                                                              )
                                                            ? "callout callout-warning"
                                                            : ""
                                                    }
                                                >
                                                    <h5>{task.title}</h5>
                                                    {task.isActive ? (
                                                        <p>
                                                            {task.description.substring(
                                                                0,
                                                                99
                                                            )}
                                                        </p>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {task.isActive ? (
                                                        <p>
                                                            Fecha Limite:
                                                            <b>
                                                                {task.limit.substring(
                                                                    0,
                                                                    10
                                                                )}
                                                            </b>
                                                        </p>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="card collapsed-card">
                                    <div className="card-header">
                                        <h3 className="card-title">
                                            Padroncillo
                                        </h3>
                                        <div className="card-tools">
                                            <button
                                                type="button"
                                                className="btn btn-tool"
                                                data-card-widget="collapse"
                                            >
                                                <i className="fas fa-plus" />
                                            </button>
                                        </div>
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body p-0">
                                        <ul className="users-list clearfix">
                                            {personas?.map((persona) => (
                                                <li
                                                    className="simpleCensu"
                                                    key={persona.id}
                                                    style={{
                                                        border: "1px solid #DCDCDC",
                                                        borderRadius: "10px",
                                                        margin: "5px 3px",
                                                    }}
                                                >
                                                    <style>{`
    .simpleCensu:hover {
      background-color: #F5F5F5;
    }
  `}</style>
                                                    <Link
                                                        to={`/mypeople/${persona.id}`}
                                                    >
                                                        {/* src={`${
                                                            import.meta.env
                                                                .VITE_API_SERVER
                                                        }/api/v1/images/pic/mun/${
                                                            member.memberData
                                                                .censu
                                                                ?.municipality
                                                        }/${
                                                            member.memberData
                                                                .censu.citizenID
                                                        }`} */}
                                                        <img
                                                            src={`${
                                                                import.meta.env
                                                                    .VITE_API_SERVER
                                                            }/api/v1/images/pic/mun/${
                                                                persona?.municipality
                                                            }/${
                                                                persona?.citizenID
                                                            }`}
                                                            alt="User Image"
                                                        />
                                                    </Link>
                                                    <Link
                                                        to={`/mypeople/${persona.id}`}
                                                        className="users-list-name"
                                                        href="#"
                                                    >
                                                        {persona.firstName}
                                                    </Link>
                                                    {persona?.sufragio
                                                        ?.suffrage ? (
                                                        <span className="users-list-date bg-success">
                                                            Votó
                                                        </span>
                                                    ) : (
                                                        <span className="users-list-date bg-danger">
                                                            No votó
                                                        </span>
                                                    )}
                                                    <b>Mesa:</b>{" "}
                                                    {persona.colegio.collegeNumber
                                                        ?.toString()
                                                        .padStart(4, "0")}
                                                    <br />
                                                    <small
                                                        style={{
                                                            lineHeight: "0",
                                                        }}
                                                    >
                                                        {
                                                            persona.colegio
                                                                .precinctData
                                                                .recintoNombre
                                                        }
                                                    </small>
                                                </li>
                                            ))}
                                        </ul>
                                        {/* /.users-list */}
                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer text-center">
                                        {isLoading ? (
                                            <div
                                                className="loading"
                                                style={{
                                                    height: "100px",
                                                    marginBottom: "50px",
                                                }}
                                            >
                                                <Cargando escala="1.5" />
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {personas ? (
                                            ""
                                        ) : (
                                            <button
                                                className="btn btn-primary btn-block"
                                                onClick={() =>
                                                    getPeopleById(
                                                        member.memberId
                                                    )
                                                }
                                            >
                                                Ver
                                            </button>
                                        )}
                                    </div>
                                    {/* /.card-footer */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeamMembersTodo;
