import express from "express";
import mongoose from "mongoose";
import usuer from "./api/usuer.js";
import grupo from "./api/grupo.js";


const app = express();
app.use(express.json());

async function main() {
    const DB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";
    try{
        await mongoose.connect(DB_URI);
        console.log("Conexion a la base de datos exitosa");

        const usu_prede= await usuer.countDocuments();
        if (usu_prede === 0){
            await usuer.insertMany([
                {name: "Perez", email: "perezgome@gmail.com", edad: 30},
                {name: "Lopez", email: "lopezmartinez@gmail.com", edad: 25},
                {name: "Garcia", email: "garciarodriguez@gmail.com", edad: 28}
            ]);
            console.log(" Ingresados usuarios predeterminados");
        }
        const gru_prede= await grupo.countDocuments();
        if (gru_prede === 0){
            await grupo.insertMany([
                {nombre: "Admin", num_users: 10},
                {nombre: "Moderator", num_users: 20},
                {nombre: "User", num_users: 12}
            ]);
            console.log("Ingresados grupos predeterminados");
        }

        //emdpoint Usuarios 
        app.get("/usuarios", async (req, res) => {
            const users = await usuer.find();
            res.json(users);
        });
        app.post("/iniusuario", async (req, res) => {
            try {
                const newUser = new usuer(req.body);
                const savedUser = await newUser.save();
                res.status(201).json(savedUser);
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
        app.put("/usuarios/:id", async (req, res) => {
            try {
                const updatedUser = await usuer.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true }
                );
                if (!updatedUser) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.json(updatedUser);
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
        app.delete("/usuarios/:id", async (req, res) => {
            try {
                const deletedUser = await usuer.findByIdAndDelete(req.params.id);
                if (!deletedUser) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.json({ message: "User deleted" });
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        });                
        //endpoint Grupos
        app.get("/grupos", async (req, res) => {
            const grupos = await grupo.find();
            res.json(grupos);
        });
        app.post("/inigrupo", async (req, res) => {
            try {
                const newGrupo = new grupo(req.body);
                const savedGrupo = await newGrupo.save();
                res.status(201).json(savedGrupo);
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
        app.put("/grupos/:id", async (req, res) => {
            try {
                const updatedGrupo = await grupo.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true }
                );
                if (!updatedGrupo) {
                    return res.status(404).json({ message: "Grupo no encontrado" });
                }
                res.json(updatedGrupo);
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
        app.delete("/grupos/:id", async (req, res) => {
            try {
                const deletedGrupo = await grupo.findByIdAndDelete(req.params.id);
                if (!deletedGrupo) {
                    return res.status(404).json({ message: "Grupo no encontrado" });
                }
                res.json({ message: "Grupo eliminado" });
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        });

        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`El servidor esta fincionando en http://localhost:${PORT}`);
        });
    }
    catch (error){
        console.error("Error en la conexion con la Base:", error);
    }
}
main();