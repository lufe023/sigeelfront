import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import LockAdmin from './Admin/LockAdmin';
import MouseInactiveLogout from './Admin/AdminUtils/MouseInactiveLogout';

const ProtectedSuperAdmin = () => {
    const [isLogged, setIsLogged] = useState(localStorage.getItem('token'));
    const [access, setAccess] = useState(false);
    const [passwordFail, setPasswordFail] = useState(0);

    // Si tiene token de sesión activo y ya pasó la verificación de clave
    if (isLogged && access) {
        return (
            <>
                <MouseInactiveLogout timeoutInMinutes={5} />
                <Outlet />
            </>
        );
    }

    // Si falla 2 veces la clave en la pantalla de bloqueo, va pa' fuera
    else if (passwordFail === 2) {
        return <Navigate to='/logout' />;
    }

    // Si no ha verificado identidad, le renderiza la pantalla de bloqueo exigiendo rol 99
    else {
        return (
            <LockAdmin
                setAccess={setAccess}
                setPasswordFail={setPasswordFail}
                passwordFail={passwordFail}
                requiredRole={99} // 👈 Le pasamos el rol específico para Super Admin
            />
        );
    }
};

export default ProtectedSuperAdmin;