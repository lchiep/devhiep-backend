const fs = require("fs")
const path = require("path")

const filePath = path.join(__dirname, "../data/contacts.json")

exports.getContacts = (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath))
  res.json(data)
}

exports.createContact = (req, res) => {
  const contacts = JSON.parse(fs.readFileSync(filePath))

  const newContact = {
    id: Date.now(),
    ...req.body
  }

  contacts.push(newContact)

  fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2))

  res.json(newContact)
}

// ✅ ADD THIS
exports.deleteContact = (req, res) => {

  const { id } = req.params

  let contacts = JSON.parse(fs.readFileSync(filePath))

  const newContacts = contacts.filter(
    item => item.id != id
  )

  fs.writeFileSync(filePath, JSON.stringify(newContacts, null, 2))

  res.json({ msg: "Deleted successfully" })
}
