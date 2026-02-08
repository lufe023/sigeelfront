import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import getConfig from "../../utils/getConfig";

const TerritorioAssignment = ({ usuarioId }) => {
    const [todos, setTodos] = useState([]);
    const [asignadosIds, setAsignadosIds] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");
    const API_URL = import.meta.env.VITE_API_SERVER;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const URL = `${API_URL}/api/v1/sector/usuarios/${usuarioId}/sectores-asignacion`;
                const response = await axios.get(URL, getConfig());

                const data = response.data.data;
                setTodos(data.todos || []);
                setAsignadosIds(
                    new Set(data.asignados.map((a) => a.idsectorparaje)),
                );
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
                setLoading(false);
            }
        };
        if (usuarioId) fetchData();
    }, [usuarioId]);

    // Filtrado eficiente: Solo procesamos cuando el usuario escribe
    const filtrados = useMemo(() => {
        if (!filter) return []; // No mostrar nada si no busca (para ahorrar recursos)
        const f = filter.toLowerCase();
        return todos
            .filter(
                (s) =>
                    s.Descripcion?.toLowerCase().includes(f) ||
                    s.ciudadseccion?.municipio?.description
                        ?.toLowerCase()
                        .includes(f) ||
                    s.ciudadseccion?.municipio?.provincia?.Descripcion?.toLowerCase().includes(
                        f,
                    ),
            )
            .slice(0, 100); // Limitamos a 100 para que el render sea instantáneo
    }, [filter, todos]);

    const toggleSector = (id) => {
        const newSet = new Set(asignadosIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setAsignadosIds(newSet);
    };

    const handleSave = async () => {
        try {
            const URL_POST = `${API_URL}/api/v1/sector/usuarios/sectores/sincronizar`;
            await axios.post(
                URL_POST,
                {
                    idUsuario: usuarioId,
                    nuevosSectores: Array.from(asignadosIds),
                },
                getConfig(),
            );
            Swal.fire({
                icon: "success",
                title: "Sincronizado",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (error) {
            Swal.fire("Error", "No se pudo guardar", "error");
        }
    };

    return (
        <div className="card card-outline card-primary">
            <div className="card-header">
                <h3 className="card-title">
                    Asignación de Sectores ({asignadosIds.size} seleccionados)
                </h3>
            </div>
            <div className="card-body">
                <div className="row">
                    {/* COLUMNA IZQUIERDA: BÚSQUEDA Y SELECCIÓN */}
                    <div className="col-md-6">
                        <label>
                            Buscar Sector (Provincia, Municipio o Nombre):
                        </label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Ej: Rio San Juan..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        <div
                            className="list-group"
                            style={{
                                maxHeight: "400px",
                                overflowY: "auto",
                                border: "1px solid #ddd",
                            }}
                        >
                            {filtrados.length === 0 && filter && (
                                <div className="p-2 text-muted">
                                    No se encontraron resultados
                                </div>
                            )}
                            {!filter && (
                                <div className="p-2 text-info">
                                    Escribe para buscar entre los 10,000
                                    sectores...
                                </div>
                            )}
                            {filtrados.map((s) => (
                                <button
                                    key={s.SectorParajeId}
                                    className={`list-group-item list-group-item-action ${asignadosIds.has(s.SectorParajeId) ? "active" : ""}`}
                                    onClick={() =>
                                        toggleSector(s.SectorParajeId)
                                    }
                                >
                                    <small>
                                        {
                                            s.ciudadseccion?.municipio
                                                ?.provincia?.Descripcion
                                        }{" "}
                                        /{" "}
                                        {
                                            s.ciudadseccion?.municipio
                                                ?.description
                                        }
                                    </small>
                                    <br />
                                    <strong>{s.Descripcion}</strong>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: LO QUE YA ESTÁ SELECCIONADO */}
                    <div className="col-md-6">
                        <label>Sectores Seleccionados:</label>
                        <div
                            className="list-group"
                            style={{
                                maxHeight: "438px",
                                overflowY: "auto",
                                border: "1px solid #ddd",
                                backgroundColor: "#f8f9fa",
                            }}
                        >
                            {Array.from(asignadosIds).length === 0 && (
                                <div className="p-2 text-muted">
                                    Ninguno seleccionado
                                </div>
                            )}
                            {todos
                                .filter((s) =>
                                    asignadosIds.has(s.SectorParajeId),
                                )
                                .map((s) => (
                                    <div
                                        key={s.SectorParajeId}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <span>
                                            {s.Descripcion}{" "}
                                            <small className="d-block text-muted">
                                                {
                                                    s.ciudadseccion?.municipio
                                                        ?.description
                                                }
                                            </small>
                                        </span>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() =>
                                                toggleSector(s.SectorParajeId)
                                            }
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <button
                    className="btn btn-primary float-right"
                    onClick={handleSave}
                    disabled={loading}
                >
                    <i className="fas fa-save mr-2"></i> Guardar Cambios
                </button>
            </div>
        </div>
    );
};

export default TerritorioAssignment;
