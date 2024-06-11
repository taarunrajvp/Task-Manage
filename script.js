// frontend/script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    const taskForm = document.getElementById('taskForm');

    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;

        const response = await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, category })
        });

        if (response.ok) {
            const newTask = await response.json();
            appendTask(newTask);
            taskForm.reset();
        }
    });

    async function getTasks() {
        const response = await fetch('http://localhost:3000/api/tasks');
        const tasks = await response.json();
        tasks.forEach(task => appendTask(task));
    }

    function appendTask(task) {
        const taskItem = document.createElement('div');
        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p><strong>Category:</strong> ${task.category}</p>
            <hr>
        `;
        taskList.appendChild(taskItem);
    }

    getTasks();
});
