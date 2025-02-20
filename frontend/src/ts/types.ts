

interface StrapiResponse<T> {
  data: T[]
  meta: Pagination
}

interface StrapiResponseSingle<T> {
  data: T
  meta: Pagination
}

interface Pagination {
  page: number,
  pageSize: number,
  pageCount: number,
  total: number
}

interface Atividade {
  documentId?: string,
  description: string,
  done: boolean,
  deadline?: string,
  category: Category,
  titulo?: string // Adicionado o campo titulo
}

interface Category {
  documentId: string,
}