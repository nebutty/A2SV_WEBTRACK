
window.onload = function () {
    showEmptyMessageIfNeeded(); 
};

function todo() {
    const input = document.getElementById("todolist");
    const taskText = input.value.trim();
    const taskList = document.getElementById("tasklist");

    if (taskText === "") return;

    
    const emptyMsg = document.getElementById("empty-message");
    if (emptyMsg) emptyMsg.remove();

    const li = document.createElement("li");
    li.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";

    const span = document.createElement("span");
    span.textContent = taskText;
    span.className = "task-text";

    checkbox.onchange = function () {
        span.classList.toggle("completed", checkbox.checked);
    };

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "edit-input";
    editInput.style.display = "none";

    editBtn.onclick = function () {
        if (editBtn.textContent === "Edit") {
            editInput.value = span.textContent;
            span.style.display = "none";
            editInput.style.display = "inline-block";
            editBtn.textContent = "Save";
        } else {
            const updated = editInput.value.trim();
            if (updated !== "") {
                span.textContent = updated;
            }
            span.style.display = "inline-block";
            editInput.style.display = "none";
            editBtn.textContent = "Edit";
        }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function () {
        li.remove();
        showEmptyMessageIfNeeded();
    };

    const btnContainer = document.createElement("div");
    btnContainer.className = "btn-container";
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editInput);
    li.appendChild(btnContainer);

    taskList.appendChild(li);
    input.value = "";

    showEmptyMessageIfNeeded();
}

function showEmptyMessageIfNeeded() {
    const taskList = document.getElementById("tasklist");
    const existingMsg = document.getElementById("empty-message");

    
    if (taskList.children.length === 0 && !existingMsg) {
        const msg = document.createElement("p");
        msg.id = "empty-message";
        msg.textContent = "📝 No tasks yet. Add something!";
        msg.style.textAlign = "center";
        msg.style.color = "#777";
        msg.style.marginTop = "20px";
        document.querySelector(".whole").appendChild(msg);
    }

    
    if (taskList.children.length > 0 && existingMsg) {
        existingMsg.remove();
    }
}
