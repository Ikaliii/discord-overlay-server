const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const PORT = process.env.PORT || 3001;

// 📁 servir les fichiers overlay
app.use(express.static("public"));

// 🔌 connexion overlay (Electron ou navigateur)
io.on("connection", (socket) => {
    console.log("Overlay connecté :", socket.id);

    socket.on("disconnect", () => {
        console.log("Overlay déconnecté :", socket.id);
    });
});

// 💬 API simple pour ton bot Discord
// exemple: POST /send {type:"text", content:"hello"}
app.use(express.json());

app.post("/send", (req, res) => {
    const { type, content, url, duration } = req.body;

    const payload = {
        type: type || "text",
        content: content || "",
        url: url || "",
        duration: duration || 8000
    };

    io.emit("overlay-event", payload);

    res.json({ success: true, sent: payload });
});

// 🧹 clear écran
app.post("/clear", (req, res) => {
    io.emit("overlay-clear");
    res.json({ success: true });
});

// 🚀 start serveur
server.listen(PORT, () => {
    console.log("Serveur OK sur port " + PORT);
});