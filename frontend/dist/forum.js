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
function createPost(content) {
    const postsContainer = document.getElementById('postsContainer');
    if (postsContainer) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
      <p>${content}</p>
      <div class="comment-section">
        <input type="text" class="comment-input" placeholder="Comentar...">
        <button class="comment-button">Enviar</button>
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
            console.log("Resposta do Strapi:", res.data);
            if (!res.data || !res.data.data || res.data.data.length === 0) {
                console.error("Erro: Nenhum post encontrado.");
                return res.data;
            }
            createPost(res.data.data.Titulo);
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
            const res = yield api.put(`/forums/${forum.documentId}`, {
                data: {
                    Titulo: forum.Titulo,
                },
            }, authorizationHeader);
            return res.data;
        });
    }
}
const forumForm = document.getElementById('forumForm');
const postContent = document.getElementById('postContent');
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
    const forumManager = new ForumManager();
    yield forumManager.getAll();
    yield forumManager.create(forum);
    // createPost(postContent.value);
    forumForm.reset();
}));
