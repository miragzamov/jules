document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');

    fetch('posts.json')
        .then(response => response.json())
        .then(data => {
            data.posts.forEach(post => {
                const postCard = document.createElement('div');
                postCard.classList.add('post-card');

                const postTitle = document.createElement('h2');
                postTitle.textContent = post.title;

                const postContent = document.createElement('p');
                postContent.textContent = post.content;

                postCard.appendChild(postTitle);
                postCard.appendChild(postContent);

                postsContainer.appendChild(postCard);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
});
