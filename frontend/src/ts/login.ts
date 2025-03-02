const loginForm = document.getElementById('loginForm')
const emailInput = document.getElementById('email') as HTMLInputElement
const senhaInput = document.getElementById('senha') as HTMLInputElement
const tipoUsuario = document.getElementById('TipodeUsuario') as HTMLInputElement
console.log(tipoUsuario.value)

loginForm?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const identificador = emailInput.value
  const senha = senhaInput.value
  await login(identificador, senha)

})

async function login(identificador: string, senha: string) {
  let res = await api.post('/auth/local', {
    identifier: identificador,
    password: senha
  })
  const { jwt } = res.data

  res = await api.get('/users/me', {
    headers: {
      Authorization: `Bearer ${jwt}`
    },
    params: {
      populate: 'role'
    }
  })

  console.log(res.data)

  localStorage.setItem('username', res.data.username)
  localStorage.setItem('id', res.data.id)
  localStorage.setItem('documentId', res.data.documentId)
  localStorage.setItem('role', res.data.role.name)
  localStorage.setItem('token', jwt);

  if (tipoUsuario.value === 'professor') {
    location.assign('teladoProfessor.html')
    console.log('Logado com sucesso')
    return
  }
  else if (tipoUsuario.value === 'aluno') {
    location.assign('teladoUsuario.html')
    console.log('Logado com sucesso')
  }
}

