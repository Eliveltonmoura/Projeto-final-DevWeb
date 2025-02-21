"use strict";
// Função para criar um novo post
function createPost(content) {
    const postsContainer = document.getElementById("postsContainer");
    if (postsContainer) {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <p>${content}</p>
            <div class="comment-section">
                <input type="text" class="comment-input" placeholder="Comentar...">
                <button class="comment-button">Enviar</button>
                <div class="comments"></div>
            </div>
        `;
        // Adiciona evento ao botão de comentar
        const commentButton = postElement.querySelector(".comment-button");
        const commentInput = postElement.querySelector(".comment-input");
        const commentsDiv = postElement.querySelector(".comments");
        commentButton.addEventListener("click", () => {
            const commentText = commentInput.value.trim();
            if (commentText) {
                const commentElement = document.createElement("div");
                commentElement.classList.add("comment");
                commentElement.innerText = commentText;
                commentsDiv.appendChild(commentElement);
                commentInput.value = ""; // Limpa o campo de comentário
            }
        });
        postsContainer.appendChild(postElement);
    }
}
// Adiciona evento ao botão de postar
document.addEventListener("DOMContentLoaded", () => {
    const postButton = document.getElementById("postButton");
    const postContent = document.getElementById("postContent");
    if (postButton && postContent) {
        postButton.addEventListener("click", () => {
            const content = postContent.value.trim();
            if (content) {
                createPost(content);
                postContent.value = ""; // Limpa o campo de post
            }
        });
    }
});
