import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cargando from "../../utils/Cargando";
import getConfig from "../../utils/getConfig";
import "./NewCandidate.css";

const NewCandidate = ({ getAllCandidates, parties }) => {
    const [maps, setMaps] = useState([]);
    const [selectedProvinceId, setSelectedProvinceId] = useState("");
    const [selectedMunicipalityId, setSelectedMunicipalityId] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    const getAllMaps = () => {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/maps`;

        axios
            .get(URL, getConfig())
            .then((res) => {
                setMaps(res.data);
            })
            .catch((err) => {
                console.error(err);

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
                    title: `Accion no permitida: ${
                        err.response?.statusText || "Error de red"
                    }`,
                });
            });
    };

    useEffect(() => {
        getAllMaps();
    }, []);

    const provincias = maps.filter((map) => map.type === "province");
    const municipios = maps.filter(
        (map) =>
            map.type === "municipality" &&
            String(map.ProvinciaId) === selectedProvinceId
    );
    const distritos = maps.filter(
        (map) =>
            map.type === "district" &&
            String(map.parentMunicipalityId) === selectedMunicipalityId
    );

    const availablePartyCount = parties?.length ?? 0;
    const mapsLoaded = maps.length > 0;

    const locationStatus = !mapsLoaded
        ? "Cargando ubicaciones disponibles..."
        : !selectedProvinceId
        ? "Selecciona una provincia para habilitar los municipios."
        : !selectedMunicipalityId
        ? "Selecciona un municipio para revisar si hay distritos."
        : distritos.length > 0
        ? `${distritos.length} distritos disponibles para este municipio.`
        : "Este municipio no tiene distritos registrados.";

    const handleChangeProvincia = (event) => {
        setSelectedProvinceId(event.target.value);
        setSelectedMunicipalityId("");
    };

    const handleChangeMunicipio = (event) => {
        setSelectedMunicipalityId(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormLoading(true);

        const form = e.target;
        const data = new FormData();

        data.append("name", form.nombre.value);
        data.append("party", form.partido.value);
        data.append("nomination", form.candidatura.value);
        data.append("file", form.file.files[0]);
        data.append("provincia", form.provincia.value);
        data.append("municipio", form.municipio.value);
        data.append("distritoMunicipal", form.distrito.value || "");

        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/ballots/`;

        axios
            .post(URL, data, getConfig())
            .then(() => {
                setFormLoading(false);
                getAllCandidates();
                form.reset();
                setSelectedProvinceId("");
                setSelectedMunicipalityId("");

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
                    title: "Candidato agregado con exito",
                });
            })
            .catch((err) => {
                console.error(err);
                setFormLoading(false);

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
                    title: `Accion no permitida: ${
                        err.response?.data?.message ||
                        err.response?.statusText ||
                        "Error desconocido"
                    }`,
                });
            });
    };

    if (formLoading) {
        return (
            <div className="new-candidate-loading">
                <Cargando scala="3" />
            </div>
        );
    }

    return (
        <div className="new-candidate-shell">
            <div className="new-candidate-card">
                <div className="new-candidate-hero">
                    <div>
                        <span className="new-candidate-eyebrow">
                            Gestion de boleta
                        </span>
                        <h3 className="new-candidate-title">
                            Registrar nuevo candidato
                        </h3>
                        <p className="new-candidate-subtitle">
                            Un formulario mas claro para cargar la foto, el
                            partido y la demarcacion sin perderte entre campos.
                        </p>
                    </div>

                    <div className="new-candidate-badges">
                        <span className="new-candidate-badge">
                            {availablePartyCount} partidos
                        </span>
                        <span className="new-candidate-badge">
                            {provincias.length} provincias
                        </span>
                        <span className="new-candidate-badge">
                            {selectedProvinceId ? municipios.length : 0} municipios
                        </span>
                    </div>
                </div>

                <form
                    className="new-candidate-form"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                >
                    <div className="new-candidate-grid">
                        <section className="new-candidate-panel">
                            <div className="new-candidate-panel-header">
                                <span className="new-candidate-panel-icon">
                                    <i className="fas fa-id-card"></i>
                                </span>
                                <div>
                                    <h4>Informacion personal</h4>
                                    <p>
                                        Completa los datos base del candidato y
                                        su postulacion.
                                    </p>
                                </div>
                            </div>

                            <div className="new-candidate-field">
                                <label htmlFor="canditate-picture">
                                    Foto del candidato
                                </label>
                                <input
                                    type="file"
                                    className="form-control-file new-candidate-file"
                                    id="canditate-picture"
                                    accept="image/png, image/jpeg"
                                    name="file"
                                    required
                                />
                                <small>Formato PNG o JPG, hasta 5MB.</small>
                            </div>

                            <div className="new-candidate-field">
                                <label htmlFor="nombre">Nombre completo</label>
                                <div className="new-candidate-control">
                                    <span className="new-candidate-control-icon">
                                        <i className="fas fa-user"></i>
                                    </span>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Ej. Maria Rodriguez"
                                        className="form-control new-candidate-input"
                                        name="nombre"
                                        id="nombre"
                                    />
                                </div>
                            </div>

                            <div className="new-candidate-field">
                                <label htmlFor="partido">Partido politico</label>
                                <div className="new-candidate-control">
                                    <span className="new-candidate-control-icon">
                                        <i className="fas fa-flag"></i>
                                    </span>
                                    <select
                                        name="partido"
                                        className="form-control new-candidate-input"
                                        id="partido"
                                        required
                                        disabled={!availablePartyCount}
                                    >
                                        <option value="">
                                            {availablePartyCount
                                                ? "Selecciona un partido"
                                                : "No hay partidos cargados"}
                                        </option>
                                        {parties?.map((party) => (
                                            <option key={party.id} value={party.id}>
                                                {party.partyAcronyms} -{" "}
                                                {party.partyName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="new-candidate-field">
                                <label htmlFor="candidatura">Candidatura</label>
                                <div className="new-candidate-control">
                                    <span className="new-candidate-control-icon">
                                        <i className="fas fa-trophy"></i>
                                    </span>
                                    <select
                                        className="form-control new-candidate-input"
                                        name="candidatura"
                                        id="candidatura"
                                        required
                                    >
                                        <option value="">
                                            Selecciona el cargo al que postula
                                        </option>
                                        <option>Consejal Distrital</option>
                                        <option>Director Municipal</option>
                                        <option>Regidor Municipal</option>
                                        <option>Alcalde Municipal</option>
                                        <option>Diputado/a</option>
                                        <option>Senador/a</option>
                                        <option>Presidente</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        <section className="new-candidate-panel">
                            <div className="new-candidate-panel-header">
                                <span className="new-candidate-panel-icon">
                                    <i className="fas fa-map-marked-alt"></i>
                                </span>
                                <div>
                                    <h4>Ubicacion electoral</h4>
                                    <p>
                                        Define provincia, municipio y distrito
                                        municipal en orden.
                                    </p>
                                </div>
                            </div>

                            <div className="new-candidate-location-card">
                                <strong>Estado de la seleccion</strong>
                                <p>{locationStatus}</p>
                            </div>

                            <div className="new-candidate-field">
                                <label htmlFor="provincia">Provincia</label>
                                <div className="new-candidate-control">
                                    <span className="new-candidate-control-icon">
                                        <i className="fas fa-globe-americas"></i>
                                    </span>
                                    <select
                                        className="form-control new-candidate-input"
                                        name="provincia"
                                        id="provincia"
                                        onChange={handleChangeProvincia}
                                        value={selectedProvinceId}
                                        required
                                        disabled={!mapsLoaded}
                                    >
                                        <option value="">
                                            {mapsLoaded
                                                ? "Selecciona una provincia"
                                                : "Cargando provincias..."}
                                        </option>
                                        {provincias.map((provincia) => (
                                            <option
                                                key={provincia.ProvinciaId}
                                                value={provincia.ProvinciaId}
                                            >
                                                {provincia.Descripcion}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="new-candidate-field">
                                <label htmlFor="municipio">Municipio</label>
                                <div className="new-candidate-control">
                                    <span className="new-candidate-control-icon">
                                        <i className="fas fa-city"></i>
                                    </span>
                                    <select
                                        className="form-control new-candidate-input"
                                        name="municipio"
                                        id="municipio"
                                        onChange={handleChangeMunicipio}
                                        value={selectedMunicipalityId}
                                        disabled={!selectedProvinceId}
                                        required
                                    >
                                        <option value="">
                                            {selectedProvinceId
                                                ? "Selecciona un municipio"
                                                : "Primero elige la provincia"}
                                        </option>
                                        {municipios.map((municipio) => (
                                            <option
                                                key={municipio.MunicipalityId}
                                                value={municipio.MunicipalityId}
                                            >
                                                {municipio.description}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="new-candidate-field">
                                <label htmlFor="distrito">
                                    Distrito municipal
                                </label>
                                <div className="new-candidate-control">
                                    <span className="new-candidate-control-icon">
                                        <i className="fas fa-building"></i>
                                    </span>
                                    <select
                                        className="form-control new-candidate-input"
                                        name="distrito"
                                        id="distrito"
                                        defaultValue=""
                                        disabled={
                                            !selectedMunicipalityId ||
                                            distritos.length === 0
                                        }
                                    >
                                        <option value="">
                                            {selectedMunicipalityId &&
                                            distritos.length > 0
                                                ? "Selecciona un distrito"
                                                : selectedMunicipalityId
                                                ? "No hay distritos disponibles"
                                                : "Primero elige el municipio"}
                                        </option>
                                        {distritos.map((distrito) => (
                                            <option
                                                key={distrito.MunicipalityId}
                                                value={distrito.MunicipalityId}
                                            >
                                                {distrito.description}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <small>
                                    Este campo es opcional y solo aparece si el
                                    municipio tiene distritos.
                                </small>
                            </div>
                        </section>
                    </div>

                    <div className="new-candidate-footer">
                        <p>
                            Revisa la foto y la ubicacion antes de guardar para
                            evitar duplicados en la boleta.
                        </p>

                        <div className="new-candidate-actions">
                            {/* <button
                                type="button"
                                className="btn btn-light new-candidate-secondary"
                                onClick={() => window.history.back()}
                            >
                                Volver
                            </button> */}
                            <button
                                type="submit"
                                className="btn btn-primary new-candidate-submit"
                                disabled={formLoading}
                            >
                                <i className="fas fa-save mr-2"></i>
                                Crear candidato
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewCandidate;
