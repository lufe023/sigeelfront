import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExportToExcel = ({ data, precintName, colegios}) => {

  const handleExport = () => {
    // Crear un nuevo libro de trabajo y una hoja de cálculo
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    const hoja = precintName.split(" ")
    // Agregar la hoja de cálculo al libro de trabajo
    XLSX.utils.book_append_sheet(workbook, worksheet, hoja[hoja.length -2] +" "+ hoja[hoja.length -1] );

    // Generar el archivo Excel
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

    // Guardar el archivo usando FileSaver
    saveAs(blob, `Informe ${precintName}.xlsx`);
  };

  return (
    <button className='btn btn-success' onClick={handleExport}>Exportar a Excel <i className="fas fa-file-excel"></i> </button>
  );
};

export default ExportToExcel;
