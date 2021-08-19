function addTask() {
    
    newTaskBody = document.getElementById('newTask');
    taskText = newTaskBody.value;
    taskList = document.getElementById('to_do_list');

    let newLi = document.createElement('li');
    let newDiv = document.createElement('div')
    let newText = document.createElement('output');

    newText.setAttribute('type', 'text');
    newText.value = taskText;

    newDiv.appendChild(newText);
    newLi.appendChild(newDiv)
    taskList.appendChild(newLi);

    newTaskBody.value = '';

    console.log("Function Complete");
}