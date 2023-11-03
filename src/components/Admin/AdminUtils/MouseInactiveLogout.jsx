import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const MouseInactiveLogout = ({ timeoutInMinutes }) => {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const resetTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      navigate('/logout');
    }, timeoutInMinutes * 60 * 1000);
  };

  useEffect(() => {
    resetTimer();

    // Agregar event listeners para detectar movimiento del mouse
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);

    // Limpia los event listeners y el temporizador cuando el componente se desmonta
    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      clearTimeout(timerRef.current);
    };
  }, [timeoutInMinutes, navigate]);

  return null; // Este componente no renderiza nada en la interfaz
};

export default MouseInactiveLogout;
