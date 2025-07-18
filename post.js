document.addEventListener('DOMContentLoaded', () => {
    const postContainer = document.getElementById('post-container');
    const commentsList = document.getElementById('comments-list');
    const commentForm = document.getElementById('comment-form');
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    fetch('posts.json')
        .then(response => response.json())
        .then(data => {
            const post = data.posts.find(p => p.id == postId);

            if (post) {
                const postTitle = document.createElement('h2');
                postTitle.textContent = post.title;

                const postAuthor = document.createElement('p');
                postAuthor.textContent = `By: ${post.author}`;

                const postContent = document.createElement('p');
                postContent.textContent = post.content;

                postContainer.appendChild(postTitle);
                postContainer.appendChild(postAuthor);
                postContainer.appendChild(postContent);

                post.comments.forEach(comment => {
                    const commentItem = document.createElement('li');
                    commentItem.innerHTML = `<strong>${comment.user}:</strong> ${comment.comment}`;
                    commentsList.appendChild(commentItem);
                });

                commentForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const user = document.getElementById('comment-user').value;
                    const comment = document.getElementById('comment-text').value;

                    const newComment = { user, comment };
                    post.comments.push(newComment);

                    const commentItem = document.createElement('li');
                    commentItem.innerHTML = `<strong>${newComment.user}:</strong> ${newComment.comment}`;
                    commentsList.appendChild(commentItem);

                    commentForm.reset();
                });

            } else {
                postContainer.innerHTML = '<p>Post not found.</p>';
            }
        })
        .catch(error => console.error('Error fetching post:', error));
});
