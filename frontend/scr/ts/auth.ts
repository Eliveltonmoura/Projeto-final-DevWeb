import { API_BASE_URL } from "./config";

async function login(email: string, senha: string) {
    const response = await fetch(`${API_BASE_URL}/auth/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, password: senha }),
    });

    if (!response.ok) {
        alert("Login falhou!");
        return;
    }

    const data = await response.json();
    localStorage.setItem("token", data.jwt);
    window.location.href = "dashboard.html";
}

document.getElementById("loginForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const senha = (document.getElementById("senha") as HTMLInputElement).value;
    login(email, senha);
});
