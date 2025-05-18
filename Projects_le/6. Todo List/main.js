// getting elements from the DOM
let form = document.querySelector("form");
let input = document.querySelector("input");
let todos = document.querySelector(".todos");

// Load todos from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach((todoText) => {
    todos.appendChild(getTodo(todoText));
  });
});

function saveToLocalStorage() {
  let todoTexts = Array.from(todos.children).map(todo =>
    todo.querySelector("span").innerText
  );
  localStorage.setItem("todos", JSON.stringify(todoTexts));
}

function getTodo(value) {
  // Creating New Element
  let todo = document.createElement("div");
  let textEl = document.createElement("span");

  // Setting Value & Style
  textEl.innerText = value;

  // Append our element to the DOM
  todo.appendChild(textEl);

  let closeEl = document.createElement("span");
  closeEl.innerHTML = "X";
  closeEl.classList.add("delete");

  // Attach Events
  closeEl.addEventListener("click", (e) => {
    todos.removeChild(todo);
    saveToLocalStorage(); // Update storage after deletion
  });

  todo.appendChild(closeEl);
  todo.classList.add("todo");
  return todo;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let value = input.value;
  if (!value.trim()) return;
  let todoEl = getTodo(value);
  todos.appendChild(todoEl);
  saveToLocalStorage(); // Save after adding new todo
  input.value = "";
});
