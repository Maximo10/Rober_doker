import express from "express";
import mongoose from "mongoose";
import usuer from "./api/usuer.js";
import grupo from "./api/grupo.js";


const app = express();
app.use(express.json());

async function main() {
    const DB_URI = process.env.MONGO_URI
    try{
        await mongoose.connect(DB_URI);
        console.log("Connected to the database");

        const usu_prede= await usuer.countDocuments();
        if (usu_prede === 0){
            await usuer.insetMany([
                {name: "Lopez", email: "lopez@gmail.com",edad: 30},
                {name: "Garcia", email: "garcia@gmail.com",edad: 25},
            ]);
            console.log("Inserted default users");
        }
        const gru_prede= await grupo.countDocuments();
        if (gru_prede === 0){
            await grupo.insertMany([
                {nombre: "Admin", num_users: 10},
                {nombre: "User", num_users: 50},
            ]);
            console.log("Inserted default groups");
        }

        //emdpoint
        app.get("(/usuer", async (req, res) => {
            const users = await usuer.find();
            res.json(users);
        });
        app.get("/grupo", async (req, res) => {
            const grupos = await grupo.find();
            res.json(grupos);
        });

        app.post("/usuer", async (req, res) => {
            try {
                const newUser = new usuer(req.body);
                const savedUser = await newUser.save();
                res.status(201).json(savedUser);
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
        app.post("/grupo", async (req, res) => {
            try {
                const newGrupo = new grupo(req.body);
                const savedGrupo = await newGrupo.save();
                res.status(201).json(savedGrupo);
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        });

        app.put("/usuer/:id", async (req, res) => {
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
        app.put("/grupo/:id", async (req, res) => {
            try {
                const updatedGrupo = await grupo.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true }
                );
                if (!updatedGrupo) {
                    return res.status(404).json({ message: "Group not found" });
                }
                res.json(updatedGrupo);
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        });

        app.delete("/usuer/:id", async (req, res) => {
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
        app.delete("/grupo/:id", async (req, res) => {
            try {
                const deletedGrupo = await grupo.findByIdAndDelete(req.params.id);
                if (!deletedGrupo) {
                    return res.status(404).json({ message: "Group not found" });
                }
                res.json({ message: "Group deleted" });
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        });

        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error){
        console.error("Database connection error:", error);
    }
}
main();