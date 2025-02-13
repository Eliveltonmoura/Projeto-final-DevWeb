import { API_BASE_URL } from "./config";

async function carregarMateriais() {
    const response = await fetch(`${API_BASE_URL}/materiais`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    const { data } = await response.json();
    const listaMateriais = document.getElementById("listaMateriais") as HTMLDivElement;

    listaMateriais.innerHTML = data.map((item: any) => `
        <div class="material-item">
            <h3>${item.attributes.titulo}</h3>
            <p>${item.attributes.descricao}</p>
            <a href="${item.attributes.arquivo.data.attributes.url}" target="_blank">Baixar</a>
        </div>
    `).join("");
}

document.addEventListener("DOMContentLoaded", carregarMateriais);
