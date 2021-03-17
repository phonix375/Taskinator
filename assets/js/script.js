 var buttonEl = document.querySelector('#save-task');
 console.log(buttonEl);

 buttonEl.addEventListener('click', function(){
     var taskItemEl  = document.createElement('li');
     taskItemEl.textContent = 'new task';
     var tasksToDoEl = document.querySelector("#tasks-to-do");
 })