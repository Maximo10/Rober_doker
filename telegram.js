import axios from "axios";

export async function EnviarMensajeTelegram(mensaje){
    const token = process.env.TOKEN_BOT_TELEGRAM;
    const chatId = process.env.ID_CHAT_TELEGRAM;        
    
    if (!token || !chatId) {
        console.log("⚠️ Telegram no configurado");
        console.log(mensaje);
        return;
    }
    
    try {
        const url=`https://api.telegram.org/bot${token}/sendMessage`;
        await axios.post(url, {
            chat_id: chatId,
            text: mensaje
        });
        console.log("✅ Mensaje enviado a Telegram correctamente");
        return response.data;
    } catch (error) {
        console.error("❌ Error enviando mensaje a Telegram:", error.message);
        throw error;
    }    
}