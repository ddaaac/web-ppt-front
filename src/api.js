import axios from "axios";

export const getSlide = async (id) => {
  const {data} = await axios.get(`http://localhost:8080/slide/${id}`)
  return data.markdown
}