/* ========================================== */
/* DAY 20: STATEFUL UI ARCHITECTURE           */
/* ========================================== */

// 1. GLOBAL STATE ARRAY
// This acts as our temporary client-side data center
let taskState = [];

// DOM Element Selection
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskListContainer = document.getElementById('task-list');

// 2. THE MASTER RENDER FUNCTION
// Responsible for explicitly painting the UI state
function renderTasks() {
    if (!taskListContainer) return;
    
    // Clear out the view layer entirely before drawing
    taskListContainer.innerHTML = '';
    
    // Build the dynamic DOM layout from state data
    taskState.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" class="toggle-check" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
            <span>${task.text}</span>
            <button class="delete-btn" data-id="${task.id}">&times;</button>
        `;
        
        taskListContainer.appendChild(li);
    });
}

// 3. LOGIC PIPELINE: CREATE
if (addTaskBtn && taskInput) {
    addTaskBtn.addEventListener('click', () => {
        const textValue = taskInput.value.trim();
        if (textValue === '') return;
        
        // Structure the state object payload
        const newTask = {
            id: Date.now(), // Unique numeric timestamp ID
            text: textValue,
            completed: false
        };
        taskState.push(newTask);
        // Clean up inputs and sync the view
        taskInput.value = '';
        renderTasks();
    });
}

// 4. LOGIC PIPELINE: UPDATE & DELETE (EVENT DELEGATION)
if (taskListContainer) {
    taskListContainer.addEventListener('click', (e) => {
        // Parse out the target ID from the data attribute (convert string to number)
        const targetId = Number(e.target.getAttribute('data-id'));
        if (!targetId) return;
        
        // Check A: Is it a Delete Button?
        if (e.target.classList.contains('delete-btn')) {
            taskState = taskState.filter(task => task.id !== targetId);
        }
        
        // Check B: Is it a Checkbox toggle?
       if (e.target.classList.contains('toggle-check')) {
            const foundTask = taskState.find(task => task.id === targetId);

            if (foundTask) {
                foundTask.completed = !foundTask.completed;
             }

        }
        
        // Always sync the interface with your state modification!
        renderTasks();
    });
}