// Wait for the DOM to load before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Select important elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // remove extra spaces

        // Check if input is empty
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create new list item (li)
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Add event to remove task
        removeBtn.onclick = () => {
            taskList.removeChild(li);
        };

        // Append button to li, then li to list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = '';
    }

    // Add event listener for button click
    addButton.addEventListener('click', addTask);

    // Add event listener for "Enter" key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

});
