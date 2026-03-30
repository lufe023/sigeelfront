import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Aside from "../Aside";
import Footer from "../Footer";
import Header from "../Header";
import Cargando from "../../utils/Cargando";
import getConfig from "../../utils/getConfig";
import "../../Styles/SearchPeopleResults.css";

const EMPTY_FILTERS = {
    gender: "",
    IdEstadoCivil: "",
    minAge: "",
    maxAge: "",
    province: "",
    municipality: "",
    district: "",
    IDSectorParaje: "",
    CollegeId: "",
};

const MARITAL_STATUS_OPTIONS = [
    { value: "S", label: "Soltero/a" },
    { value: "C", label: "Casado/a" },
    { value: "U", label: "Union libre" },
    { value: "D", label: "Divorciado/a" },
    { value: "V", label: "Viudo/a" },
];

const SearchPeopleResults = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [filtersForm, setFiltersForm] = useState(EMPTY_FILTERS);
    const [maps, setMaps] = useState([]);
    const [results, setResults] = useState([]);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const query = searchParams.get("q")?.trim() || "";
    const currentPage = Math.max(
        1,
        parseInt(searchParams.get("page") || "1", 10),
    );
    const pageSize = Math.max(
        1,
        parseInt(searchParams.get("size") || "10", 10),
    );
    const [totalPages, setTotalPages] = useState(1);
    const activeFilters = {
        gender: searchParams.get("gender") || "",
        IdEstadoCivil: searchParams.get("IdEstadoCivil") || "",
        minAge: searchParams.get("minAge") || "",
        maxAge: searchParams.get("maxAge") || "",
        province: searchParams.get("province") || "",
        municipality: searchParams.get("municipality") || "",
        district: searchParams.get("district") || "",
        IDSectorParaje: searchParams.get("IDSectorParaje") || "",
        CollegeId: searchParams.get("CollegeId") || "",
    };

    useEffect(() => {
        setSearchTerm(query);
        setFiltersForm(activeFilters);
    }, [query, searchParams]);

    useEffect(() => {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/maps`;

        axios
            .get(URL, getConfig())
            .then((res) => {
                setMaps(res.data || []);
            })
            .catch((err) => {
                console.error(err);
                setMaps([]);
            });
    }, []);

    useEffect(() => {
        if (query.length < 3) {
            setResults([]);
            setCount(0);
            setTotalPages(1);
            setIsLoading(false);
            return;
        }

        findPeople(query, currentPage, pageSize, activeFilters);
    }, [query, currentPage, pageSize, searchParams]);

    const getNumericValue = (value) => {
        if (value === "" || value === null || value === undefined) {
            return undefined;
        }

        const parsedValue = Number(value);
        return Number.isNaN(parsedValue) ? undefined : parsedValue;
    };

    const sanitizeFilters = (filters) => {
        const sanitized = {};

        if (filters.gender) sanitized.gender = filters.gender;
        if (filters.IdEstadoCivil) {
            sanitized.IdEstadoCivil = filters.IdEstadoCivil;
        }

        const minAge = getNumericValue(filters.minAge);
        const maxAge = getNumericValue(filters.maxAge);
        const province = getNumericValue(filters.province);
        const municipality = getNumericValue(filters.municipality);
        const sector = getNumericValue(filters.IDSectorParaje);
        const college = getNumericValue(filters.CollegeId);

        if (minAge !== undefined) sanitized.minAge = minAge;
        if (maxAge !== undefined) sanitized.maxAge = maxAge;
        if (province !== undefined) sanitized.province = province;
        if (municipality !== undefined) sanitized.municipality = municipality;
        if (sector !== undefined) sanitized.IDSectorParaje = sector;
        if (college !== undefined) sanitized.CollegeId = college;

        return sanitized;
    };

    const buildSearchParamsObject = ({
        nextQuery = query,
        nextPage = currentPage,
        nextSize = pageSize,
        nextFilters = activeFilters,
    } = {}) => {
        const params = {};

        if (nextQuery) params.q = nextQuery;
        if (nextPage) params.page = String(nextPage);
        if (nextSize) params.size = String(nextSize);

        Object.entries(nextFilters).forEach(([key, value]) => {
            if (value !== "" && value !== null && value !== undefined) {
                params[key] = String(value);
            }
        });

        return params;
    };

    const findPeople = (findWord, page, size, filters) => {
        setIsLoading(true);
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/search`;

        axios
            .post(
                URL,
                {
                    findWord,
                    page,
                    size,
                    filters: sanitizeFilters(filters),
                },
                getConfig(),
            )
            .then((res) => {
                const rows = res.data?.data || [];
                setResults(rows);
                setCount(res.data?.totalItems || 0);
                setTotalPages(res.data?.totalPages || 1);
                setSearchTerm(res.data?.busqueda || findWord);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setResults([]);
                setCount(0);
                setTotalPages(1);
                setIsLoading(false);
            });
    };

    const addPeople = (peopleId) => {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/addpeople`;

        axios
            .post(
                URL,
                {
                    peopleId,
                },
                getConfig(),
            )
            .then(() => {
                findPeople(query, currentPage, pageSize, activeFilters);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const normalizedTerm = searchTerm.trim();

        if (normalizedTerm.length < 3) {
            setSearchParams({});
            setResults([]);
            setCount(0);
            setTotalPages(1);
            return;
        }

        setSearchParams(
            buildSearchParamsObject({
                nextQuery: normalizedTerm,
                nextPage: 1,
                nextSize: pageSize,
                nextFilters: filtersForm,
            }),
        );
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;

        setFiltersForm((prevFilters) => ({
            ...prevFilters,
            [name]: value,
            ...(name === "province"
                ? { municipality: "", district: "" }
                : {}),
            ...(name === "municipality" ? { district: "" } : {}),
        }));
    };

    const clearFilters = () => {
        setFiltersForm(EMPTY_FILTERS);

        if (query.length < 3) {
            setSearchParams({});
            setResults([]);
            setCount(0);
            setTotalPages(1);
            return;
        }

        setSearchParams(
            buildSearchParamsObject({
                nextQuery: query,
                nextPage: 1,
                nextSize: pageSize,
                nextFilters: EMPTY_FILTERS,
            }),
        );
    };

    const formatCitizenId = (citizenID) => {
        if (!citizenID || citizenID.length < 11) return citizenID || "";

        return `${citizenID.slice(0, 3)}-${citizenID.slice(3, 10)}-${citizenID.slice(10, 11)}`;
    };

    const provinces = maps.filter(
        (map) => map.type === "province" || map.type === "Provincia",
    );

    const municipalities = maps.filter((map) => {
        const isMunicipality =
            map.type === "municipality" || map.type === "Municipio";

        return (
            isMunicipality &&
            String(map.ProvinciaId || map.parent || "") ===
                String(filtersForm.province || "")
        );
    });

    const districts = maps.filter((map) => {
        const isDistrict =
            map.type === "district" ||
            map.type === "Distrito" ||
            map.type === "Distrito Municipal";

        return (
            isDistrict &&
            String(map.municipioId || map.parent || "") ===
                String(filtersForm.municipality || "")
        );
    });

    const activeFilterCount = Object.entries(activeFilters).filter(
        ([key, value]) => key !== "district" && value !== "",
    ).length;

    const safeCurrentPage = Math.min(currentPage, totalPages || 1);
    const visibleFrom = count ? (safeCurrentPage - 1) * pageSize + 1 : 0;
    const visibleTo = Math.min(safeCurrentPage * pageSize, count);

    const pageNumbers = [];
    const maxPagesToShow = 7;
    let startPage = Math.max(
        1,
        safeCurrentPage - Math.floor(maxPagesToShow / 2),
    );
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let page = startPage; page <= endPage; page += 1) {
        pageNumbers.push(page);
    }

    return (
        <div>
            <Header />
            <Aside />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Resultados de busqueda</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        Busqueda
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="card card-primary card-outline">
                        <div className="card-header">
                            <h3 className="card-title">
                                Buscar personas en el padron
                            </h3>
                        </div>
                        <div className="card-body">
                            <form
                                className="search-results-form"
                                onSubmit={handleSubmit}
                            >
                                <div className="search-results-toolbar">
                                    <div className="input-group search-results-input">
                                        <input
                                            className="form-control"
                                            type="search"
                                            placeholder="Nombre, apellido, apodo, cedula o telefono"
                                            value={searchTerm}
                                            onChange={(event) =>
                                                setSearchTerm(
                                                    event.target.value,
                                                )
                                            }
                                        />
                                        <div className="input-group-append">
                                            <button
                                                className="btn btn-primary"
                                                type="submit"
                                            >
                                                <i className="fas fa-search" />{" "}
                                                Buscar
                                            </button>
                                        </div>
                                    </div>

                                    <div className="search-results-limit">
                                        <label
                                            className="mb-0 mr-2"
                                            htmlFor="search-page-size"
                                        >
                                            Por pagina
                                        </label>
                                        <select
                                            id="search-page-size"
                                            className="form-control"
                                            value={pageSize}
                                            onChange={(event) => {
                                                setSearchParams(
                                                    buildSearchParamsObject({
                                                        nextPage: 1,
                                                        nextSize:
                                                            event.target.value,
                                                    }),
                                                );
                                            }}
                                        >
                                            <option value={10}>10</option>
                                            <option value={20}>20</option>
                                            <option value={50}>50</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="search-results-filters">
                                    <div className="search-filters-header">
                                        <h5 className="mb-0">
                                            Filtros avanzados
                                        </h5>
                                        <span className="badge badge-info">
                                            {activeFilterCount} activos
                                        </span>
                                    </div>

                                    <div className="search-filters-grid">
                                        <div className="form-group mb-0">
                                            <label htmlFor="filter-gender">
                                                Sexo
                                            </label>
                                            <select
                                                id="filter-gender"
                                                name="gender"
                                                className="form-control"
                                                value={filtersForm.gender}
                                                onChange={handleFilterChange}
                                            >
                                                <option value="">Todos</option>
                                                <option value="M">
                                                    Masculino
                                                </option>
                                                <option value="F">
                                                    Femenino
                                                </option>
                                            </select>
                                        </div>

                                        <div className="form-group mb-0">
                                            <label htmlFor="filter-marital">
                                                Estado civil
                                            </label>
                                            <select
                                                id="filter-marital"
                                                name="IdEstadoCivil"
                                                className="form-control"
                                                value={
                                                    filtersForm.IdEstadoCivil
                                                }
                                                onChange={handleFilterChange}
                                            >
                                                <option value="">Todos</option>
                                                {MARITAL_STATUS_OPTIONS.map(
                                                    (option) => (
                                                        <option
                                                            key={option.value}
                                                            value={
                                                                option.value
                                                            }
                                                        >
                                                            {option.label}
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                        </div>

                                        <div className="form-group mb-0">
                                            <label htmlFor="filter-min-age">
                                                Edad minima
                                            </label>
                                            <input
                                                id="filter-min-age"
                                                name="minAge"
                                                type="number"
                                                min="0"
                                                className="form-control"
                                                value={filtersForm.minAge}
                                                onChange={handleFilterChange}
                                            />
                                        </div>

                                        <div className="form-group mb-0">
                                            <label htmlFor="filter-max-age">
                                                Edad maxima
                                            </label>
                                            <input
                                                id="filter-max-age"
                                                name="maxAge"
                                                type="number"
                                                min="0"
                                                className="form-control"
                                                value={filtersForm.maxAge}
                                                onChange={handleFilterChange}
                                            />
                                        </div>

                                        <div className="form-group mb-0">
                                            <label htmlFor="filter-province">
                                                Provincia
                                            </label>
                                            <select
                                                id="filter-province"
                                                name="province"
                                                className="form-control"
                                                value={filtersForm.province}
                                                onChange={handleFilterChange}
                                            >
                                                <option value="">Todas</option>
                                                {provinces.map((province) => (
                                                    <option
                                                        key={
                                                            province.ProvinciaId
                                                        }
                                                        value={
                                                            province.ProvinciaId
                                                        }
                                                    >
                                                        {
                                                            province.Descripcion
                                                        }
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group mb-0">
                                            <label htmlFor="filter-municipality">
                                                Municipio
                                            </label>
                                            <select
                                                id="filter-municipality"
                                                name="municipality"
                                                className="form-control"
                                                value={
                                                    filtersForm.municipality
                                                }
                                                onChange={handleFilterChange}
                                                disabled={
                                                    !filtersForm.province
                                                }
                                            >
                                                <option value="">Todos</option>
                                                {municipalities.map(
                                                    (municipality) => (
                                                        <option
                                                            key={
                                                                municipality.MunicipalityId
                                                            }
                                                            value={
                                                                municipality.MunicipalityId
                                                            }
                                                        >
                                                            {
                                                                municipality.description
                                                            }
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                        </div>

                                        <div className="form-group mb-0">
                                            <label htmlFor="filter-district">
                                                Distrito municipal
                                            </label>
                                            <select
                                                id="filter-district"
                                                name="district"
                                                className="form-control"
                                                value={filtersForm.district}
                                                onChange={handleFilterChange}
                                                disabled={
                                                    !filtersForm.municipality
                                                }
                                            >
                                                <option value="">
                                                    Todos
                                                </option>
                                                {districts.map((district) => (
                                                    <option
                                                        key={
                                                            district.id ||
                                                            district.iddistritomunicipal ||
                                                            district.codigociudad
                                                        }
                                                        value={
                                                            district.id ||
                                                            district.iddistritomunicipal ||
                                                            district.codigociudad
                                                        }
                                                    >
                                                        {district.description ||
                                                            district.descripcion ||
                                                            district.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <small className="text-muted">
                                                Disponible en la interfaz. Falta
                                                el filtro equivalente en el
                                                backend para aplicarlo a la
                                                consulta.
                                            </small>
                                        </div>

                                        <div className="form-group mb-0">
                                            <label htmlFor="filter-sector">
                                                Sector ID
                                            </label>
                                            <input
                                                id="filter-sector"
                                                name="IDSectorParaje"
                                                type="number"
                                                min="1"
                                                className="form-control"
                                                value={
                                                    filtersForm.IDSectorParaje
                                                }
                                                onChange={handleFilterChange}
                                                placeholder="Ej: 245"
                                            />
                                        </div>

                                        <div className="form-group mb-0">
                                            <label htmlFor="filter-college">
                                                Colegio ID
                                            </label>
                                            <input
                                                id="filter-college"
                                                name="CollegeId"
                                                type="number"
                                                min="1"
                                                className="form-control"
                                                value={filtersForm.CollegeId}
                                                onChange={handleFilterChange}
                                                placeholder="Ej: 1024"
                                            />
                                        </div>
                                    </div>

                                    <div className="search-filters-actions">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Aplicar busqueda
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-default"
                                            onClick={clearFilters}
                                        >
                                            Limpiar filtros
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {query.length < 3 ? (
                                <div className="alert alert-info mb-0 mt-3">
                                    Escribe al menos 3 caracteres para buscar.
                                </div>
                            ) : null}

                            {isLoading ? (
                                <div className="loading search-results-loading">
                                    <Cargando escala="1" />
                                </div>
                            ) : null}

                            {!isLoading && query.length >= 3 ? (
                                <>
                                    <div className="search-results-summary">
                                        <div>
                                            <strong>{count}</strong>{" "}
                                            {count === 1
                                                ? "coincidencia"
                                                : "coincidencias"}
                                            {" "}para{" "}
                                            <strong>{query}</strong>
                                        </div>
                                        <div>
                                            Mostrando {visibleFrom} a{" "}
                                            {visibleTo} de {count}
                                        </div>
                                    </div>

                                    {results.length ? (
                                        <div className="search-results-grid">
                                            {results.map((people) => (
                                                <article
                                                    key={people.id}
                                                    className="card search-result-card"
                                                >
                                                    <div className="card-body">
                                                        <div className="search-result-main">
                                                            <img
                                                                className="search-result-photo"
                                                                src={
                                                                    people?.picture
                                                                }
                                                                alt={
                                                                    people?.firstName
                                                                }
                                                            />
                                                            

                                                            <div className="search-result-info">
                                                                <h4 className="search-result-name">
                                                                    {
                                                                        people?.firstName
                                                                    }{" "}
                                                                    {
                                                                        people?.lastName
                                                                    }{" "}
                                                                    {
                                                                        people?.lastNameB
                                                                    }{" "}
                                                                    {people?.nickname ? (
                                                                        <small>
                                                                            (
                                                                            {
                                                                                people?.nickname
                                                                            }
                                                                            )
                                                                        </small>
                                                                    ) : null}
                                                                </h4>

                                                                <p className="mb-1">
                                                                    <strong>
                                                                        Cedula:
                                                                    </strong>{" "}
                                                                    {formatCitizenId(
                                                                        people?.citizenID,
                                                                    )}
                                                                </p>
                                                                <p className="mb-1">
                                                                    <strong>
                                                                        Sector:
                                                                    </strong>{" "}
                                                                    {
                                                                        people
                                                                            ?.sector
                                                                            ?.Descripcion
                                                                    }
                                                                </p>
                                                                <p className="mb-1">
                                                                    <strong>
                                                                        Distrito:
                                                                    </strong>{" "}
                                                                    {
                                                                        people
                                                                            ?.district
                                                                            ?.descripcion
                                                                    }
                                                                </p>
                                                                <p className="mb-1">
                                                                    <strong>
                                                                        Municipio:
                                                                    </strong>{" "}
                                                                    {
                                                                        people
                                                                            ?.municipalities
                                                                            ?.description
                                                                    }
                                                                </p>
                                                                <p className="mb-1">
                                                                    <strong>
                                                                        Provincia:
                                                                    </strong>{" "}
                                                                    {
                                                                        people
                                                                            ?.provinces
                                                                            ?.Descripcion
                                                                    }
                                                                </p>
                                                                <p className="mb-1">
                                                                    <strong>
                                                                        Colegio:
                                                                    </strong>{" "}
                                                                    {people?.colegio?.collegeNumber
                                                                        ?.toString()
                                                                        ?.padStart(
                                                                            4,
                                                                            "0",
                                                                        ) || ""}
                                                                </p>
                                                                <p className="mb-1">
                                                                    <strong>
                                                                        Recinto:
                                                                    </strong>{" "}
                                                                    {
                                                                        people
                                                                            ?.colegio
                                                                            ?.precinctData
                                                                            ?.descripcion
                                                                    }{" "}
                                                                    {people?.colegio?.precinctData?.precintNumber
                                                                        ?.toString()
                                                                        ?.padStart(
                                                                            4,
                                                                            "0",
                                                                        ) || ""}

                                                                        
                                                                </p>
                                                                <p className="mb-1">
                                                                    <strong>
                                                                        Lider:
                                                                    </strong>{" "}
                                                                    {people?.leader ? (
                                                                        <Link
                                                                                                                        to={`/mypeople/${people?.leaders?.censu?.id}`}
                                                                                                                    >
                                                                                                                        {
                                                                                                                            people?.leaders
                                                                                                                                ?.censu
                                                                                                                                ?.firstName
                                                                                                                        }
                                                                                                                    </Link>
                                                                                                                ) : (
                                                                                                                    ""
                                                                                                                )}
                                                                                                                </p>
                                                                <div className="search-result-badges">

                                                                    
                                                                    <span
                                                                        className={`badge ${people?.sufragio?.suffrage ? "bg-success" : "bg-danger"}`}
                                                                    >
                                                                        {people
                                                                            ?.sufragio
                                                                            ?.suffrage
                                                                            ? "Voto"
                                                                            : "No Voto"}
                                                                    </span>
                                                                    <span className="badge bg-dark">
                                                                        Posicion:{" "}
                                                                        {
                                                                            people?.position
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="card-footer search-result-actions">
                                                        <Link
                                                            to={`/mypeople/${people?.id}`}
                                                            className="btn btn-outline-primary btn-sm"
                                                        >
                                                            <i className="far fa-eye"></i>
                                                        </Link>

                                                        {people?.leader ? (
                                                            <Link
                                                                to={`/mypeople/${people?.leaders?.censu?.id}`}
                                                                className="btn btn-outline-info btn-sm"
                                                            >
                                                                <i className="fas fa-user-check"></i>
                                                            </Link>
                                                        ) : (
                                                            <button
                                                                className="btn btn-outline-success btn-sm"
                                                                onClick={() =>
                                                                    addPeople(
                                                                        people?.id,
                                                                    )
                                                                }
                                                            >
                                                                <i className="fas fa-user-plus"></i>
                                                            </button>
                                                        )}

                                                        <Link
                                                            to={`/mypeople/${people?.id}`}
                                                            className="btn btn-outline-warning btn-sm"
                                                        >
                                                            <i className="fas fa-user-edit"></i>
                                                        </Link>
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="alert alert-warning mb-0">
                                            No se encontraron resultados para{" "}
                                            <strong>{query}</strong>.
                                        </div>
                                    )}

                                    {results.length ? (
                                        <div className="search-results-pagination">
                                            <ul className="pagination mb-0">
                                                <li
                                                    className={`page-item ${safeCurrentPage === 1 ? "disabled" : ""}`}
                                                >
                                                    <button
                                                        className="page-link"
                                                        type="button"
                                                        disabled={
                                                            safeCurrentPage ===
                                                            1
                                                        }
                                                        onClick={() =>
                                                            setSearchParams(
                                                                buildSearchParamsObject(
                                                                    {
                                                                        nextPage:
                                                                            safeCurrentPage -
                                                                            1,
                                                                    },
                                                                ),
                                                            )
                                                        }
                                                    >
                                                        Anterior
                                                    </button>
                                                </li>

                                                {pageNumbers.map((page) => (
                                                    <li
                                                        key={page}
                                                        className={`page-item ${page === safeCurrentPage ? "active" : ""}`}
                                                    >
                                                        <button
                                                            className="page-link"
                                                            type="button"
                                                            onClick={() =>
                                                                setSearchParams(
                                                                    buildSearchParamsObject(
                                                                        {
                                                                            nextPage:
                                                                                page,
                                                                        },
                                                                    ),
                                                                )
                                                            }
                                                        >
                                                            {page}
                                                        </button>
                                                    </li>
                                                ))}

                                                <li
                                                    className={`page-item ${safeCurrentPage === totalPages ? "disabled" : ""}`}
                                                >
                                                    <button
                                                        className="page-link"
                                                        type="button"
                                                        disabled={
                                                            safeCurrentPage ===
                                                            totalPages
                                                        }
                                                        onClick={() =>
                                                            setSearchParams(
                                                                buildSearchParamsObject(
                                                                    {
                                                                        nextPage:
                                                                            safeCurrentPage +
                                                                            1,
                                                                    },
                                                                ),
                                                            )
                                                        }
                                                    >
                                                        Siguiente
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    ) : null}
                                </>
                            ) : null}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default SearchPeopleResults;
