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

export default defineComponent({
  components: { TaskItem, AddTask, EditTask },
  data() {
    return {
      tasks: [] as Task[],               // Aufgabenliste
      selectedTask: null as Task | null, // Aktuell bearbeitete Aufgabe
    };
  },
  methods: {
    addTask(task: Task) {
      this.tasks.push(task);
    },
    deleteTask(id: number) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    openEditTask(task: Task) {
      this.selectedTask = { ...task };
    },
    editTask(updatedTask: Task) {
      const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks.splice(index, 1, updatedTask);
      }
      this.selectedTask = null;
    },
  },
});

</script>
