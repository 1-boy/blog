
document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const commentInput = document.getElementById('comment-input');
    const commentText = commentInput.value;
    
    if (commentText) {
        const commentContainer = document.getElementById('comments-container');
        
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.textContent = commentText;
        
        commentContainer.appendChild(newComment);
        
        commentInput.value = '';
    }
});
