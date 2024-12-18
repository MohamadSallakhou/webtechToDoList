<template>
  <div class="tasks-view">
    <h1>Tasks Management</h1>
    <p>Verwalten Sie Ihre Aufgaben effizient mit unserer App.</p>
    <hr />

    <!-- Task hinzufügen -->
    <AddTask @addTask="addTask" />

    <!-- Aufgabenliste -->
    <div v-if="tasks.length > 0" class="task-list">
      <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @deleteTask="deleteTask"
          @editTask="selectTaskForEdit"
      />
    </div>
    <p v-else>Keine Aufgaben vorhanden. Fügen Sie eine Aufgabe hinzu!</p>

    <!-- Bearbeiten einer Aufgabe -->
    <EditTask v-if="selectedTask" :task="selectedTask" @editTask="editTask" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import AddTask from '../components/AddTask.vue';
import TaskItem from '../components/TaskItem.vue';
import EditTask from '../components/EditTask.vue';
import type { Task } from '../types/Task';

export default defineComponent({
  name: 'TasksView',
  components: { AddTask, TaskItem, EditTask },
  setup() {
    const apiEndpoint = 'http://localhost:8080/api/tasks'; // Dein Backend-Endpunkt
    const tasks = ref<Task[]>([]);
    const selectedTask = ref<Task | null>(null);

    // Aufgaben vom Backend laden
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>(apiEndpoint);
        tasks.value = response.data;
      } catch (error) {
        console.error('Fehler beim Laden der Aufgaben:', error);
      }
    };

    // Aufgabe hinzufügen
    const addTask = async (task: Task) => {
      try {
        const response = await axios.post<Task>(apiEndpoint, task);
        tasks.value.push(response.data);
      } catch (error) {
        console.error('Fehler beim Hinzufügen der Aufgabe:', error);
      }
    };

    // Aufgabe löschen
    const deleteTask = async (id: number) => {
      try {
        await axios.delete(`${apiEndpoint}/${id}`);
        tasks.value = tasks.value.filter((task) => task.id !== id);
      } catch (error) {
        console.error('Fehler beim Löschen der Aufgabe:', error);
      }
    };

    // Aufgabe zum Bearbeiten auswählen
    const selectTaskForEdit = (task: Task) => {
      selectedTask.value = { ...task }; // Kopie des Tasks für die Bearbeitung
    };

    // Aufgabe bearbeiten
    const editTask = async (updatedTask: Task) => {
      try {
        const response = await axios.put<Task>(
            `${apiEndpoint}/${updatedTask.id}`,
            updatedTask
        );
        const index = tasks.value.findIndex((task) => task.id === updatedTask.id);
        if (index !== -1) {
          tasks.value.splice(index, 1, response.data);
        }
        selectedTask.value = null;
      } catch (error) {
        console.error('Fehler beim Bearbeiten der Aufgabe:', error);
      }
    };

    // Beim Laden der Komponente Aufgaben abrufen
    onMounted(fetchTasks);

    return {
      tasks,
      selectedTask,
      addTask,
      deleteTask,
      selectTaskForEdit,
      editTask
    };
  }
});
</script>

<style scoped>
.tasks-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

.task-list {
  margin-top: 20px;
  list-style: none;
  padding: 0;
}

hr {
  margin: 20px 0;
}
</style>
