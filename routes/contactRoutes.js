const router = require("express").Router()
const authMiddleware = require("../middleware/authMiddleware")

const { 
  getContacts, 
  createContact,
  deleteContact
} = require("../controllers/contactController")

// Get all contacts (admin only)
router.get("/", authMiddleware, getContacts)

// Create contact (public)
router.post("/", createContact)

// Delete contact (admin only)
router.delete("/:id", authMiddleware, deleteContact)

module.exports = router
