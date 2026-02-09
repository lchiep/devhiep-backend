const express = require("express")
const path = require("path")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const contactRoutes = require("./routes/contactRoutes")
const projectRoutes = require("./routes/projectRoutes")

const app = express()

app.use(cors())
app.use(express.json())

// ROUTES
app.use("/api/auth", authRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/projects", projectRoutes)

// STATIC IMAGES (CHUẨN DEPLOY)
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log("Server running on port", PORT)
})

import cors from "cors"

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://devhiep-portfolio.vercel.app"
  ],
  methods: ["GET", "POST"],
}))


