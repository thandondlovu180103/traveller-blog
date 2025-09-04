document.getElementById("commentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const comment = document.getElementById("comment").value.trim();

  if (name && comment) {
    const commentData = {
      name,
      comment,
      timestamp: new Date().toISOString()
    };

    const comments = JSON.parse(localStorage.getItem("comments") || "[]");
    comments.push(commentData);
    localStorage.setItem("comments", JSON.stringify(comments));

    displayComments();
    this.reset();
  }
});

function displayComments() {
  const commentsList = document.getElementById("commentsList");
  commentsList.innerHTML = "";

  const comments = JSON.parse(localStorage.getItem("comments") || "[]");

  comments.forEach((data, index) => {
    const commentBox = document.createElement("div");
    commentBox.className = "comment fade-in";

    const nameEl = document.createElement("strong");
    nameEl.textContent = data.name;

    const textEl = document.createElement("p");
    textEl.textContent = data.comment;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      comments.splice(index, 1);
      localStorage.setItem("comments", JSON.stringify(comments));
      displayComments();
    });

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit Comment";
    editBtn.addEventListener("click", () => {
      const newComment = prompt("Edit your comment:", data.comment);
      if (newComment !== null && newComment.trim() !== "") {
        comments[index].comment = newComment.trim();
        localStorage.setItem("comments", JSON.stringify(comments));
        displayComments();
      }
    });

    commentBox.appendChild(nameEl);
    commentBox.appendChild(textEl);
    commentBox.appendChild(editBtn);
    commentBox.appendChild(deleteBtn);

    commentsList.appendChild(commentBox);
  });
}

// Load comments on page load
window.addEventListener("DOMContentLoaded", displayComments);
