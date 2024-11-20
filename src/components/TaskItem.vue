<template>
  <li class="task-item">
    <span>{{ task.name }}</span>
    <div class="buttons">
      <button @click="$emit('editTask', task)" class="edit-button">Bearbeiten</button>
      <button @click="$emit('deleteTask', task.id)" class="delete-button">Löschen</button>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Task } from '../types/Task';

export default defineComponent({
  name: 'TaskItem',
  props: {
    task: {
      type: Object as () => Task,
      required: true
    }
  }
});
</script>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.task-item span {
  flex-grow: 1;
}

.buttons button {
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-button {
  background-color: #4caf50;
  color: #fff;
}

.edit-button:hover {
  background-color: #388e3c;
}

.delete-button {
  background-color: #f44336;
  color: #fff;
}

.delete-button:hover {
  background-color: #f02618;
}
</style>
