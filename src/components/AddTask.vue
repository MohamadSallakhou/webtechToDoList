<template>
  <div class="add-task">
    <h3>Neue Aufgabe hinzufügen</h3>
    <input
        type="text"
        v-model="taskName"
        placeholder="Aufgabenname"
        class="task-input"
    />
    <button @click="submitTask" class="add-button">Hinzufügen</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'AddTask',
  emits: ['addTask'],
  setup(_, { emit }) {
    // Define TaskName as a ref variable of type `string`
    const taskName = ref<string>('');

    const submitTask = () => {
      if (taskName.value.trim()) {
        // Add task and emit event
        emit('addTask', { id: Date.now(), name: taskName.value });
        taskName.value = ''; // Reset input
      }
    };

    return {
      taskName,
      submitTask
    };
  }
});
</script>

<style scoped>
.add-task {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.task-input {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  max-width: 400px;
}

.add-button {
  padding: 8px 16px;
  background-color: #2196f3;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #1976d2;
}
</style>
