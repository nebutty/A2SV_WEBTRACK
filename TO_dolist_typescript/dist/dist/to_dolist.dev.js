"use strict";

exports.__esModule = true;

var readline = require("readline");

var todoList = [];
var idCounter = 1;
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log("\n=========================");
  console.log("     TODO LIST ");
  console.log("=========================");
  console.log("1. Show all tasks");
  console.log("2. Add a task");
  console.log("3. Edit a task");
  console.log("4. Delete a task");
  console.log("5. Exit");
  rl.question("Choose an option (1–5): ", handleMenu);
}

function handleMenu(choice) {
  switch (choice.trim()) {
    case "1":
      showTasks();
      break;

    case "2":
      askAddTask();
      break;

    case "3":
      askEditTask();
      break;

    case "4":
      askDeleteTask();
      break;

    case "5":
      console.log("👋 Exiting... Goodbye!");
      rl.close();
      break;

    default:
      console.log("❌ Invalid choice. Try again.");
      showMenu();
  }
}

function showTasks() {
  if (todoList.length === 0) {
    console.log("📭 No tasks found.");
  } else {
    console.log("\n📝 Your Tasks:");
    todoList.forEach(function (item) {
      console.log("ID: " + item.id + " | " + item.task);
    });
  }

  showMenu();
}

function askAddTask() {
  rl.question("Enter new task: ", function (input) {
    var task = input.trim();

    if (!task) {
      console.log("⚠️ Task cannot be empty.");
    } else {
      todoList.push({
        id: idCounter++,
        task: task
      });
      console.log("✅ Task added.");
    }

    showMenu();
  });
}

function askEditTask() {
  rl.question("Enter task ID to edit: ", function (idStr) {
    var id = Number(idStr);
    var task = todoList.find(function (t) {
      return t.id === id;
    });

    if (!task) {
      console.log("❌ Task not found.");
      return showMenu();
    }

    rl.question("Enter new task description: ", function (desc) {
      task.task = desc.trim();
      console.log("✏️ Task updated.");
      showMenu();
    });
  });
}

function askDeleteTask() {
  rl.question("Enter task ID to delete: ", function (idStr) {
    var id = Number(idStr);
    var index = todoList.findIndex(function (t) {
      return t.id === id;
    });

    if (index === -1) {
      console.log("❌ Task not found.");
    } else {
      todoList.splice(index, 1);
      console.log("🗑️ Task deleted.");
    }

    showMenu();
  });
} // Start the loop


showMenu();