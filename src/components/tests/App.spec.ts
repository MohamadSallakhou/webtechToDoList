import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: { template: '<div>Homepage</div>' } },
    { path: '/about', component: { template: '<div>Über uns!</div>' } },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

describe('App.vue', () => {
    it('renders the header with navigation links', async () => {
        const wrapper = mount(App, {
            global: {
                plugins: [router], // Provide the router
            },
        });

        // Wait for the router to be ready
        await router.isReady();

        // Check if the header exists
        const header = wrapper.find('.header');
        expect(header.exists()).toBe(true);

        // Check navigation links
        const navLinks = wrapper.findAll('nav a');
        expect(navLinks.length).toBe(2);
        expect(navLinks[0].text()).toBe('Homepage');
        expect(navLinks[1].text()).toBe('Über uns!');
    });

    it('renders the footer with copyright text', async () => {
        const wrapper = mount(App, {
            global: {
                plugins: [router], // Provide the router
            },
        });

        await router.isReady(); // Ensure the router is initialized

        const footer = wrapper.find('.footer');
        expect(footer.exists()).toBe(true);
        expect(footer.text()).toContain('© 2024 My Vue App');
    });

});
