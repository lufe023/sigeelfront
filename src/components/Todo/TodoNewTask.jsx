import axios from "axios";
import React, { useEffect, useState } from "react";
import getConfig from "../../utils/getConfig";
import Swal from "sweetalert2";

const TodoNewTask = ({ getAllTask }) => {
    const [users, setUsers] = useState();
    const [selectedUser, setSelectedUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const getAllUsers = () => {
        axios
            .get(`${import.meta.env.VITE_API_SERVER}/api/v1/users`, getConfig())
            .then((res) => {
                setUsers(res.data.results);
            })

            .catch((err) => {
                console.error(err);
            });
    };
    useEffect(() => {
        getAllUsers();
    }, []);

    function resetForm(e) {
        setSelectedUser(null);
        setIsDropdownOpen(false);
        e.target.reset();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/todo/`;
        axios
            .post(
                URL,
                {
                    title: e.target.title.value,
                    description: e.target.description.value,
                    limit: e.target.limit.value,
                    isActive: e.target.estado.value,
                    responsible: e.target.responsible.value,
                },
                getConfig()
            )
            .then((res) => {
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
                    title: "Ingreso Exitoso",
                });
                resetForm(e);
            })
            .catch((err) => {
                console.error(err);
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
                    icon: "error",
                    title: "Error: Se deben completar todas las celdas",
                });
            });
        getAllTask();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card card-primary">
                <div className="card-header ui-sortable-handle">
                    <h3 className="card-title">Nueva Tarea </h3>
                    <div className="card-tools">
                        <div className="card-tools">
                            <button
                                type="button"
                                className="btn btn-tool"
                                data-card-widget="collapse"
                                title="Collapse"
                            >
                                <i className="fas fa-minus" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="title">Nombre de la tarea</label>
                        <input
                            type="text"
                            id="title"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputDescription">
                            Descripcion de la tarea
                        </label>
                        <input
                            name="description"
                            type="text"
                            id="inputDescription"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="before">Completar antes de</label>
                        <input
                            type="datetime-local"
                            id="before"
                            name="limit"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="estado">Estado</label>
                        <select
                            defaultValue={true}
                            className="form-control"
                            id="estado"
                            name="estado"
                        >
                            <option value={true}>Pendiente</option>
                            <option value={false}>Completado</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="responsible">Responsable</label>
                        <div className="dropdown">
                            <button
                                className="btn btn-outline-secondary dropdown-toggle form-control"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded={isDropdownOpen}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                {selectedUser ? (
                                    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                        <img
                                            src={selectedUser.censu.picture}
                                            alt="Foto"
                                            style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                                        />
                                        <div>
                                            <div>{selectedUser.censu.firstName} {selectedUser.censu.lastName}</div>
                                            <div style={{ fontSize: 'small', color: 'gray' }}>{selectedUser.censu.citizenID}</div>
                                        </div>
                                    </div>
                                ) : (
                                    'Seleccionar Responsable'
                                )}
                                <span className="caret"></span>
                            </button>
                            {isDropdownOpen && (
                                <div className="dropdown-menu show" aria-labelledby="dropdownMenuButton" style={{ width: '100%', maxHeight: '200px', overflowY: 'auto' }}>
                                    {users?.map((user) => (
                                        <a
                                            key={user.id}
                                            className="dropdown-item"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSelectedUser(user);
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img
                                                    src={user.censu.picture}
                                                    alt="Foto"
                                                    style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                                                />
                                                <div>
                                                    <div>{user.censu.firstName} {user.censu.lastName}</div>
                                                    <div style={{ fontSize: 'small', color: 'gray' }}>{user.censu.citizenID} - {user.email}</div>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                        <input type="hidden" name="responsible" value={selectedUser?.id || ''} />
                    </div>
                </div>
                <div
                    className="card-footer clearfix"
                    style={{ display: "block" }}
                >
                    <button
                        type="submit"
                        className="btn btn-primary float-right"
                        onClick={getAllTask}
                    >
                        <i className="fas fa-save"></i> Guardar
                    </button>
                </div>
            </div>
        </form>
    );
};

export default TodoNewTask;
