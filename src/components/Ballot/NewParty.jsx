import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cargando from "../../utils/Cargando";
import getConfig from "../../utils/getConfig";
import "./NewParty.css";

const PARTY_COLOR_PRESETS = [
    { name: "Azul institucional", value: "#0F4C81" },
    { name: "Rojo civico", value: "#C0392B" },
    { name: "Verde nacional", value: "#1E8449" },
    { name: "Naranja popular", value: "#E67E22" },
    { name: "Dorado", value: "#D4AC0D" },
    { name: "Morado sobrio", value: "#6C3483" },
    { name: "Turquesa", value: "#148F77" },
    { name: "Gris formal", value: "#566573" },
];

const NewParty = ({ getAllParties }) => {
    const [formLoading, setFormLoading] = useState(false);
    const [partyName, setPartyName] = useState("");
    const [partyAcronyms, setPartyAcronyms] = useState("");
    const [partyColor, setPartyColor] = useState("#0F4C81");
    const [hexInput, setHexInput] = useState("#0F4C81");

    const isValidHexColor = (value) => /^#[0-9A-F]{6}$/i.test(value);

    const normalizeHexColor = (value) => {
        const trimmedValue = value.trim().replace(/^#?/, "#").toUpperCase();

        return trimmedValue;
    };

    const handleColorPickerChange = (value) => {
        const normalizedValue = normalizeHexColor(value);

        setPartyColor(normalizedValue);
        setHexInput(normalizedValue);
    };

    const handleHexInputChange = (value) => {
        const cleanedValue = value
            .toUpperCase()
            .replace(/[^#0-9A-F]/g, "")
            .replace(/^([^#])/, "#$1");
        const trimmedValue = cleanedValue.startsWith("#")
            ? `#${cleanedValue.slice(1, 7)}`
            : cleanedValue.slice(0, 7);

        setHexInput(trimmedValue);

        if (isValidHexColor(trimmedValue)) {
            setPartyColor(trimmedValue);
        }
    };

    const handleHexInputBlur = () => {
        if (!isValidHexColor(hexInput)) {
            setHexInput(partyColor);
        }
    };

    const hasInvalidHexInput =
        hexInput.length > 0 && !isValidHexColor(hexInput);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormLoading(true);

        const data = {
            partyName,
            partyAcronyms,
            color: partyColor,
        };

        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/ballots/party`;

        axios
            .post(URL, data, getConfig())
            .then(() => {
                setFormLoading(false);
                getAllParties();
                setPartyName("");
                setPartyAcronyms("");
                setPartyColor("#0F4C81");
                setHexInput("#0F4C81");

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
                    title: "Partido agregado con exito",
                });
            })
            .catch((err) => {
                console.log(err);
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
                    title: `Accion no permitida: ${
                        err.response?.data?.message || "Error desconocido"
                    }`,
                });
            });
    };

    if (formLoading) {
        return (
            <div className="new-party-loading">
                <Cargando scala="3" />
            </div>
        );
    }

    return (
        <div className="new-party-shell">
            <div className="new-party-card">
                <div className="new-party-hero">
                    <div>
                        <span className="new-party-eyebrow">
                            Identidad politica
                        </span>
                        <h3 className="new-party-title">Crear nuevo partido</h3>
                        <p className="new-party-subtitle" style={{wordWrap: 'break-word'}}>
                            Define nombre, siglas y color principal para que la
                            boleta se vea mas clara y consistente.
                        </p>
                    </div>

                    <div className="new-party-chip">
                        <span
                            className="new-party-chip-color"
                            style={{ backgroundColor: partyColor }}
                        ></span>
                        <div>
                            <strong>
                                {partyAcronyms || "SIGLAS"}
                            </strong>
                            <p>{partyName || "Nombre del partido"}</p>
                        </div>
                    </div>
                </div>

                <form className="new-party-form" onSubmit={handleSubmit}>
                    <div className="new-party-grid">
                        <section className="new-party-panel">
                            <div className="new-party-panel-header">
                                <span className="new-party-panel-icon">
                                    <i className="fas fa-landmark"></i>
                                </span>
                                <div>
                                    <h4>Datos base</h4>
                                    <p>
                                        Completa la identidad visual del partido
                                        antes de usarlo en candidatos.
                                    </p>
                                </div>
                            </div>

                            <div className="new-party-field">
                                <label htmlFor="partyName">
                                    Nombre del partido
                                </label>
                                <div className="new-party-control">
                                    <span className="new-party-control-icon">
                                        <i className="fas fa-signature"></i>
                                    </span>
                                    <input
                                        id="partyName"
                                        name="partyName"
                                        type="text"
                                        className="form-control new-party-input"
                                        placeholder="Ej. Frente Popular Unido"
                                        value={partyName}
                                        onChange={(e) =>
                                            setPartyName(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div className="new-party-field">
                                <label htmlFor="partyAcronyms">Siglas</label>
                                <div className="new-party-control">
                                    <span className="new-party-control-icon">
                                        <i className="fas fa-font"></i>
                                    </span>
                                    <input
                                        id="partyAcronyms"
                                        name="partyAcronyms"
                                        type="text"
                                        className="form-control new-party-input"
                                        placeholder="Ej. FPU"
                                        value={partyAcronyms}
                                        onChange={(e) =>
                                            setPartyAcronyms(
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                        maxLength={12}
                                        required
                                    />
                                </div>
                                <small>
                                    Usa siglas cortas para que se lean bien en
                                    la boleta.
                                </small>
                            </div>

                            <div className="new-party-field">
                                <label htmlFor="color">
                                    Color principal del partido
                                </label>
                                <div className="new-party-color-row">
                                    <input
                                        id="colorHex"
                                        type="text"
                                        className="form-control new-party-input new-party-hex-input"
                                        placeholder="#0F4C81"
                                        value={hexInput}
                                        onChange={(e) =>
                                            handleHexInputChange(
                                                e.target.value
                                            )
                                        }
                                        onBlur={handleHexInputBlur}
                                        maxLength={7}
                                        spellCheck="false"
                                    />
                                    <input
                                        id="color"
                                        type="color"
                                        className="new-party-color-input"
                                        name="color"
                                        value={partyColor}
                                        onChange={(e) =>
                                            handleColorPickerChange(
                                                e.target.value
                                            )
                                        }
                                    />
                                    <span className="new-party-color-value">
                                        {partyColor.toUpperCase()}
                                    </span>
                                </div>
                                <div className="new-party-presets">
                                    {PARTY_COLOR_PRESETS.map((preset) => (
                                        <button
                                            key={preset.value}
                                            type="button"
                                            className={`new-party-preset${
                                                partyColor === preset.value
                                                    ? " is-active"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleColorPickerChange(
                                                    preset.value
                                                )
                                            }
                                            aria-label={`Seleccionar ${preset.name}`}
                                            title={preset.name}
                                        >
                                            <span
                                                className="new-party-preset-swatch"
                                                style={{
                                                    backgroundColor:
                                                        preset.value,
                                                }}
                                            ></span>
                                            <span className="new-party-preset-name">
                                                {preset.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                <small>
                                    Elige un preset, escribe el hexadecimal o
                                    usa el selector nativo como respaldo.
                                </small>
                                {hasInvalidHexInput ? (
                                    <small className="new-party-color-error">
                                        Introduce un color hexadecimal valido en
                                        formato `#RRGGBB`.
                                    </small>
                                ) : null}
                            </div>
                        </section>

                        <aside className="new-party-panel new-party-preview-panel">
                            <div className="new-party-panel-header">
                                <span className="new-party-panel-icon">
                                    <i className="fas fa-palette"></i>
                                </span>
                                <div>
                                    <h4>Vista previa</h4>
                                    <p>Así se verá la identidad del partido
                                        dentro del panel administrativo.
                                    </p>
                                </div>
                            </div>

                            <div className="new-party-preview-card">
                                <div
                                    className="new-party-preview-banner"
                                    style={{
                                        background: `linear-gradient(135deg, ${partyColor}, #1c2533)`,
                                    }}
                                >
                                    <span className="new-party-preview-badge">
                                        Partido politico
                                    </span>
                                    <h5>{partyAcronyms || "SIGLAS"}</h5>
                                    <p>{partyName || "Nombre del partido"}</p>
                                </div>

                                <div className="new-party-preview-details">
                                    <div className="new-party-preview-item">
                                        <span>Nombre</span>
                                        <strong>
                                            {partyName || "Pendiente de definir"}
                                        </strong>
                                    </div>
                                    <div className="new-party-preview-item">
                                        <span>Siglas</span>
                                        <strong>
                                            {partyAcronyms || "Pendiente"}
                                        </strong>
                                    </div>
                                    <div className="new-party-preview-item">
                                        <span>Color</span>
                                        <strong>{partyColor.toUpperCase()}</strong>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>

                    <div className="new-party-footer">
                        <p>
                            Guarda primero el partido y luego podras asignarlo a
                            candidatos desde la boleta.
                        </p>
                        <button
                            className="btn btn-primary new-party-submit"
                            type="submit"
                        >
                            <i className="fas fa-save mr-2"></i>
                            Guardar partido
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewParty;
