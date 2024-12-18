<template>
  <div v-if="localTask" class="edit-task">
    <h3>Aufgabe bearbeiten</h3>
    <input type="text" v-model="localTask.name" class="task-input" />
    <button @click="submitEdit" class="save-button">Speichern</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Task } from '../types/Task';

export default defineComponent({
  name: 'EditTask',
  props: {
    task: {
      type: Object as () => Task,
      required: true
    }
  },
  emits: ['editTask'],
  data() {
    return {
      localTask: { ...this.task } // Lokale Kopie der Prop erstellen
    };
  },
  methods: {
    submitEdit() {
      this.$emit('editTask', this.localTask); // Bearbeitete Kopie zurückgeben
    }
  }
});
</script>

<style scoped>
.edit-task {
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

.save-button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #388e3c;
}
</style>
