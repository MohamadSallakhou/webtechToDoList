<template>
  <div class="task-list">
    <h2>Meine Aufgaben</h2>
    <ul class="task-items">
      <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @deleteTask="deleteTask"
          @editTask="openEditTask"
      />
    </ul>

    <!-- EditTask anzeigen, wenn eine Aufgabe bearbeitet wird -->
    <EditTask v-if="selectedTask" :task="selectedTask" @editTask="editTask" />

    <!-- AddTask zum Hinzufügen einer neuen Aufgabe -->
    <AddTask @addTask="addTask" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AddTask from '../components/AddTask.vue';
import TaskItem from '../components/TaskItem.vue';
import EditTask from '../components/EditTask.vue';
import type { Task } from '@/model/Task';
import axios from 'axios';

const apiEndpoint = 'https://example.com/api/tasks'; // Backend-URL anpassen

export default defineComponent({
  components: { TaskItem, AddTask, EditTask },
  data() {
    return {
      tasks: [] as Task[],               // Aufgabenliste
      selectedTask: null as Task | null, // Aktuell bearbeitete Aufgabe
    };
  },
  created() {
    this.fetchTasks(); // Aufgaben beim Laden der Komponente abrufen
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get<Task[]>(apiEndpoint); // Typ Task[]
        this.tasks = response.data;
      } catch (error) {
        console.error('Fehler beim Laden der Aufgaben:', error);
      }
    },
    async addTask(inputData: { value: string }) {
      try {
        const response = await axios.post<Task>(apiEndpoint, { name: inputData.value }); // Payload { name: ... }
        this.tasks.push(response.data);
      } catch (error) {
        console.error('Fehler beim Hinzufügen der Aufgabe:', error);
      }
    },
    async deleteTask(id: number) {
      try {
        const response = await axios.delete(`${apiEndpoint}/${id}`); // DELETE-Endpunkt
        console.log('Aufgabe gelöscht:', response.data);
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } catch (error) {
        console.error('Fehler beim Löschen der Aufgabe:', error);
      }
    },
    openEditTask(task: Task) {
      this.selectedTask = { ...task };
    },
    async editTask(updatedTask: Task) {
      try {
        const response = await axios.put(`${apiEndpoint}/${updatedTask.id}`, updatedTask);
        const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
        if (index !== -1) {
          this.tasks.splice(index, 1, response.data);
        }
        this.selectedTask = null;
      } catch (error) {
        console.error('Fehler beim Bearbeiten der Aufgabe:', error);
      }
    },
  },
});
</script>
