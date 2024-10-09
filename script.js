const inputBox = document.querySelector('input');
const listContainer = document.querySelector('#list-container');
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    if (inputBox.value === "") {
        alert("Enter some Task!");
        return;
    }

    const taskText = inputBox.value;
    const li = document.createElement("li");
    li.innerHTML = `${taskText} <span class="delete">\u00d7</span>`;
    listContainer.appendChild(li);
    inputBox.value = "";

    li.addEventListener("click", () => {
        li.classList.toggle("checked");
        saveTasks();
    });

    li.querySelector('.delete').addEventListener("click", (e) => {
        e.stopPropagation(); 
        listContainer.removeChild(li);
        saveTasks();
    });

    saveTasks();
}


function saveTasks() {
    const tasks = [...listContainer.querySelectorAll('li')].map(li => ({
        text: li.textContent.replace(' \u00d7', ''), 
        checked: li.classList.contains('checked')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `${task.text} <span class="delete">\u00d7</span>`;
        if (task.checked) {
            li.classList.add("checked");
        }
        listContainer.appendChild(li);

        li.addEventListener("click", () => {
            li.classList.toggle("checked");
            saveTasks();
        });

        li.querySelector('.delete').addEventListener("click", (e) => {
            e.stopPropagation(); 
            listContainer.removeChild(li);
            saveTasks();
        });
    });
}
