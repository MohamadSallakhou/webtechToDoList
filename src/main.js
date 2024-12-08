import './assets/main.css';
import { createApp, ref, onMounted } from 'vue';
import App from './App.vue';
import router from './router';

const BACKEND_URL = 'https://todolist-4-l42u.onrender.com/api/todos';

// To-Do state variable to store the list of tasks
const todos = ref([]); // Using Vue's ref to make it reactive

// Function to get all to-do items from the backend
async function getTodoList() {
    try {
        const response = await fetch(BACKEND_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch to-do list');
        }
        todos.value = await response.json(); // Update 'todos' with fetched data
        console.log('Fetched to-do list:', todos.value);
    } catch (error) {
        console.error('Error fetching to-do list:', error);
    }
}

// Function to add a new to-do item
async function addTodoItem(todoItem) {
    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todoItem),
        });
        if (!response.ok) {
            throw new Error('Failed to add to-do item');
        }
        const newTodo = await response.json();
        todos.value.push(newTodo); // Add the new item to the to-do list
        console.log('New to-do item added:', newTodo);
    } catch (error) {
        console.error('Error adding to-do item:', error);
    }
}

const app = createApp({
    setup() {
        onMounted(() => {
            getTodoList(); // Fetch the tasks when the app is mounted
        });

        // Return the reactive state to use it in the template
        return {
            todos,
            newTodoTitle: ref(''),
            addTodoItem,
        };
    },
    template: `
    <div>
      <h1>To-Do List</h1>
      <ul>
        <li v-for="todo in todos" :key="todo.id">{{ todo.title }}</li>
      </ul>
      <input v-model="newTodoTitle" placeholder="Add a new to-do" />
      <button @click="addTodoItem({ title: newTodoTitle, completed: false })">Add</button>
    </div>
  `,
});

app.use(router);
app.mount('#app');
