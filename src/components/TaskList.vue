<template>
  <div class="task-list">
    <h2>Meine Aufgaben</h2>

    <!-- Liste der Aufgaben -->
    <ul class="task-items">
      <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @deleteTask="deleteTask"
          @editTask="openEditTask"
      />
    </ul>

    <!-- Bearbeiten einer Aufgabe -->
    <EditTask
        v-if="selectedTask"
        :task="selectedTask"
        @editTask="editTask"
    />

    <!-- Neue Aufgabe hinzufügen -->
    <AddTask @addTask="addTask" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskItem from './TaskItem.vue';
import AddTask from './AddTask.vue';
import EditTask from './EditTask.vue';
import type { Task } from '../types/Task';

export default defineComponent({
  components: {
    TaskItem,
    AddTask,
    EditTask
  },
  data() {
    return {
      tasks: [] as Task[],            // Liste der Aufgaben
      selectedTask: null as Task | null // Für die Bearbeitung ausgewählte Aufgabe
    };
  },
  methods: {
    /**
     * Fügt eine neue Aufgabe zur Liste hinzu.
     * @param {Task} task - Die neue Aufgabe
     */
    addTask(task: Task) {
      const newTask: Task = {
        id: Date.now(),
        name: task.name || 'Neue Aufgabe', // Standardwert für Name
        description: task.description || '', // Optional
        completed: false // Standardstatus
      };
      this.tasks.push(newTask);
    },

    /**
     * Löscht eine Aufgabe anhand der ID.
     * @param {number} id - Die ID der zu löschenden Aufgabe
     */
    deleteTask(id: number) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    },

    /**
     * Öffnet die Bearbeitungsansicht für eine Aufgabe.
     * @param {Task} task - Die zu bearbeitende Aufgabe
     */
    openEditTask(task: Task) {
      this.selectedTask = { ...task }; // Kopie der Aufgabe erstellen
    },

    /**
     * Aktualisiert eine bearbeitete Aufgabe.
     * @param {Task} updatedTask - Die bearbeitete Aufgabe
     */
    editTask(updatedTask: Task) {
      const index = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks.splice(index, 1, updatedTask);
      }
      this.selectedTask = null; // Bearbeitungsansicht schließen
    }
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
  margin: 0;
}
</style>
