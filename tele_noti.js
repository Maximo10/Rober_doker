import { inngest } from "./cliente.js";
import { EnviarMensajeTelegram } from "./telegram.js";

export const NotiNewUser = inngest.createFunction(
    {
        id:"notificación-nuevo-usuario",
        name: "Notificación Nuevo Usuario",
        retries: 3,
    },
    {event: "nuevo.usuario"},
    async ({ event }) => {
        const { name, email, edad } = event.data;
        const mensaje =
        `📢 Nuevo usuario creado:\n` +
        `👤 Nombre: ${name}\n` +
        `📧 Email: ${email}\n` +
        `📅 Edad: ${edad}\n`+
        `⏰ ${new Date().toLocaleTimeString('es-ES')}`;
        console.log("📨 Enviando notificación...");
        await EnviarMensajeTelegram(mensaje);
    }
);
