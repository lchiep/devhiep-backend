import axios from "axios"

const API_URL = "http://localhost:5000/api/projects"

// auto attach token
const authHeader = () => {
  const token = localStorage.getItem("token")

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

// GET ALL
export const getProjects = () => {
  return axios.get(API_URL)
}

// CREATE
export const createProject = (data) => {
  return axios.post(API_URL, data, authHeader())
}

// UPDATE
export const updateProject = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data, authHeader())
}

// DELETE
export const deleteProject = (id) => {
  return axios.delete(`${API_URL}/${id}`, authHeader())
}
