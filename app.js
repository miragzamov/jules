document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');
    const searchBar = document.getElementById('search-bar');
    let posts = [];

    fetch('posts.json')
        .then(response => response.json())
        .then(data => {
            posts = data.posts;
            displayPosts(posts);
        })
        .catch(error => console.error('Error fetching posts:', error));

    function displayPosts(postsToDisplay) {
        postsContainer.innerHTML = '';
        postsToDisplay.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('post-card');
            postCard.addEventListener('click', () => {
                window.location.href = `post.html?id=${post.id}`;
            });

            const postTitle = document.createElement('h2');
            postTitle.textContent = post.title;

            const postAuthor = document.createElement('p');
            postAuthor.textContent = `By: ${post.author}`;

            const postContent = document.createElement('p');
            postContent.textContent = post.content;

            postCard.appendChild(postTitle);
            postCard.appendChild(postAuthor);
            postCard.appendChild(postContent);

            postsContainer.appendChild(postCard);
        });
    }

    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredPosts = posts.filter(post => {
            return post.title.toLowerCase().includes(searchTerm) ||
                   post.content.toLowerCase().includes(searchTerm) ||
                   post.author.toLowerCase().includes(searchTerm);
        });
        displayPosts(filteredPosts);
    });
});
