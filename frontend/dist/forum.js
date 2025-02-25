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
class TaskManager {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(localStorage.getItem('id'));
            const res = yield api.get('/forums', {
                // headers: authorizationHeader.headers,
                params: {
                    populate: 'category',
                    "filters[user][$eq]": localStorage.getItem('id')
                }
            });
            return res.data;
        });
    }
    create(forum) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(forum);
            const res = yield api.post('/forums/', {
                data: {
                    description: forum.description,
                    category: forum.category.documentId,
                    done: forum.done,
                    deadline: forum.deadline,
                    user: localStorage.getItem('id')
                }
            });
            return res.data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield api.get(`/forums/${id}`);
            return res.data;
        });
    }
    delete(forum) {
        return __awaiter(this, void 0, void 0, function* () {
            yield api.delete(`/forums/${forum.documentId}`);
        });
    }
    update(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield api.put(`/forums/${task.documentId}`, {
                data: {
                    description: task.description
                }
            });
            return res.data;
        });
    }
}
const taskManager = new TaskManager();
const authorizationHeader = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Certifique-se de que 'token' é a chave correta
    }
};
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
                commentInput.value = "";
            }
        });
        postsContainer.appendChild(postElement);
    }
}
/*
document.addEventListener("DOMContentLoaded", () => {
  const postButton = document.getElementById("postButton");
  const postContent = document.getElementById("postContent") as HTMLTextAreaElement;

  if (postButton && postContent) {
    postButton.addEventListener("click", () => {
      const content = postContent.value.trim();
      if (content) {
        createPost(content);
        postContent.value = "";
      }
    });
  }
});

*/
