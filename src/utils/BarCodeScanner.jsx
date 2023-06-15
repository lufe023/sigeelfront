import React, { useEffect, useRef } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const $resultados = document.querySelector("#resultado");

    Quagga.init(
      {
        inputStream: {
          constraints: {
            width: 1920,
            height: 1080,
          },
          name: "Live",
          type: "LiveStream",
          target: videoRef.current, // Usar el elemento videoRef.current como destino
        },
        decoder: {
          readers: ["ean_reader"],
        },
      },
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Iniciado correctamente");
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      $resultados.textContent = data.codeResult.code;
      console.log(data);
    });
  }, []);

  return (
    <div>
      <p id="resultado">Aquí aparecerá el código</p>
      <p>A continuación, la vista de la cámara:</p>
      <video ref={videoRef} id="contenedor" style={{ maxWidth: '100%', width: '100%' }}></video>
    </div>
  );
};

export default BarcodeScanner;
