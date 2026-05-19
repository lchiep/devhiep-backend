const fs = require("fs")
const path = require("path")
const nodemailer = require("nodemailer")

const filePath = path.join(__dirname, "../data/contacts.json")

// ✅ Tạo transporter một lần duy nhất ở đầu file
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

exports.getContacts = (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath))
    res.json(data)
  } catch (err) {
    console.error("getContacts error:", err)
    res.status(500).json({ msg: "Server error" })
  }
}

exports.createContact = async (req, res) => {
  try {
    const contacts = JSON.parse(fs.readFileSync(filePath))

    const newContact = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString(),
    }

    contacts.push(newContact)
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2))

    // ✅ Gửi email thông báo nếu có cấu hình
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `[Portfolio] New message from ${newContact.name}`,
        html: `
          <h3>New contact from DevHiep Portfolio</h3>
          <p><b>Name:</b> ${newContact.name}</p>
          <p><b>Email:</b> ${newContact.email}</p>
          <p><b>Message:</b></p>
          <p>${newContact.message}</p>
        `,
      })
    }

    res.json(newContact)
  } catch (err) {
    console.error("createContact error:", err)
    res.status(500).json({ msg: "Server error" })
  }
}

exports.deleteContact = (req, res) => {
  try {
    const { id } = req.params

    let contacts = JSON.parse(fs.readFileSync(filePath))
    const newContacts = contacts.filter(item => item.id != id)

    fs.writeFileSync(filePath, JSON.stringify(newContacts, null, 2))

    res.json({ msg: "Deleted successfully" })
  } catch (err) {
    console.error("deleteContact error:", err)
    res.status(500).json({ msg: "Server error" })
  }
}