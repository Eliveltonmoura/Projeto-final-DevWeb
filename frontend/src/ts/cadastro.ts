

const cadastroForm = document.getElementById('cadastroForm')
const nomeCadastro = document.getElementById('nome') as HTMLInputElement
const emailCadastro = document.getElementById('email') as HTMLInputElement
const senhaCadastro = document.getElementById('senha') as HTMLInputElement
const tipodeUsuario = document.getElementById('tipo_usuario') as HTMLInputElement
console



cadastroForm?.addEventListener('submit', async(e) => {
  e.preventDefault()
  const nome = nomeCadastro.value
  const email = emailCadastro.value
  const senha = senhaCadastro.value
  const tipo = tipodeUsuario.value
  await registro( nome, email, senha)
  
})

async function registro(nome:string, email: string, senha: string) {
  let res = await api.post('/auth/local/register', {
    username: nome,
    email: email,
    password: senha,
  
  })
  const {jwt} = res.data

  res = await api.get('/users', {
    headers: {
      Authorization: `Bearer ${jwt}`
    },
    params: {
      populate: 'role'
    }
  })
  location.assign('login.html')
  console.log(res.data)

  localStorage.setItem('username', res.data.username)
  localStorage.setItem('id', res.data.id)
  localStorage.setItem('documentId', res.data.documentId)
  localStorage.setItem('role', res.data.role.name)
  localStorage.setItem('token', jwt);

  

  
  
}

