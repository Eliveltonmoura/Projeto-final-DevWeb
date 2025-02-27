

interface StrapiResponse<Atividade> {
  data: Atividade[]
  meta: Pagination
}
interface StrapiResponseForum<T> {
  data:T[]
  meta: Pagination
}



interface StrapiResponseSingle<Atividade> {
  data: Atividade
  meta: Pagination
}
interface StrapiResponseSingleForum<T> {
  data: T
  meta: Pagination
}

interface Pagination {
  page: number,
  pageSize: number,
  pageCount: number,
  total: number
}

interface Forum {
  documentId?: string,
  description?: string,
  done: boolean,
  deadline?: string,
  category: Category,

}

interface Atividade {
  documentId?: string,
  description: string,
  done: boolean,
  deadline?: string,
  category: Category,
  titulo?: string
}

interface Category {
  documentId: string,
}
