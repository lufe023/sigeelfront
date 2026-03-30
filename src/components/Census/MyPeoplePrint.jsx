import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import getConfig from '../../utils/getConfig'
import Cargando from '../../utils/Cargando'
import PeopleCardPrint from './PeopleCardPrint'
import './MyPeoplePrint.css'

const MyPeoplePrint = () => {
    const [results, setResults] = useState()
    const [currentDate, setCurrentDate] = useState(new Date())
    const [isLoading, setIsloading] = useState(true)
    const user = useSelector((state) => state.userSlice)

    const getMypeople = () => {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/mypeople`
        axios
            .get(URL, getConfig())
            .then((res) => {
                setResults(res.data.rows)
                setIsloading(false)
            })
            .catch((err) => {
                setResults([])
                setIsloading(false)
                console.log(err)
            })
    }

    const formatPhoneNumber = (value) => {
        const digits = String(value || '').replace(/\D/g, '')

        if (digits.length === 10) {
            return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`
        }

        return value || 'N/D'
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date())
        }, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    useEffect(() => {
        getMypeople()
    }, [])

    const leaderName = [user?.censu?.firstName, user?.censu?.lastName]
        .filter(Boolean)
        .join(' ')

    return (
        <div className='impresora'>
            {isLoading ? (
                <div
                    className='loading'
                    style={{ height: '100px', marginBottom: '50px' }}
                >
                    <Cargando escala='1.5' />
                </div>
            ) : null}

            <section className='invoice print-sheet'>
                <div className='print-sheet-header'>
                    <div className='print-sheet-brand'>
                        <img
                            src='img/MIELECTOR-Isotipo-64x75.png'
                            alt='mi elector logo'
                            className='brand-image'
                        />
                        <div>
                            <h2 className='print-sheet-title'>Mi Elector</h2>
                            <p className='print-sheet-subtitle'>
                                Formulario imprimible para captura de datos y
                                preferencias
                            </p>
                        </div>
                    </div>

                    <div className='print-sheet-meta'>
                        <div className='print-sheet-meta-item'>
                            <span>Fecha</span>
                            <strong>{currentDate.toLocaleString()}</strong>
                        </div>
                        <div className='print-sheet-meta-item'>
                            <span>Lider</span>
                            <strong>{leaderName || 'No disponible'}</strong>
                        </div>
                        <div className='print-sheet-meta-item'>
                            <span>Rol</span>
                            <strong>
                                {user?.user_role?.roleName || 'No disponible'}
                            </strong>
                        </div>
                        <div className='print-sheet-meta-item'>
                            <span>Celular</span>
                            <strong>
                                {formatPhoneNumber(user?.censu?.celphone)}
                            </strong>
                        </div>
                        <div className='print-sheet-meta-item'>
                            <span>Usuario</span>
                            <strong>{user?.email || 'No disponible'}</strong>
                        </div>
                        <div className='print-sheet-meta-item'>
                            <span>Formularios</span>
                            <strong>{results?.length || 0}</strong>
                        </div>
                    </div>
                </div>

                <div className='card-footer no-print'>
                    <div className='col-12'>
                        <button
                            className='btn btn-info btn-block btn-flat'
                            onClick={window.print}
                        >
                            Imprimir
                        </button>
                    </div>
                </div>

                {!isLoading && results?.length ? (
                    <div className='print-sheet-note'>
                        Cada ficha deja espacio para capturar manualmente
                        telefono, celular, direccion e intencion de voto del
                        ciudadano.
                    </div>
                ) : null}

                {!isLoading ? (
                    results?.length ? (
                        <div className='print-forms-grid'>
                            {results.map((result) => (
                                <PeopleCardPrint
                                    key={result.id}
                                    people={result}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className='alert alert-warning mb-0'>
                            No hay ciudadanos disponibles para imprimir.
                        </div>
                    )
                ) : null}

                <div className='card-footer no-print'>
                    <div className='col-12'>
                        <button
                            className='btn btn-info btn-block btn-flat'
                            onClick={window.print}
                        >
                            Imprimir
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MyPeoplePrint
