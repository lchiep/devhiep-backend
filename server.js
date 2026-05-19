const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

// ✅ FIX CORS: thêm OPTIONS + headers đầy đủ
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://devhiep-portfolio.vercel.app"
  ],
  methods: ["GET", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// ✅ Xử lý preflight OPTIONS request cho tất cả routes
app.options("*", cors(corsOptions));

app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);

// STATIC IMAGES
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});