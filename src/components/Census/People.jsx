import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import getConfig from "../../utils/getConfig";
import Aside from "../Aside";
import Footer from "../Footer";
import Header from "../Header";
import GPS from "./GPS";
import CitizenForm from "./Forms/CitizenForm";
import Cargando from "../../utils/Cargando";
import AddTies from "./AddTies";
import ShowTies from "./Ties/ShowTies";
import NearbyCitizen from "./Complements/NearbyCitizen";
import ActivityCard from "./Complements/ActivityCard";
import ParticipationForm from "./Contact/Participation";
import BenefitForm from "./Contact/BenefitForm ";
import BenefitCard from "./Complements/BenefitCard";
import Jobs from "./Contact/Jobs";
import JobCard from "./Complements/JobCard";
import LocationPicker from "./Contact/LocationPicker";
import NewConditions from "./Contact/NewCondition";
import UpdateConditions from "./Contact/UpdateConditions";
import PeopleGallery from "./PeopleGallery";
import Swal from "sweetalert2";

const People = () => {
    const [people, setPeople] = useState();
    const [ties, setTies] = useState();
    const [updates, setUpdates] = useState();
    const { id } = useParams();
    const getPeople = () => {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/${id}`;
        axios
            .get(URL, getConfig())
            .then((res) => {
                setPeople(res.data.data);
                setUpdates(res.data.pendingUpdates);
            })
            .catch((err) => console.error(err));
    };
    useEffect(() => {
        getPeople();
        getTies();
    }, [id]);

    const getTies = () => {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/ties/${
            people?.citizenID
        }`;
        axios
            .get(URL, getConfig())
            .then((res) => {
                setTies(res.data);
            })
            .catch((err) => console.error(err));
    };
    useEffect(() => {
        getTies();
    }, [people]);

    const addPeople = (peopleId) => {
        const URL = `${
            import.meta.env.VITE_API_SERVER
        }/api/v1/census/addpeople`;

        Swal.fire({
            title: `¿Seguro quieres agregar a esta persona a tu padroncillo?`,
            text: `si procedes serás responsable de que ${people.firstName} vaya a votar`,
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Dejar sin efecto",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Proceder!",
        }).then((result) => {
            if (result.isConfirmed) {
                let timerInterval;
                Swal.fire({
                    title: "Agregando!",
                    timer: 0,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const b = Swal.getHtmlContainer().querySelector("b");
                        timerInterval = setInterval(() => {}, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                        setEliminado(true);
                    },
                });

                axios
                    .post(
                        URL,
                        {
                            peopleId,
                        },
                        getConfig()
                    )
                    .then((res) => {
                        getPeople();
                        Swal.fire(
                            "Operación exitosa",
                            "La persona ahora se encuentra en tu padroncillo, ver el modulo padroncillo para mas detalles",
                            "success"
                        );
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire({
                            icon: "error",
                            title: `Oops...`,
                            text: `${error.response.data.message}`,
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
                                <h1>Perfil del Ciudadano</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/dashboard">Administra</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to="/mypeople">Mi Gente</Link>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        Perfil del Ciudadano
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        {people ? (
                            <div className="row">
                                <div className="col-md-3">
                                    {/* Profile Image */}
                                    <div className="card card-primary card-outline">
                                        <div className="card-body box-profile">
                                            <div className="text-center">
                                                <img
                                                    className="profile-user-img img-fluid img-circle"
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_API_SERVER
                                                    }/api/v1/images/citizen/${
                                                        people?.picture
                                                    }`}
                                                    alt="User profile picture"
                                                />
                                            </div>
                                            <h3 className="profile-username text-center">
                                                {people?.firstName}{" "}
                                                {people?.lastName}
                                            </h3>
                                            <p className="text-muted text-center">
                                                {people?.nickname}
                                            </p>
                                            <p className="text-muted text-center">
                                                {people?.citizenID.substring(
                                                    0,
                                                    3
                                                )}
                                                -
                                                {people?.citizenID.substring(
                                                    3,
                                                    10
                                                )}
                                                -
                                                {people?.citizenID.substring(
                                                    10,
                                                    11
                                                )}
                                            </p>
                                            <ul className="list-group list-group-unbordered mb-3">
                                                <li className="list-group-item">
                                                    <b>Recinto</b>{" "}
                                                    <a className="float-right">
                                                        {
                                                            people?.colegio
                                                                ?.precinctData
                                                                ?.descripcion
                                                        }
                                                        {" ("}
                                                        {people?.colegio?.precinctData?.precintNumber
                                                            ?.toString()
                                                            .padStart(5, "0")}
                                                        {")"}
                                                    </a>
                                                </li>

                                                <li className="list-group-item">
                                                    <b>Mesa</b>{" "}
                                                    <a className="float-right">
                                                        {people?.colegio?.collegeNumber
                                                            .toString()
                                                            .padStart(5, "0")}
                                                    </a>
                                                </li>
                                                {people?.districts?.name ? (
                                                    <li className="list-group-item">
                                                        <b>
                                                            Distrito Municipal
                                                        </b>{" "}
                                                        <a className="float-right">
                                                            {
                                                                people
                                                                    ?.districts
                                                                    ?.name
                                                            }
                                                        </a>
                                                    </li>
                                                ) : (
                                                    ""
                                                )}

                                                <li className="list-group-item">
                                                    <b>Municipio</b>{" "}
                                                    <a className="float-right">
                                                        {
                                                            people
                                                                ?.municipalities
                                                                ?.description
                                                        }
                                                    </a>
                                                </li>
                                                <li className="list-group-item">
                                                    <b>Provincia</b>{" "}
                                                    <a className="float-right">
                                                        {
                                                            people?.provinces
                                                                ?.Descripcion
                                                        }
                                                    </a>
                                                </li>
                                                {people.leaders ? (
                                                    <li className="list-group-item">
                                                        <b>Lider</b>
                                                        <Link
                                                            to={`/mypeople/${people?.leaders?.censu?.id}`}
                                                            className="float-right"
                                                        >
                                                            {
                                                                people?.leaders
                                                                    ?.censu
                                                                    ?.firstName
                                                            }
                                                        </Link>
                                                    </li>
                                                ) : (
                                                    <button
                                                        className=" btn btn-success "
                                                        onClick={() =>
                                                            addPeople(
                                                                people?.id
                                                            )
                                                        }
                                                    >
                                                        <i className="fas fa-user-plus search-tool"></i>{" "}
                                                        Agregar a mi padroncillo
                                                    </button>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                    {people ? (
                                        <ParticipationForm
                                            citizenID={people?.citizenID}
                                            getPeople={getPeople}
                                        />
                                    ) : (
                                        ""
                                    )}
                                    {people ? (
                                        <BenefitForm
                                            citizenID={people?.citizenID}
                                            getPeople={getPeople}
                                        />
                                    ) : (
                                        ""
                                    )}
                                    {people ? (
                                        <Jobs
                                            citizenID={people?.citizenID}
                                            getPeople={getPeople}
                                        />
                                    ) : (
                                        ""
                                    )}
                                    {people ? (
                                        <LocationPicker
                                            citizenID={people?.citizenID}
                                            getPeople={getPeople}
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                                {/* /.col */}
                                <div className="col-md-9">
                                    <div className="card">
                                        <div className="card-header p-1">
                                            <ul className="nav nav-pills">
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link active"
                                                        href="#editar"
                                                        data-toggle="tab"
                                                    >
                                                        Editar
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link"
                                                        href="#galeria"
                                                        data-toggle="tab"
                                                    >
                                                        Galeria
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* /.card-header */}
                                        <div className="card-body">
                                            <div className="tab-content">
                                                <div
                                                    className="tab-pane active"
                                                    id="editar"
                                                >
                                                    <CitizenForm
                                                        updates={updates}
                                                        citizen={people}
                                                        getPeople={getPeople}
                                                    />
                                                </div>
                                                <div
                                                    className="tab-pane"
                                                    id="galeria"
                                                >
                                                    <PeopleGallery />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card card-default">
                                        <div className="card-header">
                                            <h3 className="card-title">
                                                Vinculos, relacionados y
                                                conocidos
                                            </h3>
                                            <div className="card-tools">
                                                <button
                                                    type="button"
                                                    className="btn btn-tool"
                                                    data-card-widget="collapse"
                                                >
                                                    <i className="fas fa-minus" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                {ties ? (
                                                    <ShowTies
                                                        ties={ties}
                                                        setPeople={setPeople}
                                                        getTies={getTies}
                                                    />
                                                ) : (
                                                    <div
                                                        className="loading"
                                                        style={{
                                                            height: "100px",
                                                            marginBottom:
                                                                "50px",
                                                            margin: "auto",
                                                        }}
                                                    >
                                                        <Cargando escala="1" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12">
                                                    {people ? (
                                                        <AddTies
                                                            aCitizenId={
                                                                people?.citizenID
                                                            }
                                                            getTies={getTies}
                                                            setTies={setTies}
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            {people?.condition ? (
                                                <UpdateConditions
                                                    condition={
                                                        people?.condition
                                                    }
                                                    citizenID={
                                                        people?.citizenID
                                                    }
                                                />
                                            ) : (
                                                <NewConditions
                                                    citizenID={
                                                        people?.citizenID
                                                    }
                                                    getPeople={getPeople}
                                                />
                                            )}
                                            {/* 
        <div className="card card-warning collapsed-card">
            <div className="card-header">
              <h3 className="card-title">
              <i className='fas fa-hands-helping'/> Condición 
              </h3>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                  <i className="fas fa-plus" />
                </button>
              </div>
            </div>
            <div className="card-body">
              hola
            </div>
          </div> */}

                                            <div className="card collapsed-card card-orange">
                                                <div className="card-header">
                                                    <h3 className="card-title">
                                                        <i className="fas fa-chart-line"></i>{" "}
                                                        Participacion
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
                                                    {people?.Actividades.map(
                                                        (actividad) => (
                                                            <ActivityCard
                                                                key={
                                                                    actividad.id
                                                                }
                                                                actividad={
                                                                    actividad
                                                                }
                                                                getPeople={
                                                                    getPeople
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="card collapsed-card card-lime">
                                                <div className="card-header">
                                                    <h3 className="card-title">
                                                        <i className="fas fa-hand-holding-medical"></i>{" "}
                                                        Beneficios
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
                                                    {people?.Beneficios.map(
                                                        (beneficio) => (
                                                            <BenefitCard
                                                                key={
                                                                    beneficio.id
                                                                }
                                                                beneficio={
                                                                    beneficio
                                                                }
                                                                getPeople={
                                                                    getPeople
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                            <div className="card collapsed-card card-maroon">
                                                <div className="card-header">
                                                    <h3 className="card-title">
                                                        <i className="far fa-building"></i>{" "}
                                                        Empleomania
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
                                                    {people?.Empleos.map(
                                                        (empleo) => (
                                                            <JobCard
                                                                key={empleo.id}
                                                                empleo={empleo}
                                                                getPeople={
                                                                    getPeople
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {people ? (
                                        <NearbyCitizen
                                            citizenId={people?.citizenID}
                                            setPeople={setPeople}
                                        />
                                    ) : (
                                        ""
                                    )}
                                    <div className="card card-default">
                                        <div className="card-header">
                                            <h3 className="card-title">
                                                GPS Location
                                            </h3>
                                            <div className="card-tools">
                                                <button
                                                    type="button"
                                                    className="btn btn-tool"
                                                    data-card-widget="collapse"
                                                >
                                                    <i className="fas fa-minus" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <GPS
                                                lat={
                                                    people?.geolocation?.latitud
                                                }
                                                long={
                                                    people?.geolocation
                                                        ?.longitud
                                                }
                                                peopleName={people?.firstName}
                                                picture={people?.picture}
                                                gotAutomatic={
                                                    people?.geolocation
                                                        ?.gotAutomatic
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* /.col */}
                            </div>
                        ) : (
                            <div
                                className="loading"
                                style={{
                                    height: "100px",
                                    marginBottom: "50px",
                                }}
                            >
                                <Cargando escala="2" />
                            </div>
                        )}
                        {/* /.row */}
                    </div>
                    {/* /.container-fluid */}
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default People;
