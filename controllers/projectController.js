const fs = require("fs")
const path = require("path")

const filePath = path.join(__dirname, "../data/projects.json")

// GET
exports.getProjects = (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath))
  res.json(data)
}

exports.getProjectById = (req, res) => {
  const projects = JSON.parse(fs.readFileSync(filePath))
  const project = projects.find(p => p.id == req.params.id)

  if (!project) {
    return res.status(404).json({ msg: "Project not found" })
  }

  res.json(project)
}


// CREATE
exports.createProject = (req, res) => {
  const projects = JSON.parse(fs.readFileSync(filePath))

  const newProject = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    image: req.file ? `/uploads/${req.file.filename}` : ""
  }

  projects.push(newProject)

  fs.writeFileSync(filePath, JSON.stringify(projects, null, 2))

  res.json(newProject)
}


// UPDATE
exports.updateProject = (req, res) => {
  const projects = JSON.parse(fs.readFileSync(filePath))

  const index = projects.findIndex(p => p.id == req.params.id)

  if (index === -1) {
    return res.status(404).json({ msg: "Project not found" })
  }

  projects[index] = {
    ...projects[index],
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    image: req.file
      ? `/uploads/${req.file.filename}`
      : projects[index].image
  }

  fs.writeFileSync(filePath, JSON.stringify(projects, null, 2))

  res.json(projects[index])
}



// DELETE
exports.deleteProject = (req, res) => {
  const projects = JSON.parse(fs.readFileSync(filePath))

  const project = projects.find(p => p.id == req.params.id)
  if (!project) {
    return res.status(404).json({ msg: "Project not found" })
  }

  // delete image file if exists
  if (project.image) {
    const imagePath = path.join(__dirname, "..", project.image)

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath)
    }
  }

  const newProjects = projects.filter(p => p.id != req.params.id)
  fs.writeFileSync(filePath, JSON.stringify(newProjects, null, 2))

  res.json({ msg: "Deleted successfully" })
}


