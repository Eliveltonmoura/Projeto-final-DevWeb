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
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const tipoUsuario = document.getElementById('TipodeUsuario');
console.log(tipoUsuario.value);
loginForm === null || loginForm === void 0 ? void 0 : loginForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const identificador = emailInput.value;
    const senha = senhaInput.value;
    yield login(identificador, senha);
}));
function login(identificador, senha) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield api.post('/auth/local', {
            identifier: identificador,
            password: senha
        });
        const { jwt } = res.data;
        res = yield api.get('/users/me', {
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
        if (tipoUsuario.value === 'professor') {
            location.assign('teladoProfessor.html');
            console.log('Logado com sucesso');
            return;
        }
        else if (tipoUsuario.value === 'aluno') {
            location.assign('teladoUsuario.html');
            console.log('Logado com sucesso');
        }
    });
}
