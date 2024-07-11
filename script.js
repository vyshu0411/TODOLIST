
function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('task-list');
        const newTask = document.createElement('li');

        newTask.innerHTML = `
            <span onclick="toggleComplete(this)">${taskText}</span>
            <div class="actions">
                <button class="edit" onclick="editTask(this)"><i class="fas fa-edit"></i></button>
                <button onclick="removeTask(this)"><i class="fas fa-trash"></i></button>
            </div>
        `;

        taskList.appendChild(newTask);
        taskInput.value = '';
    }
}

function toggleComplete(taskElement) {
    taskElement.parentElement.classList.toggle('completed');
}

function removeTask(buttonElement) {
    const taskToRemove = buttonElement.parentElement.parentElement;
    taskToRemove.remove();
}

function editTask(buttonElement) {
    const taskElement = buttonElement.parentElement.previousElementSibling;
    const taskText = taskElement.innerText;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = taskText;
    input.onkeypress = function (event) {
        if (event.key === 'Enter') {
            saveTask(input);
        }
    };

    taskElement.replaceWith(input);
    input.focus();
}

function saveTask(inputElement) {
    const newTaskText = inputElement.value.trim();

    if (newTaskText !== '') {
        const taskElement = document.createElement('span');
        taskElement.innerText = newTaskText;
        taskElement.onclick = function () {
            toggleComplete(taskElement);
        };

        inputElement.replaceWith(taskElement);
    } else {
        inputElement.parentElement.remove();
    }
}