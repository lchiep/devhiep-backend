const express = require("express")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const contactRoutes = require("./routes/contactRoutes")
const projectRoutes = require("./routes/projectRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Server running...")
})

app.use("/api/auth", authRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/projects", projectRoutes)
app.use("/uploads", express.static("uploads"))



const PORT = 5000
app.listen(PORT, () => {
  console.log("Server running on port " + PORT)
})
console.log("Auth routes loaded:", authRoutes)
