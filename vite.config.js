import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import os from "os";

// Función para obtener la dirección IP local
const getLocalIP = () => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // Filtra las direcciones IPv4 que no sean internas
            if (iface.family === "IPv4" && !iface.internal) {
                return iface.address;
            }
        }
    }
    return "localhost"; // Retorna localhost si no encuentra una IP
};

const localIP = getLocalIP();

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: localIP,
        open: `https://${localIP}:5173`,
        https: {
            key: fs.readFileSync("localhost-key.pem"),
            cert: fs.readFileSync("localhost.pem"),
        },
    },
});
