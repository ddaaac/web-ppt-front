import axios from "axios";

const url = "http://localhost:8080"

export const getSlide = async (id) => {
  const {data} = await axios.get(`${url}/ppt/${id}`)
  return data.markdown
}

export const createSlide = async (markdown) => {
  const {headers} = await axios.post(`${url}/ppt`, markdown, {headers: {"Content-Type": "text/plain"}})
  return headers.location
}

export const updateSlide = async (id, markdown) => {
  const {headers} = await axios.put(`${url}/ppt/${id}`, markdown, {headers: {"Content-Type": "text/plain"}})
  return headers.location
}