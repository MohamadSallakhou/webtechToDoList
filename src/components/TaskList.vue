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
      tasks: [] as Task[],
      selectedTask: null as Task | null
    };
  },
  methods: {
    /**
     * Adds a new task to the tasks array
     * @param {Task} task - The task object to add
     */
    addTask(task: Task) {
      this.tasks.push(task);
    },

    /**
     * Deletes a task by its ID
     * @param {number} id - The ID of the task to delete
     */
    deleteTask(id: number) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    },

    /**
     * Opens the EditTask component by setting the selectedTask
     * @param {Task} task - The task object to edit
     */
    openEditTask(task: Task) {
      this.selectedTask = { ...task };
    },

    /**
     * Updates a task in the tasks array and closes the EditTask component
     * @param {Task} updatedTask - The updated task object
     */
    editTask(updatedTask: Task) {
      const index = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks.splice(index, 1, updatedTask);
      }
      this.selectedTask = null;
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
}
</style>
