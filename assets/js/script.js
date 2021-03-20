var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector('#page-content');
var taskInProgressEl = document.querySelector('#tasks-in-progress');
var taskCompleted = document.querySelector("#tasks-completed");
var tasks = [];

var completeEditTask = function(taskName, taskType, taskId){
    //find the maching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId + "']");

    //set new values
    taskSelected.querySelector('h3.task-name').textContent = taskName;
    taskSelected.querySelector('span.task-type').textContent = taskType;

    //loop through tasks arry and task object with new content
    for (var i = 0; i < tasks.length; i++ ){
        if(tasks[i].id === parseInt(taskId)){
            tasks[i].name = taskName;
            tasks[i].type=taskType;
        }
    }
    alert('task updated!');
    formEl.removeAttribute("data-task-id");
    document.querySelector('#save-task').textContent = "Add Task";
}

var taskFormHandler = function (event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if(!taskNameInput || !taskTypeInput){
        alert('You need to fill out the task form!');
        return false;
    }
    formEl.reset();

    isEdit = formEl.hasAttribute("data-task-id");

    // has data attribute, so get task id and call function to complete edit process
    if(isEdit){
        var taskId = formEl.getAttribute('data-task-id');
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    //no data attribute, so create object as normal and pass to createtaskEL function
    else{
        // package up data as an object
        var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status:"to do"
    };
        // send it as an argument to createTaskEl
        createTaskEl(taskDataObj);
    }
};

var createTaskActions = function(taskId){
    var actionContainerEl  = document.createElement('div');
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    //adding the select to task
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    
    var statusChoices = ["To do", "In Progress", "Completed"];
    for(var i = 0 ; i< statusChoices.length; i++){
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};
var createTaskEl = function (taskDataObj) {
    
    //test print
    console.log(taskDataObj);

    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //add task id as a custon attribute
    listItemEl.setAttribute('data-task-id', taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionEl);
    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    //add to the arry of tasks
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);


    //increase task counter for next unique id
    taskIdCounter++;
};

var editTask = function(taskId){
    console.log("editing task " + taskId);
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']")

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);
    
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector('#save-task').textContent = 'save Task';
    formEl.setAttribute("data-task-id", taskId);
};

var deleteTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']")
    taskSelected.remove();

    var updatedTaskArr = [];

    //loop over current task
    for(var i= 0 ; i < tasks.length; i ++){
        //if task[i].id doesn't match the calue of taskID, lets keep that task
        if(tasks[i].id !== parseInt(taskId)){
            updatedTaskArr.push(tasks[i]);
        }
    }

    //ressugb tasj array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
}
var taskButtonHandler = function(event) {
    // if delete button was clicked
    if(event.target.matches(".delete-btn")){
        // get the element ID
        var taskID = event.target.getAttribute("data-task-id")
        deleteTask(taskID);
    }
    else if(event.target.matches(".edit-btn")){
        var taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);
    }
  };
var taskStatusChangeHandler = function(event){
    //gets the id of the selected item
    var taskId = event.target.getAttribute("data-task-id");

    //get the currenly selected option's value and convert to lowecase
    var statusValue = event.target.value.toLowerCase();

    //find the parent taskitem element based on  the id
    var taskSelected = document.querySelector(".task-item[data-task-id='"+ taskId +  "']");
    
    //move to the corect list
    if(statusValue === "to do"){
        tasksToDoEl.appendChild(taskSelected);
    }
    else if(statusValue === "in progress"){
        taskInProgressEl.appendChild(taskSelected);
    }
    else if(statusValue === "completed"){
        taskCompleted.appendChild(taskSelected);
    }

    //update task's in tasks arry
    for(var i = 0; i< tasks.length;i++){
        if(tasks[i].id === parseInt(taskId)){
            tasks[i].status = statusValue;
        }
    }
    
}



formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener('click', taskButtonHandler);
pageContentEl.addEventListener('change', taskStatusChangeHandler);