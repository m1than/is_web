document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('twitterFeed') as HTMLDivElement | null;
  const preloader = document.getElementById('preloader') as HTMLDivElement | null;
  const newPostBtn = document.getElementById('newPostBtn') as HTMLButtonElement | null;

  if (!container) {
    console.warn('Элемент с id="twitterFeed" не найден на странице.');
  }
  if (!preloader) {
    console.warn('Элемент с id="preloader" не найден на странице.');
  }

  loadInitialPosts();

  if (newPostBtn && container) {
    newPostBtn.addEventListener('click', () => {
      openNewPostModal(container);
    });
  }

  async function loadInitialPosts(): Promise<void> {
    if (preloader) {
      preloader.style.display = 'block';
    }

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: { id: number; title: string; body: string }[] = await response.json();

      if (preloader) {
        preloader.style.display = 'none';
      }

      data.forEach(post => {
        if (container) {
          const tweetElement = renderTweet(
            'Иван Гайфутдинов',
            `user${post.id}`,
            post.body,
            '/frontend/public/assets/avatar.png',
          );
          container.appendChild(tweetElement);
        }
      });
    } catch (error: any) {
      if (preloader) {
        preloader.style.display = 'none';
      }
      if (container) {
        container.innerHTML = `Ошибка: ${error.message}`;
      }
    }
  }

  function renderTweet(
    name: string,
    username: string,
    text: string,
    avatarUrl: string,
  ): HTMLDivElement {
    const tweet = document.createElement('div');
    tweet.classList.add('tweet');
    tweet.innerHTML = `
        <img src="${avatarUrl}" alt="avatar" class="tweet__avatar"/>
        <div class="tweet__content">
          <div class="tweet__header">
            <span class="tweet__name">${name}</span>
            <span class="tweet__username">@${username}</span>
            <span class="tweet__time">• только что</span>
          </div>
          <p class="tweet__text">${text}</p>
          <div class="tweet__footer">
            <button>❤ 0</button>
            <button>🔁 0</button>
            <button>💬 0</button>
          </div>
        </div>
      `;
    return tweet;
  }

  function openNewPostModal(feedContainer: HTMLDivElement) {
    Swal.fire({
      title: 'Новый пост',
      input: 'textarea',
      inputPlaceholder: 'Что происходит?',
      showCancelButton: true,
      confirmButtonText: 'Опубликовать',
      cancelButtonText: 'Отмена',
    }).then((result: any) => {
      if (result.isConfirmed && result.value) {
        const postText: string = result.value.trim();
        if (postText.length > 0) {
          const newTweet = renderTweet(
            'Иван Гайфутдинов',
            'ivanov_new',
            postText,
            '../assets/avatar.png',
          );
          feedContainer.prepend(newTweet);
        }
      }
    });
  }
});
