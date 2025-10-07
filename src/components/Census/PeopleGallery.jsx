import React, { useState } from "react";

const images = [
    "https://revistajaraysedal.es/wp-content/uploads/gente-de-pueblo-768x432.jpg",
    "https://revistajaraysedal.es/wp-content/uploads/2025/09/sandia-65-kilos-1-1024x683.webp?text=2",
    "https://revistajaraysedal.es/wp-content/uploads/2025/09/inaugurada-feciex-2025-1-1024x683.webp",
    "https://revistajaraysedal.es/wp-content/uploads/2025/09/image-77-1024x696.webp",
    "https://revistajaraysedal.es/wp-content/uploads/2025/09/image-76-1024x692.webp",
    "https://revistajaraysedal.es/wp-content/uploads/2025/09/image-78-1024x673.webp",
];

const PeopleGallery = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handlePrev = () => {
        setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div>
            {/* Modal con carrusel */}
            {selectedIndex !== null && (
                <div
                    onClick={() => setSelectedIndex(null)}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.8)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 9999,
                    }}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePrev();
                        }}
                        style={{
                            position: "absolute",
                            left: "10px", // 👈 cambiar a izquierda
                            width: "40px",
                            height: "40px",
                            borderRadius: "20px",
                            background: "#fff",
                            border: "none",
                            color: "#000",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.5rem",
                            padding: 0,
                        }}
                    >
                        ‹
                    </button>
                    <img
                        src={images[selectedIndex]}
                        alt="Grande"
                        style={{ maxWidth: "90%", maxHeight: "90%" }}
                    />
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNext();
                        }}
                        style={{
                            position: "absolute",
                            right: "20px",
                            width: "40px",
                            height: "40px",
                            borderRadius: "20px",
                            background: "#fff",
                            border: "none",
                            color: "#000",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.5rem",
                            padding: 0,
                        }}
                    >
                        ›
                    </button>
                </div>
            )}

            {/* Galería */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img.replace("1200", "150")} // miniatura
                        alt={`img-${idx}`}
                        style={{
                            cursor: "pointer",
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                        }}
                        onClick={() => setSelectedIndex(idx)}
                    />
                ))}
            </div>
        </div>
    );
};

export default PeopleGallery;
