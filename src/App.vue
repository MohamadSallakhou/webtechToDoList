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
      <RouterView />
    </main>

    <!-- Full-width Footer -->
    <footer class="footer">
      <p>&copy; 2024 My Vue App</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
/* Full width styling */
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
  justify-content: center; /* Centers content within each half */
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
