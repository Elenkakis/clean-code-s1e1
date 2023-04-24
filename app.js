//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.
//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.
// Event handling, user interaction is what starts the code execution.

let taskInput=document.getElementById("new-task");
let addButton=document.getElementById("add-btn");
let incompleteTaskHolder=document.getElementById("incompleteTasks");//ul of #incompleteTasks
let completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
let createNewTaskElement = function(taskString) {

    let listItem = document.createElement("li");

    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.toggle("list__box");

    let label = document.createElement("label");
    label.innerText = taskString;
    label.className = "task task-name";

    let editInput = document.createElement("input");
    editInput.type="text";
    editInput.className="task user-task";

    let editButton = document.createElement("button");
    editButton.innerText="Edit"; 
    editButton.className="edit";

    let deleteButtonImg = document.createElement("img");
    deleteButtonImg.className = "btn__remove";
    deleteButtonImg.alt = "remove sign";
  

    let deleteButton = document.createElement("button");
    deleteButton.className = "delete";    
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

let addTask = function(){
    console.log("Add Task...");

    if (!taskInput.value) return;
    let listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

//Edit an existing task.
let editTask = function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    let listItem = this.parentNode;
    let editInput = listItem.querySelector(".user-task");
    let label = listItem.querySelector(".task-name");
    let editBtn = listItem.querySelector(".edit");
    let containsClass = label.classList.contains("task-name__edit");
    
    if(containsClass){

        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    }else{
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }   
    label.classList.toggle("task-name__edit");
    editInput.classList.toggle("user-task__edit");    
}
//Delete task.
let deleteTask = function(){
    console.log("Delete Task...");
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
}
//Mark task completed
let taskCompleted = function() {
    console.log("Complete Task...");
    
    let listItem = this.parentNode;
    let editInput = listItem.querySelector(".task-name");

    completedTasksHolder.appendChild(listItem);
    editInput.classList.toggle("done-task"); 
    bindTaskEvents(listItem, taskIncomplete);
}

let taskIncomplete = function(){

    console.log("Incomplete Task...");
    let listItem = this.parentNode;
    let editInput = listItem.querySelector(".task-name");

    incompleteTaskHolder.appendChild(listItem);
    editInput.classList.toggle("done-task"); 
    bindTaskEvents(listItem, taskCompleted);
}

let ajaxRequest = function() {
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


let bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    let checkBox = taskListItem.querySelector(".list__box");
    let editButton = taskListItem.querySelector(".edit");
    let deleteButton = taskListItem.querySelector(".delete");
    
    editButton.onclick = editTask;   
    deleteButton.onclick = deleteTask;    
    checkBox.onchange = checkBoxEventHandler;
}

for (let i=0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i=0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
