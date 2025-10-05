// 🧠 Wait for the DOM to fully load before running JS
document.addEventListener('DOMContentLoaded', () => {
    // 🎯 Select important DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // 📝 Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get input text & remove spaces

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove task when the button is clicked
        removeBtn.onclick = () => {
            taskList.removeChild(li);
        };

        // Append the button and the task to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
    }

    // 🖱 Add task when clicking the "Add Task" button
    addButton.addEventListener('click', addTask);

    // ⌨️ Add task when pressing "Enter"
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
