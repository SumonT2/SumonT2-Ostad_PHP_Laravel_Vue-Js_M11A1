document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const todoForm = document.getElementById('todo-form');
    const todoList = document.getElementById('todo-list');
    let todos = [];
    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            const todoText = document.createElement('span');
            todoText.textContent = todo;
            todoText.contentEditable = false;
            todoText.className = 'todo-text';
            const editBtn = document.createElement('button');
            editBtn.className = 'btn btn-warning btn-sm me-2';
            editBtn.textContent = 'Edit';
            editBtn.onclick = () => {
                todoText.contentEditable = true;
                todoText.focus();
                editBtn.style.display = 'none';
                saveBtn.style.display = 'inline-block';
            };
            const saveBtn = document.createElement('button');
            saveBtn.className = 'btn btn-success btn-sm me-2';
            saveBtn.textContent = 'Save';
            saveBtn.style.display = 'none';
            saveBtn.onclick = () => {
                todoText.contentEditable = false;
                todos[index] = todoText.textContent.trim() || todo;
                saveBtn.style.display = 'none';
                editBtn.style.display = 'inline-block';
                renderTodos();
            };

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger btn-sm';
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => deleteTodo(index);
            const buttonGroup = document.createElement('div');
            buttonGroup.className = 'btn-group';
            buttonGroup.appendChild(editBtn);
            buttonGroup.appendChild(saveBtn);
            buttonGroup.appendChild(deleteBtn);
            li.appendChild(todoText);
            li.appendChild(buttonGroup);
            todoList.appendChild(li);
        });
    }

    function addTodo(event) {
        event.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            todos.push(todoText);
            todoInput.value = '';
            renderTodos();
        }
    }
    function deleteTodo(index) {
        todos.splice(index, 1);
        renderTodos();
    }
    todoForm.addEventListener('submit', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.form) {
            todoForm.dispatchEvent(new Event('submit'));
        }
    });

    renderTodos();
});