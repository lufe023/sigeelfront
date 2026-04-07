import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import Header from "../../Header";
import Aside from "../../Aside";
import Footer from "../../Footer";
import Cargando from "../../../utils/Cargando";
import getConfig from "../../../utils/getConfig";
import { getLeaderCoverageReport } from "../../../services/reports/metasReportService";
import { Link } from "react-router-dom";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const formatNumber = (value) => Number(value || 0).toLocaleString("es-DO");
const getLeaderName = (leader) =>
    `${leader?.firstName || ""} ${leader?.lastName || ""}`.trim() || "Sin nombre";
const getMunicipalityName = (leader) => leader?.municipality?.description || "N/D";
const getSectorName = (leader) =>
    leader?.sector?.Descripcion ||
    leader?.sector?.description ||
    leader?.sector?.name ||
    "N/D";

const MetasByLeader = () => {
    const [maps, setMaps] = useState([]);
    const [selectedProvinceId, setSelectedProvinceId] = useState("");
    const [selectedMunicipalityId, setSelectedMunicipalityId] = useState("");
    const [selectedDistrictId, setSelectedDistrictId] = useState("");
    const [leaderGoal, setLeaderGoal] = useState(10);
    const [reportData, setReportData] = useState(null);
    const [isLoadingMaps, setIsLoadingMaps] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoadingMaps(true);
        axios
            .get(`${import.meta.env.VITE_API_SERVER}/api/v1/maps`, getConfig())
            .then((res) => {
                setMaps(res.data);
                setIsLoadingMaps(false);
            })
            .catch((err) => {
                console.error(err);
                setIsLoadingMaps(false);
                Swal.fire({
                    icon: "error",
                    title: "No fue posible cargar las ubicaciones",
                    text:
                        err?.response?.data?.message ||
                        err?.response?.statusText ||
                        "Error de red",
                });
            });
    }, []);

    const provincias = useMemo(
        () => maps.filter((map) => map.type === "province"),
        [maps],
    );

    const municipios = useMemo(
        () =>
            maps.filter(
                (map) =>
                    map.type === "municipality" &&
                    String(map.ProvinciaId) === String(selectedProvinceId),
            ),
        [maps, selectedProvinceId],
    );

    const distritos = useMemo(
        () =>
            maps.filter(
                (map) =>
                    map.type === "district" &&
                    String(map.parentMunicipalityId) ===
                        String(selectedMunicipalityId),
            ),
        [maps, selectedMunicipalityId],
    );

    const leaders = useMemo(
        () =>
            (reportData?.leaders || []).map((leader) => ({
                ...leader,
                affiliatedCount: Number(leader?.affiliatedCount) || 0,
                missingToGoal: Math.max(Number(leader?.missingToGoal) || 0, 0),
                leaderGoal: Number(leader?.leaderGoal) || 0,
            })),
        [reportData],
    );

    const chartData = useMemo(
        () => ({
            labels: leaders.map((leader) => getLeaderName(leader)),
            datasets: [
                {
                    label: "Afiliados logrados",
                    data: leaders.map((leader) => leader.affiliatedCount),
                    backgroundColor: "rgba(40, 167, 69, 0.85)",
                    borderColor: "rgba(40, 167, 69, 1)",
                    borderWidth: 1,
                },
                {
                    label: "Faltantes para meta",
                    data: leaders.map((leader) => leader.missingToGoal),
                    backgroundColor: "rgba(255, 193, 7, 0.85)",
                    borderColor: "rgba(255, 193, 7, 1)",
                    borderWidth: 1,
                },
            ],
        }),
        [leaders],
    );

    const chartOptions = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: "y",
            plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Cumplimiento de meta por lider" },
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
                    title: { display: true, text: "Afiliados" },
                    ticks: { callback: (value) => formatNumber(value) },
                },
                y: { stacked: true },
            },
        }),
        [],
    );

    const handleProvinceChange = (event) => {
        setSelectedProvinceId(event.target.value);
        setSelectedMunicipalityId("");
        setSelectedDistrictId("");
        setReportData(null);
    };

    const handleMunicipalityChange = (event) => {
        setSelectedMunicipalityId(event.target.value);
        setSelectedDistrictId("");
        setReportData(null);
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrictId(event.target.value);
        setReportData(null);
    };

    const handleGenerateReport = async () => {
        if (!selectedMunicipalityId) {
            Swal.fire({
                icon: "warning",
                title: "Seleccione un municipio",
                text: "Debe seleccionar un municipio antes de consultar.",
            });
            return;
        }

        setIsLoading(true);

        try {
            const data = await getLeaderCoverageReport({
                municipalityId: selectedMunicipalityId,
                districtId: selectedDistrictId || undefined,
                leaderGoal: Math.max(Number(leaderGoal) || 10, 1),
            });
            setReportData(data);
        } catch (err) {
            console.error(err);
            setReportData(null);
            Swal.fire({
                icon: "error",
                title: "No fue posible consultar el reporte",
                text:
                    err?.response?.data?.message ||
                    "Ocurrio un error consultando la cobertura de lideres.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleExportToExcel = () => {
        if (!leaders.length) {
            Swal.fire({
                icon: "warning",
                title: "No hay datos para exportar",
                text: "Genere un reporte antes de exportar.",
            });
            return;
        }

        const rows = leaders.map((leader) => ({
            LiderId: leader?.leaderId,
            Nombre: getLeaderName(leader),
            Apodo: leader?.nickname || "N/D",
            Email: leader?.email || "N/D",
            Activo: leader?.active ? "Si" : "No",
            Municipio: getMunicipalityName(leader),
            Sector: getSectorName(leader),
            Afiliados: leader.affiliatedCount,
            Meta: leader.leaderGoal,
            Faltantes: leader.missingToGoal,
            Estado: leader?.goalReached ? "Cumplida" : "Pendiente",
        }));

        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        const locationName =
            reportData?.location?.district?.description ||
            reportData?.location?.municipality?.description ||
            "Lideres";

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            locationName.replace(/[\\/*?:[\]]/g, "").slice(0, 31),
        );
        XLSX.writeFile(
            workbook,
            `ReporteLideres_${locationName.replace(/\s+/g, "_")}.xlsx`,
        );
    };

    return (
        <>
            <Header />
            <Aside />
            <div className="content-wrapper" style={{ minHeight: "1258.94px" }}>
                <section className="content">
                    <div className="container-fluid">
                        <h2 className="text-center" style={{ paddingTop: "50px" }}>
                            Reporte de Metas por Lider
                        </h2>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="card card-outline card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Filtros del reporte</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label>Provincia</label>
                                                    <select
                                                        className="form-control"
                                                        value={selectedProvinceId}
                                                        onChange={handleProvinceChange}
                                                        disabled={isLoadingMaps}
                                                    >
                                                        <option value="">
                                                            {isLoadingMaps
                                                                ? "Cargando provincias..."
                                                                : "Seleccione una provincia"}
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

                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Municipio</label>
                                                    <select
                                                        className="form-control"
                                                        value={selectedMunicipalityId}
                                                        onChange={handleMunicipalityChange}
                                                        disabled={!selectedProvinceId}
                                                    >
                                                        <option value="">
                                                            {selectedProvinceId
                                                                ? "Seleccione un municipio"
                                                                : "Primero elija una provincia"}
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

                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label>Distrito municipal</label>
                                                    <select
                                                        className="form-control"
                                                        value={selectedDistrictId}
                                                        onChange={handleDistrictChange}
                                                        disabled={
                                                            !selectedMunicipalityId ||
                                                            distritos.length === 0
                                                        }
                                                    >
                                                        <option value="">
                                                            {selectedMunicipalityId
                                                                ? distritos.length > 0
                                                                    ? "Todos o seleccione un distrito"
                                                                    : "No hay distritos"
                                                                : "Primero elija un municipio"}
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
                                            </div>

                                            <div className="col-md-2">
                                                <div className="form-group">
                                                    <label>Meta por lider</label>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        className="form-control"
                                                        value={leaderGoal}
                                                        onChange={(event) =>
                                                            setLeaderGoal(event.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            className="btn btn-primary btn-block"
                                            onClick={handleGenerateReport}
                                            disabled={isLoading || !selectedMunicipalityId}
                                        >
                                            <i className="fa fa-search mr-1" />
                                            {isLoading ? " Consultando..." : " Ver Resultados"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isLoading ? (
                            <div
                                className="w100 text-center my-4 h-100"
                                style={{ minHeight: 400 }}
                            >
                                <Cargando escala="2" />
                            </div>
                        ) : null}

                        {!isLoading && reportData ? (
                            <>
                                <div className="row mt-4">
                                    <div className="col-md-12">
                                        <div className="card shadow-sm">
                                            <div className="card-header bg-white">
                                                <h3 className="card-title mb-0">
                                                    Resumen del reporte
                                                </h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-4 mb-3">
                                                        <strong>Municipio:</strong>{" "}
                                                        {reportData?.location?.municipality
                                                            ?.description || "N/D"}
                                                    </div>
                                                    <div className="col-md-4 mb-3">
                                                        <strong>Distrito:</strong>{" "}
                                                        {reportData?.location?.district
                                                            ?.description || "Todos"}
                                                    </div>
                                                    <div className="col-md-4 mb-3">
                                                        <strong>Meta por lider:</strong>{" "}
                                                        {formatNumber(
                                                            reportData?.filters?.leaderGoal,
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
                                                        reportData?.summary?.totalLeaders,
                                                    )}
                                                </h3>
                                                <p>Total de lideres</p>
                                            </div>
                                            <div className="icon">
                                                <i className="fas fa-user-tie" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-6">
                                        <div className="small-box bg-success">
                                            <div className="inner">
                                                <h3>
                                                    {formatNumber(
                                                        reportData?.summary
                                                            ?.goalReachedCount,
                                                    )}
                                                </h3>
                                                <p>Lideres que cumplieron</p>
                                            </div>
                                            <div className="icon">
                                                <i className="fas fa-check-circle" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-6">
                                        <div className="small-box bg-warning">
                                            <div className="inner">
                                                <h3>
                                                    {formatNumber(
                                                        reportData?.summary
                                                            ?.goalPendingCount,
                                                    )}
                                                </h3>
                                                <p>Lideres pendientes</p>
                                            </div>
                                            <div className="icon">
                                                <i className="fas fa-hourglass-half" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-6">
                                        <div className="small-box bg-danger">
                                            <div className="inner">
                                                <h3>
                                                    {formatNumber(
                                                        reportData?.summary
                                                            ?.totalAffiliated,
                                                    )}
                                                </h3>
                                                <p>Total afiliados</p>
                                            </div>
                                            <div className="icon">
                                                <i className="fas fa-users" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card card-outline card-primary">
                                            <div className="card-header">
                                                <h3 className="card-title">
                                                    Grafico de avance por lider
                                                </h3>
                                            </div>
                                            <div className="card-body">
                                                <div
                                                    style={{
                                                        height: `${Math.max(
                                                            leaders.length * 60,
                                                            350,
                                                        )}px`,
                                                    }}
                                                >
                                                    <Bar
                                                        data={chartData}
                                                        options={chartOptions}
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
                                                        Detalle por lider
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
                                                            <th>Nombre</th>
                                                            <th>Apodo</th>
                                                            <th>Email</th>
                                                            <th>Activo</th>
                                                            <th>Municipio</th>
                                                            <th>Sector</th>
                                                            <th>Afiliados</th>
                                                            <th>Meta</th>
                                                            <th>Faltantes</th>
                                                            <th>Estado</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {leaders.length > 0 ? (
                                                            leaders.map((leader) => (
                                                                <tr
                                                                    key={leader?.leaderId}
                                                                    className={`
                                                                        ${leader?.goalReached ? "table-success" : "table-warning"} 
                                                                        ${!leader?.active ? "text-danger" : ""}
                                                                    `}
                                                                    >
                                                                    <td>
                                                                         <Link to={`/peoplebyuser/${leader?.leaderId}`} className="text-decoration-none">
                                                                        {getLeaderName(
                                                                            leader,
                                                                        )}
                                                                        </Link>
                                                                    </td>

                                                                    <td>
                                                                        {leader?.nickname ||
                                                                            "N/D"}
                                                                    </td>
                                                                    <td>
                                                                        {leader?.email || "N/D"}
                                                                    </td>
                                                                    <td>
                                                                        {leader?.active
                                                                            ? "Si"
                                                                            : "No"}
                                                                    </td>
                                                                    <td>
                                                                        {getMunicipalityName(
                                                                            leader,
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {getSectorName(leader)}
                                                                    </td>
                                                                    <td>
                                                                        {formatNumber(
                                                                            leader?.affiliatedCount,
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {formatNumber(
                                                                            leader?.leaderGoal,
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {formatNumber(
                                                                            leader?.missingToGoal,
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {leader?.goalReached ? (
                                                                            <span className="badge badge-success">
                                                                                Cumplida
                                                                            </span>
                                                                        ) : (
                                                                            <span className="badge badge-warning">
                                                                                Pendiente
                                                                            </span>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td
                                                                    colSpan="10"
                                                                    className="text-center py-4"
                                                                >
                                                                    No hay lideres
                                                                    para los filtros
                                                                    seleccionados.
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default MetasByLeader;
