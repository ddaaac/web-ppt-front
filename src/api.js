import axios from "axios";

export const getSlide = async (id) => {
  const {data} = await axios.get(`http://localhost:8080/slide/${id}`)
  return data.markdown
}

export const createSlide = async (markdown) => {
  const {headers} = await axios.post(`http://localhost:8080/slide`, markdown, {headers: {"Content-Type": "text/plain"}})
  return headers.location
}

export const updateSlide = async (id, markdown) => {
  const {headers} = await axios.put(`http://localhost:8080/slide/${id}`, markdown, {headers: {"Content-Type": "text/plain"}})
  return headers.location
}