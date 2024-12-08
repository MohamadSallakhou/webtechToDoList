<template>
  <div class="task-list">
    <h2>Meine Aufgaben</h2>
    <ul class="task-items">
      <!-- Render each task using the TaskItem component -->
      <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @deleteTask="deleteTask"
          @editTask="openEditTask"
      />
    </ul>

    <!-- Render the EditTask component when a task is selected for editing -->
    <EditTask v-if="selectedTask" :task="selectedTask" @editTask="editTask" />

    <!-- Render the AddTask component for adding a new task -->
    <AddTask @addTask="addTask" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import TaskItem from './TaskItem.vue';
import AddTask from './AddTask.vue';
import EditTask from './EditTask.vue';
import type { Task } from '../types/Task';

const BACKEND_URL = 'http://localhost:8080/api/tasks'; // Passe die URL an dein Backend an

export default defineComponent({
  components: {
    TaskItem,
    AddTask,
    EditTask
  },
  data() {
    return {
      tasks: [] as Task[],
      selectedTask: null as Task | null
    };
  },
  methods: {
    /**
     * Lädt Aufgaben vom Backend
     */
    async fetchTasks() {
      try {
        const response = await axios.get(BACKEND_URL);
        this.tasks = response.data;
      } catch (error) {
        console.error('Fehler beim Laden der Aufgaben:', error);
      }
    },

    /**
     * Fügt eine neue Aufgabe hinzu und sendet sie ans Backend
     * @param {Task} task - Die hinzuzufügende Aufgabe
     */
    async addTask(task: Task) {
      try {
        const response = await axios.post(BACKEND_URL, task);
        this.tasks.push(response.data);
      } catch (error) {
        console.error('Fehler beim Hinzufügen der Aufgabe:', error);
      }
    },

    /**
     * Löscht eine Aufgabe nach ihrer ID und entfernt sie vom Backend
     * @param {number} id - Die ID der zu löschenden Aufgabe
     */
    async deleteTask(id: number) {
      try {
        await axios.delete(`${BACKEND_URL}/${id}`);
        this.tasks = this.tasks.filter(task => task.id !== id);
      } catch (error) {
        console.error('Fehler beim Löschen der Aufgabe:', error);
      }
    },

    /**
     * Öffnet das EditTask-Formular, indem die ausgewählte Aufgabe gesetzt wird
     * @param {Task} task - Die zu bearbeitende Aufgabe
     */
    openEditTask(task: Task) {
      this.selectedTask = { ...task };
    },

    /**
     * Aktualisiert eine Aufgabe und synchronisiert sie mit dem Backend
     * @param {Task} updatedTask - Die aktualisierte Aufgabe
     */
    async editTask(updatedTask: Task) {
      try {
        const response = await axios.put(`${BACKEND_URL}/${updatedTask.id}`, updatedTask);
        const index = this.tasks.findIndex(task => task.id === updatedTask.id);
        if (index !== -1) {
          this.tasks.splice(index, 1, response.data);
        }
        this.selectedTask = null;
      } catch (error) {
        console.error('Fehler beim Bearbeiten der Aufgabe:', error);
      }
    }
  },
  mounted() {
    this.fetchTasks(); // Lädt Aufgaben beim Mounten der Komponente
  }
});
</script>

<style scoped>
.task-list {
  max-width: 70%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
}

.task-items {
  list-style: none;
  padding: 0;
}
</style>
