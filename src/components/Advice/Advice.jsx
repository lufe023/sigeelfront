import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Aside from '../Aside'
import Footer from '../Footer'
import AdviceList from './AdviceList'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import CreateAdvice from './CreateAdvice'

const Advice = () => {
    const [advices, setAdvices] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [editData, setEditData] = useState(null)
    const [filters, setFilters] = useState({
        type: '',
        active: '',
        showDelegate: '',
        showColaborators: '',
        showAdministrators: '',
        dateStart: '',
        dateEnd: ''
    })

    const getAdvices = () => {
        setIsLoading(true)
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/advice/admin/all`

        const params = new URLSearchParams()
        if (filters.type) params.append('type', filters.type)
        if (filters.active) params.append('active', filters.active)
        if (filters.showDelegate) params.append('showDelegate', filters.showDelegate)
        if (filters.showColaborators) params.append('showColaborators', filters.showColaborators)
        if (filters.showAdministrators) params.append('showAdministrators', filters.showAdministrators)
        if (filters.dateStart) params.append('dateStart', filters.dateStart)
        if (filters.dateEnd) params.append('dateEnd', filters.dateEnd)

        const queryString = params.toString()
        const finalURL = queryString ? `${URL}?${queryString}` : URL

        axios.get(finalURL, getConfig())
            .then(res => {
                const data = res.data
                let advicesArray = []
                if (Array.isArray(data)) {
                    advicesArray = data
                } else if (data && Array.isArray(data.rows)) {
                    advicesArray = data.rows
                } else if (data && data.id) {
                    advicesArray = [data]
                }
                setAdvices(advicesArray)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getAdvices()
    }, [])

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters(prev => ({ ...prev, [name]: value }))
    }

    const applyFilters = () => {
        getAdvices()
    }

    const clearFilters = () => {
        setFilters({
            type: '',
            active: '',
            showDelegate: '',
            showColaborators: '',
            showAdministrators: '',
            dateStart: '',
            dateEnd: ''
        })
        getAdvices()
    }

    const handleEdit = (advice) => {
        setEditData(advice)
    }

    const handleCancelEdit = () => {
        setEditData(null)
    }

    return (
        <>
            <Header />
            <Aside />


            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-12">
                                <h1 className="m-0">Administrar Anuncios</h1>
                            </div>
                            <div className="col-sm-12">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Anuncios</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="container-fluid pr-4 pl-4">
                    <div className="row">
                        <div className="col-lg-3 ">
                            {/* Left column: filtros + lista */}
                            <div className="card pr-2 pl-2 card-info" style={{ borderRadius: 12, boxShadow: '0 6px 18px rgba(0,0,0,0.04)', overflow: 'hidden', marginBottom: 12 }}>
                                <div className="card-header" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ flex: 1 }}>
                                        <h3 className="card-title" style={{ margin: 0 }}>Filtros</h3>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label>Tipo</label>
                                                <select className="form-control" name="type" value={filters.type} onChange={handleFilterChange}>
                                                    <option value="">Todos</option>
                                                    <option value="info">Información</option>
                                                    <option value="event">Evento</option>
                                                    <option value="alert">Alerta</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>Activo</label>
                                                <select className="form-control" name="active" value={filters.active} onChange={handleFilterChange}>
                                                    <option value="">Todos</option>
                                                    <option value="true">Si</option>
                                                    <option value="false">No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>Mostrar a</label>
                                                <select className="form-control" name="showAdministrators" value={filters.showAdministrators} onChange={handleFilterChange}>
                                                    <option value="">Todos</option>
                                                    <option value="true">Administradores</option>
                                                    <option value="false">No Administradores</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>Fecha Inicio</label>
                                                <input type="date" className="form-control" name="dateStart" value={filters.dateStart} onChange={handleFilterChange} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>Fecha Fin</label>
                                                <input type="date" className="form-control" name="dateEnd" value={filters.dateEnd} onChange={handleFilterChange} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group" style={{ marginTop: '6px' }}>
                                                <button className="btn btn-primary btn-sm mr-1" onClick={applyFilters}>
                                                    <i className="fas fa-search"></i> Buscar
                                                </button>
                                                <button className="btn btn-secondary btn-sm" onClick={clearFilters}>
                                                    <i className="fas fa-times"></i> Limpiar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    {isLoading ? (
                                        <div className="col-12 text-center">
                                            <p>Cargando...</p>
                                        </div>
                                    ) : advices.length === 0 ? (
                                        <div className="col-12">
                                            <div className="alert alert-info">
                                                No hay anuncios.
                                            </div>
                                        </div>
                                    ) : (
                                        advices.map(advice => (
                                            <AdviceList
                                                key={advice.id}
                                                advice={advice}
                                                getAdvices={getAdvices}
                                                onEdit={handleEdit}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-9">
                            {/* Right column: editor grande */}
                            <CreateAdvice
                                getAdvices={getAdvices}
                                editData={editData}
                                onCancel={handleCancelEdit}
                            />
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}

export default Advice
