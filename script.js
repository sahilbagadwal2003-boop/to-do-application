 const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");


// Get todos from localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];


// Display todos when page loads
displayTodos();


// Add Todo
addBtn.addEventListener("click", addTodo);


// Add todo when Enter is pressed
todoInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTodo();
    }

});


// Add Todo Function
function addTodo() {

    const text = todoInput.value.trim();

    // Don't allow empty tasks
    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(todo);

    saveTodos();

    todoInput.value = "";

    displayTodos();
}


// Display Todos
function displayTodos() {

    todoList.innerHTML = "";

    todos.forEach(function(todo) {

        const li = document.createElement("li");

        li.className = "todo-item";

        if (todo.completed) {
            li.classList.add("completed");
        }


        // Checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className = "todo-checkbox";

        checkbox.checked = todo.completed;


        checkbox.addEventListener("change", function() {

            toggleTodo(todo.id);

        });


        // Todo text
        const span = document.createElement("span");

        span.className = "todo-text";

        span.textContent = todo.text;


        // Edit button
        const editButton = document.createElement("button");

        editButton.className = "edit-btn";

        editButton.textContent = "Edit";


        editButton.addEventListener("click", function() {

            editTodo(todo.id);

        });


        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";

        deleteButton.textContent = "Delete";


        deleteButton.addEventListener("click", function() {

            deleteTodo(todo.id);

        });


        // Add elements to li
        li.appendChild(checkbox);

        li.appendChild(span);

        li.appendChild(editButton);

        li.appendChild(deleteButton);


        // Add li to list
        todoList.appendChild(li);

    });


    updateStats();
}


// Complete / Uncomplete Todo
function toggleTodo(id) {

    todos = todos.map(function(todo) {

        if (todo.id === id) {

            todo.completed = !todo.completed;

        }

        return todo;

    });

    saveTodos();

    displayTodos();
}


// Edit Todo
function editTodo(id) {

    const todo = todos.find(function(todo) {

        return todo.id === id;

    });


    const newText = prompt("Edit your task:", todo.text);


    if (newText === null) {
        return;
    }


    const updatedText = newText.trim();


    if (updatedText === "") {

        alert("Task cannot be empty!");

        return;

    }


    todo.text = updatedText;


    saveTodos();

    displayTodos();
}


// Delete Todo
function deleteTodo(id) {

    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (!confirmDelete) {
        return;
    }


    todos = todos.filter(function(todo) {

        return todo.id !== id;

    });


    saveTodos();

    displayTodos();
}


// Save Todos to Local Storage
function saveTodos() {

    localStorage.setItem("todos", JSON.stringify(todos));

}


// Update Statistics
function updateStats() {

    const total = todos.length;

    const completed = todos.filter(function(todo) {

        return todo.completed;

    }).length;


    const pending = total - completed;


    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;

}