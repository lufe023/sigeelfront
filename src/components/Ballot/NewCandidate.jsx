import React, { useEffect, useState } from "react";
import Cargando from "../../utils/Cargando";
import getConfig from "../../utils/getConfig";
import axios from "axios";
import Swal from "sweetalert2";

const NewCandidate = ({ getAllCandidates, getAllParties, parties }) => {
    /* Estados para el mapa y las selecciones */
    const [maps, setMaps] = useState([]);
    const [selectedProvinceId, setSelectedProvinceId] = useState("");
    const [selectedMunicipalityId, setSelectedMunicipalityId] = useState(""); // Se mantiene para Distritos

    /* Estado de carga */
    const [formLoading, setFormLoading] = useState(false);

    // --- Lógica para Obtener el Mapa ---
    const getAllMaps = () => {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/maps`;
        axios
            .get(URL, getConfig())
            .then((res) => {
                console.log(res.data);
                // 'res.data' ahora contiene la mezcla de provincias y municipios
                setMaps(res.data);
            })
            .catch((err) => {
                console.error(err);
                // ... (manejo de error con Swal)
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
                    title: `Acción no permitida: ${
                        err.response?.statusText || "Error de red"
                    }`,
                });
            });
    };

    useEffect(() => {
        getAllMaps();
    }, []);

    // --- Lógica de Filtrado y Dependencia con el nuevo enfoque "type" ---

    // 1. Filtra las Provincias: donde 'type' es "province"
    const provincias = maps.filter((map) => map.type === "province");

    // 2. Filtra los Municipios: donde 'type' es "municipality" y 'parentId' coincide con la provincia seleccionada
    // Nota: Asumo que los municipios tienen una propiedad que enlaza con la provincia (ej: parentId o provinciaId).
    // Si tu backend usa el campo 'provinciaId' para el Municipio, úsalo aquí. Si usa 'parent', déjalo así.
    const municipios = maps.filter(
        (map) =>
            map.type === "municipality" &&
            String(map.ProvinciaId) === selectedProvinceId // Usando 'provinciaId' como ejemplo, ajusta si es 'parent'
    );

    // 3. (OPCIONAL) Distritos: Si existieran, tendrían que tener otro 'type' y un 'parent' que apunte al municipio.
    // Como tu función de backend SOLO retorna province y municipality, filtramos solo los municipios.
    // Si tienes distritos, DEBES agregarlos a la función getAllMaps del backend, y asignarle un 'type' y 'parent' correcto.
    const distritos = maps.filter(
        (map) =>
            map.type === "district" &&
            String(map.municipioId) === selectedMunicipalityId
    );
    // Nota: Por ahora, `distritos` estará vacío a menos que agregues un 'type: "district"' en el backend.

    // --- Handlers de Cambio (Event Handlers) ---

    const handleChangeProvincia = (event) => {
        const newProvinceId = event.target.value;
        // Reinicia Municipio y Distrito cuando cambia la Provincia
        setSelectedProvinceId(newProvinceId);
        setSelectedMunicipalityId("");
    };

    const handleChangeMunicipio = (event) => {
        const newMunicipalityId = event.target.value;
        // Reinicia Distrito cuando cambia el Municipio
        setSelectedMunicipalityId(newMunicipalityId);
    };

    // --- Handler de Envío (Submit Handler) ---

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormLoading(true);

        const form = e.target;
        let data = new FormData();

        data.append("name", form.nombre.value);
        data.append("party", form.partido.value);
        data.append("nomination", form.candidatura.value);
        data.append("file", form.file.files[0]);
        // Asegúrate de que los valores enviados son los IDs correctos o un string vacío.
        data.append("provincia", form.provincia.value);
        data.append("municipio", form.municipio.value);
        data.append("distritoMunicipal", form.distrito.value || "");

        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/ballots/`;
        axios
            .post(URL, data, getConfig())
            .then((res) => {
                // ... (lógica de éxito)
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
                    title: "Candidato Agregado con éxito",
                });
            })
            .catch((err) => {
                // ... (lógica de error)
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
                    title: `Acción no permitida: ${
                        err.response?.data?.message ||
                        err.response?.statusText ||
                        "Error desconocido"
                    }`,
                });
            });
    };

    // --- Renderizado ---

    if (formLoading) {
        return (
            <div
                className="loading"
                style={{ height: "100px", marginBottom: "50px" }}
            >
                <Cargando scala="3" />
            </div>
        );
    } else {
        return (
            <div className="card-body">
                <h3>Agregar un nuevo candidato/a</h3>

                <form
                    className="new-candidate-form"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                >
                    <div className="row">
                        {/* INPUTS DE CANDIDATO */}
                        <div className="col-3">
                            {/* ... (Tu input de archivo) */}
                            <input
                                type="file"
                                className="custom-file-input"
                                id="canditate-picture"
                                accept="image/png, image/jpeg"
                                name="file"
                                required
                            />
                            <label
                                className="custom-file-label"
                                htmlFor="canditate-picture"
                            >
                                Elige una foto
                            </label>
                        </div>
                        <div className="col-2">
                            <input
                                required
                                type="text"
                                placeholder="Nombre"
                                className="form-control"
                                name="nombre"
                            />
                        </div>
                        <div className="col-2">
                            <select
                                name="partido"
                                className="form-control"
                                required
                            >
                                <option value="">Partido</option>
                                {parties?.map((party) => (
                                    <option
                                        key={party.id}
                                        value={party.id}
                                        style={{ backgroundColor: party.color }}
                                    >
                                        {party.partyAcronyms}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-2">
                            <select
                                className="form-control"
                                name="candidatura"
                                required
                            >
                                <option value="">Postula a</option>
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

                    {/* SELECTORES DE MAPA */}
                    <div className="row" style={{ marginTop: "10px" }}>
                        <div className="col-11">
                            {/* PROVINCIA */}
                            <select
                                className="form-control"
                                name="provincia"
                                onChange={handleChangeProvincia}
                                value={selectedProvinceId}
                                required
                            >
                                <option value="">Provincia</option>
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

                    <div className="row" style={{ marginTop: "10px" }}>
                        <div className="col-11">
                            {/* MUNICIPIO */}
                            <select
                                className="form-control"
                                name="municipio"
                                onChange={handleChangeMunicipio}
                                value={selectedMunicipalityId}
                                disabled={!selectedProvinceId}
                                required
                            >
                                <option value="">Municipio</option>
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

                    <div className="row" style={{ marginTop: "10px" }}>
                        <div className="col-11">
                            {/* DISTRITO (Puede estar vacío si no lo devuelve el backend) */}
                            <select
                                className="form-control"
                                name="distrito"
                                defaultValue=""
                                disabled={
                                    !selectedMunicipalityId ||
                                    distritos.length === 0
                                }
                            >
                                <option value="">Distrito Municipal</option>
                                {distritos.map((distrito) => (
                                    <option
                                        key={distrito.id}
                                        value={distrito.id}
                                    >
                                        {distrito.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="card-footer">
                        <button
                            type="submit"
                            className="btn btn-primary float-right"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};

export default NewCandidate;
