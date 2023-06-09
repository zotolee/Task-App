const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners
loadEventListeners = () => {
     // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    // clear task event
    clearBtn.addEventListener('click', clearTasks);
    // filter task event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS
getTasks = () => {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task){
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Create text node and append to li
      li.appendChild(document.createTextNode(task));
      // Create new link element
      const link = document.createElement('a');
      // Add class
      link.className = 'delete-item secondary-content';
      // Add icon html
      link.innerHTML = '<i class="bi bi-x"></i>';
      // Append the link to li
      li.appendChild(link);
  
      // Append li to ul
      taskList.appendChild(li);
    });
  }

//Add task
addTask = (e) => {
    if (taskInput.value === '') {
        alert('This field cannot be empty')
    } else {

// create li
    const li = document.createElement('li');
// Add class
    li.className = 'collection-item';
// create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
// create new link element
    const link = document.createElement('a');
//add class
    link.className = 'delete-item secondary-content';
// add icon html
    link.innerHTML = '<i class="bi bi-x"></i>';
// append link to li
    li.appendChild(link);
    
//append li to ul
    taskList.appendChild(li);

 // Store in LS
 storeTaskInLocalStorage(taskInput.value);

// clear input
    taskInput.value = '';
 e.preventDefault();
    }
};

// Store Task
storeTaskInLocalStorage = (task) => {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.push(task);
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

removeTask = (e) => {
    if(e.target.parentElement.classList.contains
        ('delete-item')) {
            if(confirm('Are you sure')) {
                e.target.parentElement.parentElement.remove();

                 // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
            }
        }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

// CClear tasks
clearTasks = () => {
   // taskList.innerHTML = '';

    // faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
     }

      // Clear from LS
  clearTasksFromLocalStorage();
}

// Clear Tasks from LS
 clearTasksFromLocalStorage = () => {
    localStorage.clear();
  }

//Filter tasks
filterTasks = (e) => {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    ((task) => {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    )
}

loadEventListeners(); 