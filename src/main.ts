import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

// Setze die Basis-URL für Axios
// axios.defaults.baseURL = 'http://localhost:8080/api'; // Ändere dies später auf die Render-Backend-URL
axios.defaults.baseURL = 'https://todolist-zdkp.onrender.com/api'; // Ändere dies später auf die Render-Backend-URL

// Optional: Axios global in der App verfügbar machen
const app = createApp(App);

app.config.globalProperties.$axios = axios; // Dadurch kannst du Axios in jeder Komponente als this.$axios nutzen

app.use(router);
app.mount('#app');
