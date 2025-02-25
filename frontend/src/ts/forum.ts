



class TaskManager {
     
  async getAll(): Promise<StrapiResponse<Forum>> {
      console.log(localStorage.getItem('id'));
    const res = await api.get('/forums', {
     // headers: authorizationHeader.headers,
      params: {
        populate: 'category',
        "filters[user][$eq]": localStorage.getItem('id')
      }
    });
    return res.data;
  }

  async create(forum: Forum): Promise<StrapiResponseSingle<Forum>> {
    console.log(forum);
    const res = await api.post('/forums/', {
      data: {
        description: forum.description,
        category: forum.category.documentId,
        done: forum.done,
        deadline: forum.deadline,
        user: localStorage.getItem('id') 
      }
    });
    return res.data;
  }

  async getById(id: string): Promise<StrapiResponseSingle<Forum>> {
    const res = await api.get(`/forums/${id}`);
    return res.data;
  }

  async delete(forum: Forum): Promise<void> {
    await api.delete(`/forums/${forum.documentId}`);
  }

  async update(task: Forum): Promise<StrapiResponseSingle<Forum>> {
    const res = await api.put(`/forums/${task.documentId}`, {
      data: {
        description: task.description
      }
    });
    return res.data;
  
  }
}


const taskManager = new TaskManager();

const authorizationHeader = { 
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}` // Certifique-se de que 'token' é a chave correta
  }
};

function createPost(content: string): void {
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

    const commentButton = postElement.querySelector(".comment-button") as HTMLButtonElement;
    const commentInput = postElement.querySelector(".comment-input") as HTMLInputElement;
    const commentsDiv = postElement.querySelector(".comments") as HTMLDivElement;

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
