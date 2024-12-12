<template>
  <div class="task-list">
    <h2>Aufgabenliste</h2>
    <ul class="task-items">
      <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @deleteTask="deleteTask"
          @editTask="openEditTask"
      />
    </ul>
    <AddTask @addTask="addTask" />
    <EditTask v-if="selectedTask" :task="selectedTask" @editTask="editTask" />
  </div>
</template>
<script lang="ts">

import TaskItem from './TaskItem.vue';
import AddTask from './AddTask.vue';
import EditTask from './EditTask.vue';
import { Task } from '../types/Task'; // Importiere das Interface

const BACKEND_URL = 'https://todolist-zdkp.onrender.com/api/tasks';

export default defineComponent({
  components: {
    TaskItem,
    AddTask,
    EditTask,
  },
  data() {
    return {
      tasks: [] as Task[], // Typisierte Liste
      selectedTask: null as Task | null, // Aktuell bearbeitete Aufgabe
    };
  },
  methods: {
    async fetchTasks(): Promise<void> {
      try {
        const response = await axios.get<Task[]>(BACKEND_URL);
        this.tasks = response.data;
      } catch (error) {
        console.error('Fehler beim Abrufen der Aufgaben:', error.message);
      }
    },
    async addTask(task: Task): Promise<void> {
      try {
        const response = await axios.post<Task>(BACKEND_URL, task);
        this.tasks.push(response.data);
      } catch (error) {
        console.error('Fehler beim Hinzufügen der Aufgabe:', error.message);
      }
    },
    async deleteTask(taskId: number): Promise<void> {
      try {
        await axios.delete(`${BACKEND_URL}/${taskId}`);
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      } catch (error) {
        console.error('Fehler beim Löschen der Aufgabe:', error.message);
      }
    },
    openEditTask(task: Task): void {
      this.selectedTask = { ...task };
    },
    async editTask(updatedTask: Task): Promise<void> {
      try {
        const response = await axios.put<Task>(
            `${BACKEND_URL}/${updatedTask.id}`,
            updatedTask
        );
        const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
        if (index !== -1) {
          this.tasks.splice(index, 1, response.data);
        }
        this.selectedTask = null;
      } catch (error) {
        console.error('Fehler beim Bearbeiten der Aufgabe:', error.message);
      }
    },
  },
  mounted() {
    this.fetchTasks();
  },
});
</script>


<style scoped>
.task-list {
  width: 50%;
  margin: 0 auto;
}
.task-items {
  list-style-type: none;
  padding: 0;
}
</style>
