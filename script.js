const userNameForm = document.getElementById('username-form');
const mainContent = document.getElementById('main-content');
const usernameBtn = document.getElementById('username-btn');
const usernameInput = document.getElementById('username-input');
const userListsArea = document.getElementById('todo-list-area');
const showUserName = document.getElementById('show-username');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const headerArea = document.getElementById('header-area');
const todoInput = document.getElementById('todo-input');
const todoBtn = document.getElementById('todo-btn');
const lgoOutBtn = document.getElementById('logout-btn');




const showTodo = () => {
    const allTasks = JSON.parse(localStorage.getItem('todos'));
    todoList.innerHTML = "";
    if (allTasks?.length > 0) {
        allTasks.map(task => {
            if (task) {
                const createNewTaskDiv = document.createElement('div');
                createNewTaskDiv.classList.add("border-b", "w-full", "py-2", "flex", "items-center", "px-5", `${task?.done ? 'bg-gray-700' : 'bg-white'}`);

                createNewTaskDiv.innerHTML =
                    `
            <div class="flex-1">
                <h2 class="text-xl ${task?.done ? 'line-through' : ''}"> 
                ${allTasks.indexOf(task) + 1} . ${task?.task}</h2>
                <p class="text-xs">${task?.date}</p>
            </div>
            
            <button class="bg-blue-500 text-white px-4 py-1 rounded-sm hover:bg-blue-600 mr-1" onclick="${task?.done ? `UndoneTodo(this, ${allTasks.indexOf(task)})` : `doneTodo(this, ${allTasks.indexOf(task)})`}">${task?.done ? 'Undone' : 'Done'}</button>
            <button class="bg-blue-500 text-white px-4 py-1 rounded-sm hover:bg-blue-600" onClick="DeleteTodo(this, ${allTasks.indexOf(task)})">Delete</button>
            `;

                todoList.appendChild(createNewTaskDiv);
            }
        });
    } else {
        todoList.innerHTML = `<h2 class="text-2xl text-center">NO TASK ADDED</h2>`;
    }
}





const checkUserSetOrNot = () => {
    if (!localStorage.getItem('username')) {
        userNameForm.classList.remove('justify-center');
        userNameForm.classList.remove('hidden');
        userListsArea.classList.remove('flex-1');
        showUserName.innerText = "";
        todoForm.classList.add('hidden');
        todoList.classList.add('hidden');
        lgoOutBtn.classList.add('hidden');
        headerArea.classList.remove('border-b');
    } else {
        userNameForm.classList.add('justify-center');
        userNameForm.classList.add('hidden');
        userListsArea.classList.add('flex-1');
        showUserName.innerText = localStorage.getItem('username');
        todoForm.classList.remove('hidden');
        todoList.classList.remove('hidden');
        lgoOutBtn.classList.remove('hidden');
        headerArea.classList.add('border-b');
        showTodo();
    }
}

checkUserSetOrNot();


usernameBtn.addEventListener('click', () => {
    if (usernameInput.value.length === 0) {
        usernameInput.classList.add('border-red-100');
    } else {
        usernameInput.classList.remove('border-red-100');
        localStorage.setItem('username', usernameInput.value);
        usernameInput.value = "";
        checkUserSetOrNot();
    }
});

todoBtn.addEventListener('click', () => {
    if (todoInput.value.length === 0) {
        todoInput.classList.add('border-red-600');
    } else {
        const date = new Date();
        const nowDate = `${date.getDate()}/${date.getMonth()}/${date.getYear()}`;
        todoInput.classList.remove('border-red-600');
        const prevTodo = JSON.parse(localStorage.getItem('todos')) ? JSON.parse(localStorage.getItem('todos')) : '';
        const newTask = [...prevTodo, { task: todoInput.value, date: nowDate }];
        localStorage.setItem('todos', JSON.stringify(newTask));
        todoInput.value = "";
        showTodo();

    }
});


const DeleteTodo = (event, index) => {
    const allTasks = JSON.parse(localStorage.getItem('todos'));
    allTasks.splice(index, 1);
    console.log(allTasks);
    todoList.removeChild(event.parentNode);
    localStorage.setItem('todos', JSON.stringify(allTasks));
    showTodo();
}

const doneTodo = (event, index) => {
    const allTasks = JSON.parse(localStorage.getItem('todos'));
    allTasks[index].done = true;
    localStorage.setItem('todos', JSON.stringify(allTasks));
    showTodo();
}
const UndoneTodo = (event, index) => {
    const allTasks = JSON.parse(localStorage.getItem('todos'));
    allTasks[index].done = false;
    localStorage.setItem('todos', JSON.stringify(allTasks));
    showTodo();
}

lgoOutBtn.addEventListener('click', () => {
    const confirmLogout = confirm("By loging out, you're all details we be deleted, even tasks.");
    console.log(confirmLogout);
    if (confirmLogout === true) {
        localStorage.removeItem("username");
        localStorage.removeItem("todos");
        checkUserSetOrNot();
    }
})