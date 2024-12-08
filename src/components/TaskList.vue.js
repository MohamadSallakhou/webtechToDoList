import { defineComponent, onMounted } from 'vue';
import TaskItem from './TaskItem.vue';
import AddTask from './AddTask.vue';
import EditTask from './EditTask.vue';

const BACKEND_URL = 'https://todolist-4-l42u.onrender.com/api/tasks';

export default defineComponent({
    components: {
        TaskItem,
        AddTask,
        EditTask
    },
    data() {
        return {
            tasks: [],
            selectedTask: null
        };
    },
    methods: {
        // Aufgaben abrufen
        async fetchTasks() {
            try {
                const response = await fetch(BACKEND_URL);
                if (!response.ok) {
                    throw new Error('Fehler beim Abrufen der Aufgaben');
                }
                this.tasks = await response.json();
            } catch (error) {
                console.error(error.message);
            }
        },

        // Neue Aufgabe hinzufügen
        async addTask(task) {
            try {
                const response = await fetch(BACKEND_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(task),
                });
                if (!response.ok) {
                    throw new Error('Fehler beim Hinzufügen der Aufgabe');
                }
                const newTask = await response.json();
                this.tasks.push(newTask);
            } catch (error) {
                console.error(error.message);
            }
        },

        // Aufgabe löschen
        async deleteTask(taskId) {
            try {
                const response = await fetch(`${BACKEND_URL}/${taskId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Fehler beim Löschen der Aufgabe');
                }
                this.tasks = this.tasks.filter(task => task.id !== taskId);
            } catch (error) {
                console.error(error.message);
            }
        }
    },
    // Beim Laden der Komponente Aufgaben abrufen
    onMounted() {
        this.fetchTasks();
    }
});
