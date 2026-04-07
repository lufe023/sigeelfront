import React, { useEffect, useMemo, useState } from "react";
import Header from "../../Header";
import Aside from "../../Aside";
import Footer from "../../Footer";
import axios from "axios";
import getConfig from "../../../utils/getConfig";
import Cargando from "../../../utils/Cargando";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import * as XLSX from "xlsx";
import { getPrecinctCoverageReport } from "../../../services/reports/metasReportService";
import "../../Precints/CitizenByCollege.css";

import Swal from "sweetalert2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const formatNumber = (value) => Number(value || 0).toLocaleString("es-DO");

const formatPercent = (value) =>
    value === null || value === undefined ? "N/D" : `${Number(value).toFixed(2)}%`;

const formatCode = (value, size = 4) =>
    value === null || value === undefined ? "N/D" : String(value).padStart(size, "0");

const Metas = () => {
    const [precints, setPrecints] = useState();
    const [selectedPrecint, setSelectedPrecint] = useState(null);
    const [isLoading, setIsloading] = useState(false);
    const [reportData, setReportData] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const getAllPrecints = () => {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/jce/precints`;
        axios
            .get(URL, getConfig())
            .then((res) => {
                // Organize data by IDSectorParaje
                const organizedData = res.data.rows.sort(
                    (a, b) => a.IDSectorParaje - b.IDSectorParaje,
                );
                setPrecints(organizedData);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getAllPrecints();
    }, []);

    const collegesWithProgress = useMemo(
        () =>
            (reportData?.colleges || []).map((college) => {
                const electLocal = Number(college?.electLocal) || 0;
                const localReached = Number(college?.padroncillo?.local) || 0;
                const pendingLocal = Math.max(electLocal - localReached, 0);

                return {
                    ...college,
                    pendingLocal,
                };
            }),
        [reportData],
    );

    const localCoverageChartData = useMemo(
        () => ({
            labels: collegesWithProgress.map(
                (college) =>
                    `Colegio ${formatCode(
                        college?.collegeNumber || college?.CollegeId,
                        4,
                    )}`,
            ),
            datasets: [
                {
                    label: "Logrado",
                    data: collegesWithProgress.map(
                        (college) => Number(college?.padroncillo?.local) || 0,
                    ),
                    backgroundColor: "rgba(40, 167, 69, 0.85)",
                    borderColor: "rgba(40, 167, 69, 1)",
                    borderWidth: 1,
                },
                {
                    label: "Faltante",
                    data: collegesWithProgress.map(
                        (college) => Number(college?.pendingLocal) || 0,
                    ),
                    backgroundColor: "rgba(220, 53, 69, 0.78)",
                    borderColor: "rgba(220, 53, 69, 1)",
                    borderWidth: 1,
                },
            ],
        }),
        [collegesWithProgress],
    );

    const localCoverageChartOptions = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: "y",
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "Cobertura local por colegio",
                },
                tooltip: {
                    callbacks: {
                        label: (context) =>
                            `${context.dataset.label}: ${formatNumber(context.raw)}`,
                    },
                },
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        callback: (value) => formatNumber(value),
                    },
                    title: {
                        display: true,
                        text: "Electores",
                    },
                },
                y: {
                    stacked: true,
                },
            },
        }),
        [],
    );

    const handleGetPrecinctCoverage = async () => {
        if (!selectedPrecint) {
            Swal.fire({
                icon: "warning",
                title: "Seleccione un recinto",
                text: "Debe seleccionar un recinto antes de consultar el reporte.",
            });
            return;
        }

        setIsloading(true);

        try {
            const data = await getPrecinctCoverageReport(selectedPrecint);
            setReportData(data);
        } catch (err) {
            console.error(err);
            setReportData(null);
            Swal.fire({
                icon: "error",
                title: "No fue posible consultar el reporte",
                text:
                    err?.response?.data?.message ||
                    "Ocurrio un error consultando la cobertura del recinto.",
            });
        } finally {
            setIsloading(false);
        }
    };

    const handleExportToExcel = () => {
        if (!collegesWithProgress.length) {
            Swal.fire({
                icon: "warning",
                title: "No hay datos para exportar",
                text: "Consulte un recinto con colegios antes de exportar.",
            });
            return;
        }

        const excelRows = collegesWithProgress.map((college) => ({
            Colegio: formatCode(college?.collegeNumber, 4),
            Descripcion: college?.description || "N/D",
            ElectoresLocal: Number(college?.electLocal) || 0,
            ElectoresExterior: Number(college?.electExterior) || 0,
            LogradoLocal: Number(college?.padroncillo?.local) || 0,
            LogradoExterior: Number(college?.padroncillo?.exterior) || 0,
            TotalPadroncillo: Number(college?.padroncillo?.total) || 0,
            FaltanteLocal: Number(college?.pendingLocal) || 0,
            CoberturaLocalPercent: college?.coverage?.localCoveragePercent ?? null,
            CoberturaExteriorPercent:
                college?.coverage?.exteriorCoveragePercent ?? null,
            MetaConfigurada: college?.coverage?.metaConfigured ? "Si" : "No",
            MetaTarget: college?.coverage?.metaConfigured
                ? Number(college?.coverage?.metaTarget) || 0
                : null,
            PendienteMeta: college?.coverage?.metaConfigured
                ? Number(college?.coverage?.pendingToMeta) || 0
                : null,
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelRows);
        const workbook = XLSX.utils.book_new();
        const sheetName = `Recinto ${formatCode(
            reportData?.precinct?.precintNumber,
            4,
        )}`
            .replace(/[\\/*?:[\]]/g, "")
            .slice(0, 31);

        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        XLSX.writeFile(
            workbook,
            `ReporteMetas_${formatCode(
                reportData?.precinct?.precintNumber,
                4,
            )}.xlsx`,
        );
    };



    return (
        <>
            <Header />
            <Aside />
            <div className="content-wrapper" style={{ minHeight: "1258.94px" }}>
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        <h2
                            className="text-center"
                            style={{ paddingTop: "50px" }}
                        >
                            Reporte de Metas por Recinto
                        </h2>

                        <div className="row">
                            <div className="col-md-12">
                                <form>
                                    <div className="row">
                                        {/* COLUMNA DE RECINTOS */}
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="font-weight-bold text-primary">
                                                    <i className="fa fa-building mr-1"></i>{" "}
                                                    Seleccione un Recinto
                                                </label>

                                                {/* BUSCADOR INTEGRADO */}
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm mb-2"
                                                    placeholder="Filtrar recinto..."
                                                    value={searchTerm}
                                                    onChange={(e) =>
                                                        setSearchTerm(
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <div
                                                    className="scroll-container"
                                                    style={{
                                                        backgroundColor:
                                                            "#f8f9fa",
                                                        padding: "10px",
                                                        borderRadius: "8px",
                                                        border: "1px solid #dee2e6",
                                                        overflowY: "auto",
                                                        height: "300px",
                                                    }}
                                                >
                                                    {precints
                                                        ?.filter((r) =>
                                                            r.descripcion
                                                                .toLowerCase()
                                                                .includes(
                                                                    searchTerm.toLowerCase(),
                                                                ),
                                                        )
                                                        .map((recinto) => (
                                                            <div
                                                                key={
                                                                    recinto?.PrecinctId
                                                                }
                                                                className="custom-control custom-radio border-bottom py-2"
                                                                style={{
                                                                    cursor: "pointer",
                                                                }}
                                                            >
                                                              
                                                                <input
                                                                    type="radio"
                                                                    className="custom-control-input"
                                                                    id={`precinct-${recinto?.PrecinctId}`}
                                                                    name="precinct"
                                                                    value={recinto?.PrecinctId}
                                                                    checked={
                                                                        selectedPrecint ===
                                                                        recinto?.PrecinctId
                                                                    }
                                                                    onChange={() =>
                                                                        setSelectedPrecint(
                                                                            recinto?.PrecinctId,
                                                                        )
                                                                    }
                                                                />
                                                                <label
                                                                    htmlFor={`precinct-${recinto?.PrecinctId}`}
                                                                    className="custom-control-label d-flex flex-column w-100"
                                                                    style={{
                                                                        cursor: "pointer",
                                                                    }}
                                                                >
                                                                    <div className="d-flex align-items-center mb-1">
                                                                        <span className="badge badge-primary mr-2">
                                                                            {recinto?.precintNumber
                                                                                ? formatCode(
                                                                                      recinto?.precintNumber,
                                                                                      4,
                                                                                  )
                                                                                : "N/D"}
                                                                        </span>
                                                                        <span
                                                                            className="font-weight-bold text-dark text-uppercase"
                                                                            style={{
                                                                                fontSize:
                                                                                    "0.85rem",
                                                                            }}
                                                                        >
                                                                            {
                                                                                recinto?.descripcion
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="text-muted small">
                                                                        {
                                                                            recinto
                                                                                ?.PrecinctsSectorParaje
                                                                                ?.ciudadSeccion
                                                                                ?.municipio
                                                                                ?.description
                                                                        }
                                                                        {" | "}
                                                                        {
                                                                            recinto
                                                                                ?.PrecinctsSectorParaje
                                                                                ?.Descripcion
                                                                        }
                                                                        {" | "}
                                                                        {
                                                                            recinto?.direccionRecinto
                                                                        }
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                              
                                    {/* BOTÓN DE ACCIÓN */}
                                    <div className="row">
                                        <div className="col-md-12">
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-block shadow-sm"
                                                onClick={
                                                    handleGetPrecinctCoverage
                                                }
                                                disabled={
                                                    isLoading ||
                                                    !selectedPrecint
                                                }
                                            >
                                                <i className="fa fa-search mr-1" />{" "}
                                                {isLoading
                                                    ? "Consultando..."
                                                    : "Ver Resultados"}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                      
                        {isLoading ? (
                            <div
                                className="w100 text-center my-4 h-100"
                                style={{ minHeight: 400 }}
                            >
                                <Cargando escala="2" />
                            </div>
                        ) : (
                            ""
                        )}

                        {!isLoading && reportData ? (
                          <>
                            <div className="row mt-4">
                                <div className="col-md-12">
                                    <div className="card shadow-sm">
                                        <div className="card-header bg-white">
                                            <h3 className="card-title mb-0">
                                                Reporte del Recinto
                                            </h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <strong>Recinto:</strong>{" "}
                                                    {reportData?.precinct?.descripcion}
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <strong>Codigo:</strong>{" "}
                                                    {formatCode(
                                                        reportData?.precinct?.precintNumber,
                                                        5,
                                                    )}
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <strong>Colegios:</strong>{" "}
                                                    {formatNumber(
                                                        reportData?.summary?.collegeCount,
                                                    )}
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <strong>Direccion:</strong>{" "}
                                                    {reportData?.precinct?.direccionRecinto ||
                                                        "N/D"}
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <strong>Electores locales:</strong>{" "}
                                                    {formatNumber(
                                                        reportData?.summary?.electLocal,
                                                    )}
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <strong>Electores exterior:</strong>{" "}
                                                    {formatNumber(
                                                        reportData?.summary?.electExterior,
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-3 col-6">
                                    <div className="small-box bg-info">
                                        <div className="inner">
                                            <h3>
                                                {formatNumber(
                                                    reportData?.summary?.padroncilloLocal,
                                                )}
                                            </h3>
                                            <p>Padroncillo local</p>
                                        </div>
                                        <div className="icon">
                                            <i className="fas fa-users" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-6">
                                    <div className="small-box bg-success">
                                        <div className="inner">
                                            <h3>
                                                {formatPercent(
                                                    reportData?.summary?.localCoveragePercent,
                                                )}
                                            </h3>
                                            <p>Cobertura local</p>
                                        </div>
                                        <div className="icon">
                                            <i className="fas fa-chart-line" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-6">
                                    <div className="small-box bg-warning">
                                        <div className="inner">
                                            <h3>
                                                {formatNumber(
                                                    reportData?.summary?.padroncilloExterior,
                                                )}
                                            </h3>
                                            <p>Padroncillo exterior</p>
                                        </div>
                                        <div className="icon">
                                            <i className="fas fa-plane" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-6">
                                    <div className="small-box bg-danger">
                                        <div className="inner">
                                            <h3>
                                                {formatNumber(
                                                    Math.max(
                                                        (Number(
                                                            reportData?.summary?.electLocal,
                                                        ) || 0) -
                                                            (Number(
                                                                reportData?.summary
                                                                    ?.padroncilloLocal,
                                                            ) || 0),
                                                        0,
                                                    ),
                                                )}
                                            </h3>
                                            <p>Faltante local</p>
                                        </div>
                                        <div className="icon">
                                            <i className="fas fa-hourglass-half" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-outline card-primary">
                                        <div className="card-header">
                                            <h3 className="card-title">
                                                Grafico de avance por colegio
                                            </h3>
                                        </div>
                                        <div className="card-body">
                                            <div
                                                style={{
                                                    height: `${Math.max(
                                                        collegesWithProgress.length * 70,
                                                        350,
                                                    )}px`,
                                                }}
                                            >
                                                <Bar
                                                    data={localCoverageChartData}
                                                    options={localCoverageChartOptions}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-outline card-secondary">
                                        <div className="card-header">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h3 className="card-title">
                                                    Detalle por colegio
                                                </h3>
                                                <button
                                                    type="button"
                                                    className="btn btn-success btn-sm"
                                                    onClick={handleExportToExcel}
                                                >
                                                    <i className="fas fa-file-excel mr-1" />
                                                    Exportar a Excel
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-body table-responsive p-0">
                                            <table className="table table-striped table-hover text-nowrap mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>Colegio</th>
                                                        <th>Descripcion</th>
                                                        <th>Elect. local</th>
                                                        <th>Elect. ext.</th>
                                                        <th>Logrado local</th>
                                                        <th>Logrado ext.</th>
                                                        <th>Total</th>
                                                        <th>Faltante local</th>
                                                        <th>% local</th>
                                                        <th>% exterior</th>
                                                        <th>Meta</th>
                                                        <th>Meta target</th>
                                                        <th>Pendiente meta</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {collegesWithProgress.length > 0 ? (
                                                        collegesWithProgress.map((college) => (
                                                            <tr
                                                                key={
                                                                    college?.CollegeId
                                                                }
                                                            >
                                                                <td>
                                                                    {formatCode(
                                                                        college?.collegeNumber ||
                                                                            college?.CollegeId,
                                                                        4,
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {college?.description ||
                                                                        "N/D"}
                                                                </td>
                                                                <td>
                                                                    {formatNumber(
                                                                        college?.electLocal,
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {formatNumber(
                                                                        college?.electExterior,
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {formatNumber(
                                                                        college?.padroncillo
                                                                            ?.local,
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {formatNumber(
                                                                        college?.padroncillo
                                                                            ?.exterior,
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {formatNumber(
                                                                        college?.padroncillo
                                                                            ?.total,
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {formatNumber(
                                                                        college?.pendingLocal,
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {formatPercent(
                                                                        college?.coverage
                                                                            ?.localCoveragePercent,
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {formatPercent(
                                                                        college?.coverage
                                                                            ?.exteriorCoveragePercent,
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {college?.coverage
                                                                        ?.metaConfigured
                                                                        ? "Si"
                                                                        : "No"}
                                                                </td>
                                                                <td>
                                                                    {college?.coverage
                                                                        ?.metaConfigured
                                                                        ? formatNumber(
                                                                              college?.coverage
                                                                                  ?.metaTarget,
                                                                          )
                                                                        : "N/D"}
                                                                </td>
                                                                <td>
                                                                    {college?.coverage
                                                                        ?.metaConfigured
                                                                        ? formatNumber(
                                                                              college?.coverage
                                                                                  ?.pendingToMeta,
                                                                          )
                                                                        : "N/D"}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="13" className="text-center py-4">
                                                                No hay colegios para este
                                                                recinto.
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                       </> ) : null}


                       
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
};

export default Metas;
