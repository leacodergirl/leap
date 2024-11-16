document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const doneTaskList = document.getElementById('doneTaskList');

    function addTask(taskText, done = false) {
        const listItem = document.createElement('li')
        listItem.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            if (done) {
                doneTaskList.removeChild(listItem);
            } else {
                taskList.removeChild(listItem);
            }
            updateLocalStorage();
        });

        

        const doneButton = document.createElement('button');
        doneButton.textContent = 'Done';
        doneButton.classList.add('done-button');
        doneButton.addEventListener('click', () => {
            listItem.classList.toggle('done');
            if(listItem.classList.contains('done')) {
                doneButton.classList.add('done-button-hidden');
                taskList.removeChild(listItem);
                doneTaskList.appendChild(listItem);
            }else{
                doneButton.classList.remove('done-button-hidden');
                doneTaskList.removeChild(listItem);
                taskList.prepend(listItem);
            }
            updateLocalStorage();
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            const newTaskText = prompt('Edit task:', taskText);
            if(newTaskText !== null && newTaskText.trim() !== ''){
                listItem.firstChild.textContent = newTaskText.trim();
                updateLocalStorage();
            }
        });

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        listItem.appendChild(doneButton);

          if (done) {
            listItem.classList.add('done');
            doneButton.classList.add('done-button-hidden');
            doneTaskList.appendChild(listItem);
          }else{
            taskList.appendChild(listItem);
          }

          updateLocalStorage(listItem);
    }

    function updateLocalStorage() {
        const tasks = [];
        document.querySelectorAll('#taskList li, #doneTaskList li').forEach(li => {
            tasks.push({
                text: li.firstChild.textContent.trim(),
                done: li.classList.contains('done')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTask(task.text, task.done);
        });
    }
    // task button

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if(taskText !== '') {
                addTask(taskText);
                taskInput.value = '';
            }
        }
    });
    loadTasks();
});
