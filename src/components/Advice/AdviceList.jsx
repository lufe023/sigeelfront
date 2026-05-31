import axios from 'axios'
import React, { useState } from 'react'
import getConfig from '../../utils/getConfig'
import Swal from 'sweetalert2'

const AdviceList = ({ advice, getAdvices, onEdit }) => {
    const [loading, setLoading] = useState(false)
    const [localAdvice, setLocalAdvice] = useState({ ...advice })

    const getTypeBadge = (type) => {
        const badges = {
            info: 'bg-info',
            event: 'bg-success',
            alert: 'bg-danger'
        }
        return badges[type] || 'bg-primary'
    }

    const formatDate = (date) => {
        if (!date) return 'No definida'
        // If it's an ISO datetime, take the date part to avoid timezone shifts
        let d = date
        if (typeof date === 'string' && date.includes('T')) {
            d = date.split('T')[0]
        }
        // If it's in YYYY-MM-DD format, convert to DD/MM/YYYY
        const m = d.match(/^(\d{4})-(\d{2})-(\d{2})$/)
        if (m) return `${m[3]}/${m[2]}/${m[1]}`
        // Fallback to Date parsing
        try {
            return new Date(d).toLocaleDateString('es-ES')
        } catch (e) {
            return d
        }
    }

    const sanitizeHtml = (html) => {
        if (!html) return ''
        // remove script tags
        return String(html).replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    }

    const toggleActive = async () => {
        setLoading(true)
        try {
            const res = await axios.put(
                `${import.meta.env.VITE_API_SERVER}/api/v1/advice/${localAdvice.id}/toggle-active`,
                {},
                getConfig()
            )

            // actualizar localmente sin recargar toda la lista
            setLocalAdvice(prev => ({ ...prev, active: !prev.active }))
            setLoading(false)
            Swal.fire({
                icon: 'success',
                title: localAdvice.active ? 'Anuncio desactivado' : 'Anuncio Publicado',
                timer: 2000,
                showConfirmButton: false
            })
        } catch (err) {
            console.log(err)
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar'
            })
        }
    }

    const deleteAdvice = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el anuncio',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true)
                axios.delete(
                    `${import.meta.env.VITE_API_SERVER}/api/v1/advice/${localAdvice.id}`,
                    getConfig()
                )
                    .then(res => {
                        getAdvices()
                        setLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Anuncio eliminado',
                            timer: 2000,
                            showConfirmButton: false
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        setLoading(false)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al eliminar'
                        })
                    })
            }
        })
    }



    const handleExternalEdit = () => {
        if (onEdit) onEdit(localAdvice)
    }

    return (
        <div className="col-md-12">
            <div className={`card ${localAdvice.active ? 'card-primary' : 'card-secondary'}`} style={{ borderRadius: 12, boxShadow: '0 6px 18px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                <div className="card-header" style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
                        <span className={`badge ${getTypeBadge(localAdvice.type)} mr-2`} style={{ flex: '0 0 auto' }}>
                            {localAdvice.type?.toUpperCase()}
                        </span>
                        <h3 className="card-title" style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{localAdvice.title}</h3>
                    </div>
                    <div className="card-tools" style={{ marginLeft: '8px' }}>
                        <button type="button" className="btn btn-tool" data-card-widget="collapse" aria-label="collapse">
                            <i className="fas fa-minus" />
                        </button>
                    </div>
                </div>

                <div className="card-body p-0">
                    {localAdvice.image_url && (
                        <img
                            src={`${import.meta.env.VITE_API_SERVER}/${localAdvice.image_url}`}
                            alt={localAdvice.title}
                            style={{ width: '100%', maxHeight: '260px', objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12, display: 'block' }}
                        />
                    )}

                    <table className="table table-sm">
                        <tbody>
                            <tr>
                                <td colSpan="2">
                                    <strong>Contenido:</strong>
                                    <div style={{ maxHeight: 140, overflow: 'auto', paddingTop: 6 }} dangerouslySetInnerHTML={{ __html: sanitizeHtml(localAdvice.message) }} />
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Fecha inicio:</strong> {formatDate(localAdvice.dateStart)}</td>
                                <td><strong>Fecha fin:</strong> {formatDate(localAdvice.dateEnd)}</td>
                            </tr>
                            <tr>
                                <td>
                                    <small className="text-muted">
                                        Mostrar a: {localAdvice.showDelegate ? 'Delegados ' : ''}
                                        {localAdvice.showColaborators ? 'Colaboradores ' : ''}
                                        {localAdvice.showAdministrators ? 'Administradores' : ''}
                                    </small>
                                </td>
                                <td>
                                    <span className={`badge ${localAdvice.active ? 'bg-success' : 'bg-secondary'}`}>
                                        {localAdvice.active ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <div className="card-footer" style={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
                    <div className="btn-group">
                        <button className="btn btn-info btn-sm" onClick={handleExternalEdit} disabled={loading}><i className="fas fa-edit"></i> Editar</button>
                        <button className={`btn btn-sm ${localAdvice.active ? 'btn-warning' : 'btn-success'}`} onClick={toggleActive} disabled={loading}>{localAdvice.active ? 'Despublicar' : 'Publicar'}</button>
                        <button className="btn btn-danger btn-sm" onClick={deleteAdvice} disabled={loading}><i className="fas fa-trash"></i> Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdviceList
