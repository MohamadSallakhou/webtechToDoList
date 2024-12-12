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

<script>
import axios from "axios";
import TaskItem from "./TaskItem.vue";
import AddTask from "./AddTask.vue";
import EditTask from "./EditTask.vue";

export default {
  name: "TaskList",
  components: {
    TaskItem,
    AddTask,
    EditTask,
  },
  data() {
    return {
      tasks: [], // Liste aller Aufgaben
      selectedTask: null, // Aktuell bearbeitete Aufgabe
    };
  },
  methods: {
    // Aufgaben abrufen
    async fetchTasks() {
      try {
        const response = await axios.get(
            "https://todolist-zdkp.onrender.com/api/tasks"
        );
        this.tasks = response.data; // Aufgaben in der Liste speichern
      } catch (error) {
        console.error("Fehler beim Abrufen der Aufgaben:", error.message);
      }
    },
    // Neue Aufgabe hinzufügen
    async addTask(task) {
      try {
        const response = await axios.post(
            "https://todolist-zdkp.onrender.com/api/tasks",
            task
        );
        this.tasks.push(response.data); // Aufgabe zur Liste hinzufügen
      } catch (error) {
        console.error("Fehler beim Hinzufügen der Aufgabe:", error.message);
      }
    },
    // Aufgabe löschen
    async deleteTask(taskId) {
      try {
        await axios.delete(
            `https://todolist-zdkp.onrender.com/api/tasks/${taskId}`
        );
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      } catch (error) {
        console.error("Fehler beim Löschen der Aufgabe:", error.message);
      }
    },
    // Aufgabe bearbeiten
    openEditTask(task) {
      this.selectedTask = { ...task }; // Aufgabe für die Bearbeitung auswählen
    },
    // Aufgabe aktualisieren
    async editTask(updatedTask) {
      try {
        const response = await axios.put(
            `https://todolist-zdkp.onrender.com/api/tasks/${updatedTask.id}`,
            updatedTask
        );
        const index = this.tasks.findIndex(
            (task) => task.id === updatedTask.id
        );
        if (index !== -1) {
          this.tasks.splice(index, 1, response.data); // Aufgabe in der Liste aktualisieren
        }
        this.selectedTask = null; // Bearbeitung beenden
      } catch (error) {
        console.error("Fehler beim Bearbeiten der Aufgabe:", error.message);
      }
    },
  },
  mounted() {
    this.fetchTasks(); // Aufgaben beim Laden der Komponente abrufen
  },
};
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
