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
import AddTask from '../components/AddTask.vue';
import TaskItem from '../components/TaskItem.vue';
import EditTask from '../components/EditTask.vue';
import type { Task } from '@/model/Task';
import axios from 'axios';
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
    async fetchTasks() {
      try {
        const response = await axios.get('https://todolist-zdkp.onrender.com');
        this.tasks = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    deleteTask(taskId: number) {
      console.log(`Delete task with ID: ${taskId}`);
    },
    openEditTask(task: Task) {
      this.selectedTask = task;
    },
    editTask(updatedTask: Task) {
      // Update the task in the list with the edited version
      const index = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks.splice(index, 1, updatedTask);
      }
      this.selectedTask = null; // Close the edit view
    },
    addTask(newTask: Task) {
      this.tasks.push(newTask);
    }
  },
  mounted() {
    this.fetchTasks();
  }
});
</script>

<style scoped>
.task-list {
  margin: 20px;
}
.task-items {
  list-style-type: none;
  padding: 0;
}
</style>
