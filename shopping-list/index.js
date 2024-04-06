const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todo-input');
const form = document.querySelector('form');
const clearButton = document.getElementById('clear-button');

//get todos from local storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];
//update local storage to persist data
function updateLocalStorage() {
   localStorage.setItem('todos', JSON.stringify(todos));
}

//event listeners
//add event listener to add button
form.addEventListener('click', (e) => createTodo(e));
clearButton.addEventListener('click', clearTodos);

todoList.addEventListener('click', (e) => {
   const target = e.target;
   if (target.classList.contains('checkbox')) {
      checkTodos(target);
   }

   if (target.classList.contains('delete-button')) {
      deleteTodo(target);
   }
});

//event actions
function createTodo(e) {
   e.preventDefault();
   const todoText = todoInput.value.trim();
   if (todoText) {
      todos.push({
         id: Date.now(),
         text: todoText,
         completed: false,
      });
      todoInput.value = '';
      renderTodos();
      updateLocalStorage();
   }
}
function deleteTodo(target) {
   const todoId = target.getAttribute('data-id');
   todos = todos.filter((todo) => todo.id != todoId);
   renderTodos();
   updateLocalStorage();
}

function clearTodos() {
   todos = [];
   renderTodos();
   updateLocalStorage();
}

function checkTodos(target) {
   const todoId = target.getAttribute('data-id');
   const todo = todos.find((todo) => todo.id == todoId);
   todo.completed = !todo.completed;
   renderTodos();
   updateLocalStorage();
}

//render todos on screen
function renderTodos() {
   todoList.innerHTML = '';
   todos.map(
      (todo, index) =>
         (todoList.innerHTML += `
         <li class="todo ${todo.completed && 'checked'}" id=${todo.id} >
            <input id=${index} class="checkbox" type="checkbox" ${
            todo.completed ? 'checked' : ''
         } data-id=${todo.id}>
            <label for=${index} class=${todo.completed ? 'checked' : ''}>${todo.text}</label>
            <button class='delete-button' data-id=${todo.id}>Delete</button>
         </li>
      `)
   );
}

renderTodos();
