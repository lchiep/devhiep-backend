const router = require("express").Router()
const auth = require("../middleware/authMiddleware")
const upload = require("../middleware/upload")

const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require("../controllers/projectController")

// PUBLIC
router.get("/", getProjects)
router.get("/:id", getProjectById)

// ADMIN
router.post(
  "/",
  auth,
  upload.single("image"),
  createProject
)

router.put(
  "/:id",
  auth,
  upload.single("image"),
  updateProject
)

router.delete(
  "/:id",
  auth,
  deleteProject
)

module.exports = router
