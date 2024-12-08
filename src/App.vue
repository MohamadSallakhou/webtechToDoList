<template>
  <div class="app">
    <!-- Full-width Header -->
    <header class="header">
      <div class="logo-container">
        <img alt="ToDo List" class="logo" src="@/assets/checklist.png" width="75" height="75" />
      </div>

      <div class="nav-container">
        <nav>
          <!-- Links to Home and About pages -->
          <RouterLink to="/" active-class="active-link">Homepage</RouterLink>
          <RouterLink to="/about" active-class="active-link">Über uns!</RouterLink>
        </nav>
      </div>
    </header>

    <!-- Main content view -->
    <main>
      <div>
        <h1>ToDo Liste</h1>
        <!-- Zeige alle Aufgaben -->
        <ul>
          <li v-for="task in tasks" :key="task.id">
            {{ task.description }} - {{ task.completed ? "Erledigt" : "Offen" }}
            <button @click="deleteTask(task.id)">Löschen</button>
          </li>
        </ul>
        <!-- Formular zum Hinzufügen neuer Aufgaben -->
        <input v-model="newTask" placeholder="Neue Aufgabe hinzufügen" />
        <button @click="addTask">Hinzufügen</button>
      </div>
    </main>

    <!-- Full-width Footer -->
    <footer class="footer">
      <p>&copy; 2024 My Vue App</p>
    </footer>
  </div>
</template>

<script setup lang="ts">


// Daten und Methoden
const tasks = ref([]);
const newTask = ref("");

// Aufgaben aus dem Backend laden
const fetchTasks = async () => {
  try {
    const response = await axios.get('/tasks');
    tasks.value = response.data;
  } catch (error) {
    console.error('Fehler beim Laden der Aufgaben:', error);
  }
};

// Neue Aufgabe hinzufügen
const addTask = async () => {
  if (newTask.value.trim() === '') return;

  try {
    const response = await axios.post('/tasks', {
      description: newTask.value,
      completed: false,
    });
    tasks.value.push(response.data);
    newTask.value = ''; // Eingabefeld leeren
  } catch (error) {
    console.error('Fehler beim Hinzufügen der Aufgabe:', error);
  }
};

// Aufgabe löschen
const deleteTask = async (id) => {
  try {
    await axios.delete(`/tasks/${id}`);
    tasks.value = tasks.value.filter((task) => task.id !== id);
  } catch (error) {
    console.error('Fehler beim Löschen der Aufgabe:', error);
  }
};

// Aufgaben beim Laden der Komponente abrufen
onMounted(() => {
  fetchTasks();
});
</script>

<style scoped>
/* Dein bestehendes Styling bleibt unverändert */
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header, .footer {
  width: 100%;
  background-color: #333;
  color: #fff;
  padding: 1rem 0;
}

.header {
  display: flex;
  align-items: center;
  line-height: 1.5;
  margin-bottom: 5%;
}

/* Centered containers for logo and navigation */
.logo-container,
.nav-container {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Logo styling */
.logo {
  margin: 0;
  animation: combined-animation 3s ease-in-out infinite;
}

@keyframes combined-animation {
  0% {
    transform: scale(0.7);
    opacity: 1;
  }
  50% {
    transform: scale(0.9);
    opacity: 0.7;
  }
  100% {
    transform: scale(0.7);
    opacity: 1;
  }
}

/* Navigation styling */
.nav-container nav {
  font-size: 1rem;
}

nav a.router-link-exact-active {
  color: #f0f0f0;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

/* Custom active link class styling */
nav a.active-link {
  color: hsla(160, 100%, 37%, 1);
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  color: #f0f0f0;
  text-decoration: none;
}

nav a:first-of-type {
  border: none;
}

/* Footer styling */
.footer {
  background-color: #222;
  color: #ccc;
  padding: 1rem 0;
  text-align: center;
  margin-top: auto;
}

/* Responsive styling for larger screens */
@media (min-width: 1024px) {
  .header {
    padding: 0 2rem;
  }
}
</style>
