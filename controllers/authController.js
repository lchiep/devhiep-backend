const fs = require("fs")
const path = require("path")
const jwt = require("jsonwebtoken")

const adminPath = path.join(__dirname, "../data/admin.json")

exports.login = (req, res) => {

  const { username, password } = req.body

  const admin = JSON.parse(fs.readFileSync(adminPath))

  if (
    username !== admin.username ||
    password !== admin.password
  ) {
    return res.status(401).json({ msg: "Invalid credentials" })
  }

  const token = jwt.sign(
    { username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  res.json({
    token
  })
}
