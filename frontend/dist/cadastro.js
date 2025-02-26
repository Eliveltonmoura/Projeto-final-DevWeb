"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const cadastroForm = document.getElementById('cadastroForm');
const nomeCadastro = document.getElementById('nome');
const emailCadastro = document.getElementById('email');
const senhaCadastro = document.getElementById('senha');
cadastroForm === null || cadastroForm === void 0 ? void 0 : cadastroForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const nome = nomeCadastro.value;
    const email = emailCadastro.value;
    const senha = senhaCadastro.value;
    yield registro(nome, email, senha);
}));
function registro(nome, email, senha) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield api.post('/auth/local/register', {
            username: nome,
            email: email,
            password: senha
        });
        const { jwt } = res.data;
        res = yield api.get('/users', {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
            params: {
                populate: 'role'
            }
        });
        console.log(res.data);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('id', res.data.id);
        localStorage.setItem('documentId', res.data.documentId);
        localStorage.setItem('role', res.data.role.name);
        localStorage.setItem('token', jwt);
        location.assign('login.html');
        console.log('Logado com sucesso');
    });
}
