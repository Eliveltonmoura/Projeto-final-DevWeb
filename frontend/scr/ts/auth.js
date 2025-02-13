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
const API_URL = "http://localhost:5000/api/users";
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const cadastroForm = document.getElementById("cadastroForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const response = yield fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha: password })
            });
            const data = yield response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                window.location.href = "dashboard.html";
            }
            else {
                alert(data.message);
            }
        }));
    }
    if (cadastroForm) {
        cadastroForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
            event.preventDefault();
            const nome = document.getElementById("nome").value;
            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;
            const tipo_usuario = document.getElementById("tipo_usuario").value;
            const response = yield fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, senha, tipo_usuario })
            });
            const data = yield response.json();
            if (response.ok) {
                alert("Cadastro realizado com sucesso!");
                window.location.href = "login.html";
            }
            else {
                alert(data.message);
            }
        }));
    }
});
