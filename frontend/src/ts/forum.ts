
const authorizationHeader = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
};

function createPost(content: string): void {
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

    const commentButton = postElement.querySelector('.comment-button') as HTMLButtonElement;
    const commentInput = postElement.querySelector('.comment-input') as HTMLInputElement;
    const commentsDiv = postElement.querySelector('.comments') as HTMLDivElement;

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
  async getAll(): Promise<StrapiResponseForum<Forum>> {
    const res = await api.get('/forums', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params: {
        populate: 'category',
        'filters[user][$eq]': localStorage.getItem('documentId'),
      },
    });
    return res.data;
  }

  async create(forum: Forum): Promise<StrapiResponseSingleForum<Forum>> {
    const res = await api.post('/forums',
      {
        data: {
          description: forum.description,
          category: forum.category.documentId,
          done: forum.done,
          deadline: forum.deadline,
          user: localStorage.getItem('id'), 
        },
      },
      authorizationHeader,
    );
    return res.data;
  }

  async getById(id: string): Promise<StrapiResponseSingleForum<Forum>> {
    const res = await api.get(`/forums/${id}`, authorizationHeader);
    return res.data;
  }

  async delete(forum: Forum): Promise<Forum> {
    await api.delete(`/forums/${forum.documentId}`, authorizationHeader);
    return forum;
  }

  async update(forum: Forum): Promise<StrapiResponseSingleForum<Forum>> {
    const res = await api.put(
      `/forums/${forum.documentId}`,
      {
        data: {
          description: forum.description,
        },
      },
      authorizationHeader,
    );
    return res.data;
  }
}

const forumForm = document.getElementById('forumForm') as HTMLFormElement;
const postContent = document.getElementById('postContent') as HTMLInputElement;
const deadlineInput = document.getElementById('deadlineInput') as HTMLInputElement;
const selectCategory = document.getElementById('selectCategory') as HTMLSelectElement;
console.log(forumForm)
forumForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const forum: Forum = {
    description: postContent.value,
    deadline: deadlineInput.value || undefined,
    done: false,
    category: {
      documentId: selectCategory.value,
      //description: selectCategory.options[selectCategory.selectedIndex].text,
    },
  };

  const forumManager = new ForumManager();
  await forumManager.create(forum);


  forumForm.reset();
});