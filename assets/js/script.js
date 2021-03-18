var tasksToDoEl = document.querySelector('#tasks-to-do');
var formEl = document.querySelector('#task-form');

var createTaskHandler = function(event){
    event.preventDefault();
    var taskItemEl  = document.createElement('li');
    taskItemEl.className = "task-item";
    taskItemEl.textContent = 'this is a new task';
    tasksToDoEl.appendChild(taskItemEl);
}

 formEl.addEventListener('submit', createTaskHandler);