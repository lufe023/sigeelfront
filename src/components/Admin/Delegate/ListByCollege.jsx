import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../Precints/CitizenByCollege.css";
import CreateOrUpdateVote from "./CreateOrUpdateVote";
import Swal from "sweetalert2";

const ListByCollege = ({ citizens, addPeople, onVoteUpdated }) => {
    const [votesByCitizen, setVotesByCitizen] = useState({});
    const [isSavingVote, setIsSavingVote] = useState({});

    useEffect(() => {
        const nextVotes = (citizens || []).reduce((acc, citizen) => {
            acc[citizen.id] = Boolean(citizen.sufragio?.suffrage);
            return acc;
        }, {});

        setVotesByCitizen(nextVotes);
        setIsSavingVote({});
    }, [citizens]);

    const handleToggleVote = async (citizen) => {
        const currentValue =
            votesByCitizen[citizen.id] ?? Boolean(citizen.sufragio?.suffrage);
        const nextValue = !currentValue;

        setVotesByCitizen((prev) => ({
            ...prev,
            [citizen.id]: nextValue,
        }));

        setIsSavingVote((prev) => ({
            ...prev,
            [citizen.id]: true,
        }));

        try {
            const res = await CreateOrUpdateVote(citizen.citizenID, nextValue);

            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toastEl) => {
                    toastEl.addEventListener("mouseenter", Swal.stopTimer);
                    toastEl.addEventListener("mouseleave", Swal.resumeTimer);
                },
            });

            if (nextValue) {
                Toast.fire({
                    icon: "success",
                    title: `Voto registrado a ${res?.citizenID || citizen.citizenID}`,
                });
            } else {
                Toast.fire({
                    icon: "warning",
                    title: `Voto quitado a ${res?.citizenID || citizen.citizenID}`,
                });
            }

            // No forzamos recarga; el estado local ya fue actualizado.
        } catch (error) {
            // revertir cambio local si falla
            setVotesByCitizen((prev) => ({
                ...prev,
                [citizen.id]: currentValue,
            }));

            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toastEl) => {
                    toastEl.addEventListener("mouseenter", Swal.stopTimer);
                    toastEl.addEventListener("mouseleave", Swal.resumeTimer);
                },
            });

            Toast.fire({
                icon: "error",
                title: `${error?.response?.data?.message || "No se pudo actualizar el voto"}`,
            });
        } finally {
            setIsSavingVote((prev) => ({
                ...prev,
                [citizen.id]: false,
            }));
        }
    };

    return (
        <div className="row">
            {citizens?.map((item) => {
                const voteChecked =
                    votesByCitizen[item.id] ?? Boolean(item.sufragio?.suffrage);

                return (
                    <div
                        key={item.id}
                        className="col-md-4 col-sm-6 col-xl-4 col-12"
                        style={{ minWidth: "400px" }}
                    >
                        <div className="info-box">
                            <span className=" " style={{ width: "auto" }}>
                                <Link to={`/mypeople/${item.id}`}>
                                    <img
                                        style={{ width: "150px", height: "150px" }}
                                        className="img-fluid"
                                        src={item?.picture}
                                        alt={item?.firstName + " " + item?.lastName}
                                    />
                                </Link>
                                <div className="card-footer">
                                    <div className="form-group">
                                        <div className="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id={`vote-switch-${item.id}`}
                                                name="includeExterior"
                                                checked={voteChecked}
                                                disabled={Boolean(isSavingVote[item.id])}
                                                onChange={() => handleToggleVote(item)}
                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor={`vote-switch-${item.id}`}
                                            >
                                                {voteChecked ? "Voto" : "No Voto"}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </span>
                            <div className="info-box-content">
                                <span className="info-box-text">
                                    <Link
                                        to={`/mypeople/${item.id}`}
                                        style={{ color: "#000" }}
                                    >
                                        {item.firstName} {item.lastName}{" "}
                                        {item.nickname ? `(${item.nickname})` : ""}
                                    </Link>
                                </span>

                                <ul
                                    className="ciudadanosColegio"
                                    style={{
                                        padding: "0",
                                        lineHeight: "20px",
                                        minWidth: "100px",
                                    }}
                                >
                                    <li>
                                        <b>Ced: </b>
                                        {item.citizenID.substring(0, 3) +
                                            "-" +
                                            item.citizenID.substring(3, 10) +
                                            "-" +
                                            item.citizenID.substring(10, 11)}
                                    </li>
                                    <li>
                                        <b>Cel: </b>
                                        <a href={`tel:${item.celphone}`}>
                                            {item.celphone}
                                        </a>
                                    </li>
                                    <li>
                                        <b>Tel: </b>
                                        <a href={`tel:${item.telephone}`}>
                                            {item.telephone}
                                        </a>
                                    </li>
                                    <li>
                                        <b>Otro Tel: </b>
                                        {item.otherphone}
                                    </li>
                                    <li>
                                        <b>Dir:</b> {item.adress}
                                    </li>
                                    <li>
                                        <b>Posicion:</b> {item.position}
                                    </li>
                                    <li>
                                        {item.leaders?.id ? (
                                            <span>
                                                Lider:{" "}
                                                <Link
                                                    to={`/peoplebyuser/${item.leaders?.id}`}
                                                >
                                                    {item.leaders?.censu?.firstName}
                                                </Link>
                                            </span>
                                        ) : addPeople ? (
                                            <a
                                                className="btn btn-xs btn-primary"
                                                onClick={() => {
                                                    addPeople(item.id);
                                                }}
                                            >
                                                <i className="fas fa-user-plus" /> Agregar a Mi Gente
                                            </a>
                                        ) : (
                                            ""
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ListByCollege;

