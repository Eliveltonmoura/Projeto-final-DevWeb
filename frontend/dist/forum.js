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
const authorizationHeader = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
};
console.log(localStorage.getItem('token'));
function createPost(content, id) {
    const postsContainer = document.getElementById('postsContainer');
    if (postsContainer) {
        const postElement = document.createElement('div');
        postElement.setAttribute("data-id", id);
        postElement.classList.add('post');
        postElement.innerHTML = `
      <p class="post-content">${content}</p>
      
      <div class="comment-section">
        <input type="text" class="comment-input" placeholder="Comentar...">  
        <button class="comment-button">Enviar</button>
        <button class="edit-button">Editar</button>
        <button class="delete-button">Deletar</button>
      
        <div class="comments"></div>
      </div>
    `;
        const commentButton = postElement.querySelector('.comment-button');
        const commentInput = postElement.querySelector('.comment-input');
        const commentsDiv = postElement.querySelector('.comments');
        commentButton.addEventListener('click', () => {
            const commentText = commentInput.value.trim();
            if (commentText) {
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');
                commentElement.innerText = commentText;
                commentsDiv.appendChild(commentElement);
                commentInput.value = '';
            }
        });
        postsContainer.appendChild(postElement);
    }
}
class ForumManager {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield api.get('/forums/', authorizationHeader);
            if (!res.data || !res.data.data || res.data.data.length === 0) {
                console.error("Erro: Nenhum post encontrado.");
                return res.data;
            }
            res.data.data.forEach((post) => {
                if (post.Titulo) {
                    createPost(post.Titulo, post.documentId);
                }
            });
            return res.data;
        });
    }
    create(forum) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield api.post('/forums/', {
                data: {
                    Titulo: forum.Titulo,
                },
            }, authorizationHeader);
            return res.data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield api.get(`/forums/${id}`, authorizationHeader);
            return res.data;
        });
    }
    delete(forum) {
        return __awaiter(this, void 0, void 0, function* () {
            yield api.delete(`/forums/${forum.documentId}`, authorizationHeader);
            return forum;
        });
    }
    update(forum) {
        return __awaiter(this, void 0, void 0, function* () {
            yield api.put(`/forums/${forum.documentId}`, {
                data: {
                    Titulo: forum.Titulo,
                },
            }, authorizationHeader);
        });
    }
}
const forumForm = document.getElementById('forumForm');
const postContent = document.getElementById('postContent');
let forumToDelete;
const forumManager = new ForumManager();
document.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
    const target = event.target;
    if (target.classList.contains("delete-button")) {
        const postElement = target.closest(".post");
        const postId = postElement === null || postElement === void 0 ? void 0 : postElement.getAttribute("data-id");
        console.log(postId);
        if (postId) {
            yield forumManager.delete({ documentId: postId });
            postElement.remove();
        }
    }
}));
document.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
    const target = event.target;
    if (target.classList.contains("edit-button")) {
        const postElement = target.closest(".post");
        const postId = postElement === null || postElement === void 0 ? void 0 : postElement.getAttribute("data-id");
        const postContentElement = postElement.querySelector(".post-content");
        if (postId && postContentElement) {
            const newTitle = prompt("Digite o novo título:", postContentElement.innerText);
            if (newTitle && newTitle.trim() !== "") {
                yield forumManager.update({ documentId: postId, Titulo: newTitle });
                postContentElement.innerText = newTitle;
            }
        }
    }
}));
forumForm === null || forumForm === void 0 ? void 0 : forumForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    if (!postContent.value.trim()) {
        alert("Por favor, escreva algo antes de postar.");
        return;
    }
    const forum = {
        Titulo: postContent.value,
        done: false,
        deadline: new Date().toISOString(),
    };
    yield forumManager.create(forum);
    forumManager.getAll();
    // createPost(postContent.value);
    forumForm.reset();
}));
forumManager.getAll();
