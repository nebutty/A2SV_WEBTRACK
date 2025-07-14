import * as readline from "readline";

interface TodoItem {
  id: number;
  task: string;
}

let todoList: TodoItem[] = [];
let idCounter = 1;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu(): void {
  console.log("\n=========================");
  console.log("     TODO LIST MENU");
  console.log("=========================");
  console.log("1. Show all tasks");
  console.log("2. Add a task");
  console.log("3. Edit a task");
  console.log("4. Delete a task");
  console.log("5. Exit");
  rl.question("Choose an option (1–5): ", handleMenu);
}

function handleMenu(choice: string): void {
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

function showTasks(): void {
  if (todoList.length === 0) {
    console.log("📭 No tasks found.");
  } else {
    console.log("\n📝 Your Tasks:");
    todoList.forEach((item) => {
      console.log(`ID: ${item.id} | ${item.task}`);
    });
  }
  showMenu();
}

function askAddTask(): void {
  rl.question("Enter new task: ", (input) => {
    const task = input.trim();
    if (!task) {
      console.log("⚠️ Task cannot be empty.");
    } else {
      todoList.push({ id: idCounter++, task });
      console.log("✅ Task added.");
    }
    showMenu();
  });
}

function askEditTask(): void {
  rl.question("Enter task ID to edit: ", (idStr) => {
    const id = Number(idStr);
    const task = todoList.find((t) => t.id === id);
    if (!task) {
      console.log("❌ Task not found.");
      return showMenu();
    }
    rl.question("Enter new task description: ", (desc) => {
      task.task = desc.trim();
      console.log("✏️ Task updated.");
      showMenu();
    });
  });
}

function askDeleteTask(): void {
  rl.question("Enter task ID to delete: ", (idStr) => {
    const id = Number(idStr);
    const index = todoList.findIndex((t) => t.id === id);
    if (index === -1) {
      console.log("❌ Task not found.");
    } else {
      todoList.splice(index, 1);
      console.log("🗑️ Task deleted.");
    }
    showMenu();
  });
}

// Start the loop
showMenu();
