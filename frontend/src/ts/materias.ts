import { api } from "./axiosConfig"

async function getAllCategory(): Promise<StrapiResponse<Category>> {
    const res = await api.get('/materias/')
    return res.data
  }