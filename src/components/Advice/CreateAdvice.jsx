import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import getConfig from '../../utils/getConfig'
import Swal from 'sweetalert2'

const CreateAdvice = ({ getAdvices, editData, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        message: '',
        type: 'info',
        dateStart: '',
        dateEnd: '',
        showDelegate: false,
        showColaborators: true,
        showAdministrators: true,
        active: true
    })
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const editorRef = useRef(null)

    useEffect(() => {
        if (editData) {
            setFormData({
                title: editData.title || '',
                message: editData.message || '',
                type: editData.type || 'info',
                dateStart: editData.dateStart ? editData.dateStart.split('T')[0] : '',
                dateEnd: editData.dateEnd ? editData.dateEnd.split('T')[0] : '',
                showDelegate: editData.showDelegate || false,
                showColaborators: editData.showColaborators ?? true,
                showAdministrators: editData.showAdministrators ?? true,
                active: editData.active ?? true
            })
        } else {
            resetForm()
        }
    }, [editData])

    useEffect(() => {
        // inicializar Summernote si está disponible globalmente
        const $el = window.jQuery && editorRef.current ? window.jQuery(editorRef.current) : null
        if ($el && $el.summernote) {
            $el.summernote({ height: 420 })
            // set initial content
            $el.summernote('code', formData.message || '')
        }

        return () => {
            if ($el && $el.summernote) {
                $el.summernote('destroy')
            }
        }
    }, [])

    useEffect(() => {
        // when formData.message changes (e.g., editData loaded), update editor
        const $el = window.jQuery && editorRef.current ? window.jQuery(editorRef.current) : null
        if ($el && $el.summernote) {
            $el.summernote('code', formData.message || '')
        }
    }, [formData.message])

    const resetForm = () => {
        setFormData({
            title: '',
            message: '',
            type: 'info',
            dateStart: '',
            dateEnd: '',
            showDelegate: false,
            showColaborators: true,
            showAdministrators: true,
            active: true
        })
        setImage(null)
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleFileChange = (e) => {
        setImage(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        const data = new FormData()
        data.append('title', formData.title)
        // obtener HTML desde Summernote si está inicializado
        const $el = window.jQuery && editorRef.current ? window.jQuery(editorRef.current) : null
        const messageHtml = $el && $el.summernote ? $el.summernote('code') : formData.message

        // validar contenido no vacío (ignorando etiquetas)
        const textOnly = messageHtml ? messageHtml.replace(/<[^>]*>/g, '').trim() : ''
        if (!textOnly) {
            setLoading(false)
            Swal.fire({ icon: 'warning', title: 'El contenido no puede estar vacío' })
            return
        }

        data.append('message', messageHtml)
        data.append('type', formData.type)
        data.append('dateStart', formData.dateStart)
        data.append('dateEnd', formData.dateEnd)
        data.append('showDelegate', formData.showDelegate)
        data.append('showColaborators', formData.showColaborators)
        data.append('showAdministrators', formData.showAdministrators)
        data.append('active', formData.active)

        if (image) {
            data.append('image_url', image)
        }

        const url = editData
            ? `${import.meta.env.VITE_API_SERVER}/api/v1/advice/${editData.id}`
            : `${import.meta.env.VITE_API_SERVER}/api/v1/advice`

        const method = editData ? axios.put : axios.post

        method(url, data, getConfig())
            .then(res => {
                setLoading(false)
                getAdvices()
                resetForm()
                if (onCancel) {
                    onCancel()
                }
                Swal.fire({
                    icon: 'success',
                    title: editData ? 'Anuncio actualizado' : 'Anuncio creado',
                    timer: 2000,
                    showConfirmButton: false
                })
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar'
                })
            })
    }

    const handleCancel = () => {
        resetForm()
        if (onCancel) {
            onCancel()
        }
    }

    return (
        <div className="card card-primary" style={{ borderRadius: 12, boxShadow: '0 6px 18px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
            <div className="card-header" style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                    <i className={`fas ${editData ? 'fa-edit' : 'fa-plus-circle'} mr-2`} />
                    <h3 className="card-title" style={{ margin: 0 }}>{editData ? 'Editar Anuncio' : 'Nuevo Anuncio'}</h3>
                </div>
                <div className="card-tools" style={{ marginLeft: 8 }}>
                    <button type="button" className="btn btn-tool" data-card-widget="collapse" aria-label="collapse">
                        <i className="fas fa-minus" />
                    </button>
                </div>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-9">
                            <div className="form-group">
                                <label>Título</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Contenido</label>
                                {/* Summernote editor (AdminLTE v3) */}
                                <div ref={editorRef} name="message" />
                            </div>

                            <div className="form-group">
                                <label>Imagen</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <small className="text-muted"> formatos: jpg, png, gif</small>
                            </div>
                        </div>
                        <div className="col-md-3">

                            <div className="form-group">
                                <label>Tipo</label>
                                <select
                                    className="form-control"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                >
                                    <option value="info">Información</option>
                                    <option value="event">Evento</option>
                                    <option value="alert">Alerta</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Fecha Inicio</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="dateStart"
                                    value={formData.dateStart}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Fecha Fin</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="dateEnd"
                                    value={formData.dateEnd}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Mostrar a:</label>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="showDelegate"
                                        checked={formData.showDelegate}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">Delegados</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="showColaborators"
                                        checked={formData.showColaborators}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">Colaboradores</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="showAdministrators"
                                        checked={formData.showAdministrators}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">Administradores</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Publicado</label>
                                <div className="custom-control custom-switch">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="active-switch"
                                        name="active"
                                        checked={!!formData.active}
                                        onChange={handleChange}
                                    />
                                    <label className="custom-control-label" htmlFor="active-switch">{formData.active ? 'Sí' : 'No'}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer" style={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm mr-2"
                            onClick={handleCancel}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary btn-sm float-right"
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : editData ? 'Actualizar' : 'Crear'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateAdvice
