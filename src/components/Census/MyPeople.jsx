import axios from "axios";
import React, { useEffect, useState } from "react";
import getConfig from "../../utils/getConfig";
import Aside from "../Aside";
import Footer from "../Footer";
import Header from "../Header";
import PeopleCard from "./PeopleCard";
import Cargando from "../../utils/Cargando";
import GPSGeneralView from "./GPSGeneralView";
import { Link } from "react-router-dom";
import SearhPeople from "../SearhPeople";
import FindAndAddPeople from "./FindAndAddPeople";
import { useSelector } from "react-redux";

const MyPeople = () => {
    const user = useSelector((state) => state.userSlice);

    const [results, setResults] = useState();
    const [isLoading, setIsloading] = useState(true);
    const getMypeople = () => {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/mypeople`;
        axios
            .get(URL, getConfig())
            .then((res) => {
                setResults(res.data.rows);
                setIsloading(false);
            })
            .catch((err) => {
                setResults([]);
                setIsloading(false);
                console.log(err);
            });
    };

    useEffect(() => {
        getMypeople();
    }, []);
    return (
        <div>
            <Header />
            <Aside />
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Mi Gente</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        Mi Gente
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    {/* /.container-fluid */}
                </section>
                {/* Main content */}
                {isLoading ? (
                    <div
                        className="loading"
                        style={{ height: "100px", marginBottom: "50px" }}
                    >
                        <Cargando escala="1.5" />
                    </div>
                ) : (
                    ""
                )}
                <section className="content">
                    <FindAndAddPeople
                        getMypeople={getMypeople}
                        leaderId={user?.id}
                    />

                    {/* Default box */}
                    <div
                        className="row no-print"
                        style={{ marginBottom: "20px" }}
                    >
                        <div className="col-12">
                            <Link
                                to={"/printmypeople/?variable=2"}
                                type="button"
                                className="btn btn-danger "
                            >
                                <i className="fas fa-print" /> Formulario de
                                Captura
                            </Link>

                            <Link
                                to={"/printmyconcurrencia"}
                                type="button"
                                className="btn btn-primary float-right"
                            >
                                <i className="fas fa-print" /> Formulario de
                                Concurrencia
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12"></div>
                    </div>
                    <div className="row">
                        {results?.map(
                            (result) => (
                                console.log(result),
                                (
                                    <PeopleCard
                                        key={result.id}
                                        people={result}
                                        getMypeople={getMypeople}
                                    />
                                )
                            )
                        )}
                    </div>

                    {/*vista de mapa*/}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">
                                        Donde está mi gente
                                    </h5>
                                    <div className="card-tools">
                                        <button
                                            type="button"
                                            className="btn btn-tool"
                                            data-card-widget="collapse"
                                        >
                                            <i className="fas fa-minus" />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-tool"
                                            data-card-widget="remove"
                                        >
                                            <i className="fas fa-times" />
                                        </button>
                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {results ? (
                                                <GPSGeneralView
                                                    peoples={results}
                                                />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    {/* /.row */}
                                </div>

                                {/* /.card-footer */}
                            </div>
                            {/* /.card */}
                        </div>
                        {/* /.col */}
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default MyPeople;
