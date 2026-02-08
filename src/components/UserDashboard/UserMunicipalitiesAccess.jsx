import React, { useState, useEffect } from "react";

/**
 * Componente Dual List Box para asignar municipios a un usuario
 * @param {Array} municipios Lista completa de municipios [{MunicipalityId, name}]
 * @param {Array} municipiosUsuario Lista actual de municipios del usuario [{MunicipalityId, name}]
 * @param {String} idusuario ID del usuario
 * @param {Function} onChange Callback que devuelve los municipios seleccionados
 */
const UserMunicipalitiesAccess = ({
    municipios = [],
    municipiosUsuario = [],
    idusuario,
    onChange,
}) => {
    const [disponibles, setDisponibles] = useState([]);
    const [asignados, setAsignados] = useState([]);

    const municipiosArray = Array.isArray(municipios)
        ? municipios
        : municipios
          ? [municipios]
          : [];

    const municipiosUsuarioArray = Array.isArray(municipiosUsuario)
        ? municipiosUsuario
        : municipiosUsuario
          ? [municipiosUsuario]
          : [];

    // Inicializar listas al montar o al cambiar props
    useEffect(() => {
        const municipiosArr = Array.isArray(municipios)
            ? municipios
            : municipios
              ? [municipios]
              : [];

        const municipiosUsuarioArr = Array.isArray(municipiosUsuario)
            ? municipiosUsuario
            : municipiosUsuario
              ? [municipiosUsuario]
              : [];

        const idsAsignados = municipiosUsuarioArr.map((m) => m.MunicipalityId);

        setDisponibles(
            municipiosArr.filter(
                (m) => !idsAsignados.includes(m.MunicipalityId),
            ),
        );

        setAsignados(
            municipiosArr.filter((m) =>
                idsAsignados.includes(m.MunicipalityId),
            ),
        );
    }, [municipios, municipiosUsuario]);

    // Función para mover un municipio a la lista de asignados
    const asignarMunicipio = (municipio) => {
        setAsignados((prev) => {
            const updated = [...prev, municipio];
            onChange?.(updated);
            return updated;
        });

        setDisponibles((prev) =>
            prev.filter((m) => m.MunicipalityId !== municipio.MunicipalityId),
        );
    };

    // Función para mover un municipio de vuelta a disponibles
    const desasignarMunicipio = (municipio) => {
        setDisponibles((prev) => [...prev, municipio]);

        setAsignados((prev) => {
            const updated = prev.filter(
                (m) => m.MunicipalityId !== municipio.MunicipalityId,
            );
            onChange?.(updated);
            return updated;
        });
    };

    return (
        <div className="flex gap-4 p-4 bg-white rounded-lg shadow-md">
            {/* Lista de disponibles */}
            <div className="flex-1">
                <h4 className="font-semibold mb-2">Disponibles</h4>
                <div className="border rounded h-64 overflow-y-auto p-2">
                    {disponibles.length === 0 ? (
                        <p className="text-gray-400 text-center mt-4">
                            Sin municipios
                        </p>
                    ) : (
                        disponibles.map((m) => (
                            <div
                                key={`disp-${m.MunicipalityId}`}
                                onClick={() => asignarMunicipio(m)}
                                className="p-2 cursor-pointer hover:bg-gray-100 rounded"
                            >
                                {m.name}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Lista de asignados */}
            <div className="flex-1">
                <h4 className="font-semibold mb-2">Asignados</h4>
                <div className="border rounded h-64 overflow-y-auto p-2">
                    {asignados.length === 0 ? (
                        <p className="text-gray-400 text-center mt-4">
                            Sin municipios asignados
                        </p>
                    ) : (
                        asignados.map((m) => (
                            <div
                                key={`asg-${m.MunicipalityId}`}
                                onClick={() => desasignarMunicipio(m)}
                                className="p-2 cursor-pointer hover:bg-gray-100 rounded"
                            >
                                {m.name}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserMunicipalitiesAccess;
