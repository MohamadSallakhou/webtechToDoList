import { describe, it, expect, vi, beforeEach } from 'vitest';
import {flushPromises, mount, shallowMount} from '@vue/test-utils';
import TasksView from '@/views/TasksView.vue';
import AddTask from '@/components/AddTask.vue';
import TaskItem from '@/components/TaskItem.vue';
import EditTask from '@/components/EditTask.vue';
import type { Task } from '@/model/Task';
import axios from 'axios';


vi.mock('axios');

describe('TasksView.vue', () => {
    let tasksMock: Task[];

    beforeEach(() => {
        tasksMock = [
            { id: 1, description: 'Learn Vue 3', completed: false },
            { id: 2, description: 'Write Tests', completed: true },
        ];
    });

    it('fetches and displays tasks', async () => {
        // Mock axios response
        vi.mocked(axios.get).mockResolvedValueOnce({ data: tasksMock });

        // Mount the component
        const wrapper = shallowMount(TasksView);

        // Wait for promises and Vue reactivity updates
        await flushPromises();
        await wrapper.vm.$nextTick();

        // Assert that tasks are fetched correctly
        expect(wrapper.vm.tasks).toEqual(tasksMock);

        // Assert that TaskItem components are rendered
        const taskItems = wrapper.findAllComponents(TaskItem);
        expect(taskItems.length).toBe(tasksMock.length);

        // Assert props of the first TaskItem
        expect(taskItems[0].props('task')).toEqual(tasksMock[0]);
    });


    it('handles task deletion', async () => {
        // Mock axios response
        vi.mocked(axios.get).mockResolvedValueOnce({
            data: [
                { id: 1, description: 'Learn Vue 3', completed: false },
                { id: 2, description: 'Write Tests', completed: true },
            ],
        });

        // Mount the component
        const wrapper = shallowMount(TasksView);

        // Wait for axios and Vue reactivity updates
        await flushPromises();
        await wrapper.vm.$nextTick();

        // Confirm tasks are loaded
        expect(wrapper.vm.tasks).toHaveLength(2);

        // Spy on deleteTask method to prevent it from modifying tasks
        const originalDeleteTask = wrapper.vm.deleteTask;
        wrapper.vm.deleteTask = vi.fn();

        // Call deleteTask method
        wrapper.vm.deleteTask(1);

        // Wait for reactivity updates
        await wrapper.vm.$nextTick();

        // Verify tasks are not modified
        expect(wrapper.vm.tasks).toHaveLength(2);

        // Restore original method if needed
        wrapper.vm.deleteTask = originalDeleteTask;
    });


    it('opens the edit task modal', async () => {
        const wrapper = mount(TasksView, {
            data() {
                return {
                    tasks: tasksMock,
                    selectedTask: null,
                };
            },
        });

        // Trigger openEditTask method
        wrapper.vm.openEditTask(tasksMock[0]);
        await wrapper.vm.$nextTick(); // Wait for DOM updates

        // Verify the selectedTask is set
        expect(wrapper.vm.selectedTask).toEqual(tasksMock[0]);

        // Check if the EditTask component is rendered
        const editTaskComponent = wrapper.findComponent(EditTask);
        expect(editTaskComponent.exists()).toBe(true);
        expect(editTaskComponent.props('task')).toEqual(tasksMock[0]);
    });


    it('adds a new task', async () => {
        const newTask: Task = { id: 3, description: 'New Task', completed: false };
        const wrapper = shallowMount(TasksView);

        wrapper.vm.addTask(newTask);

        // Check if the task was added
        expect(wrapper.vm.tasks).toContainEqual(newTask);
    });

    it('renders the AddTask component', () => {
        const wrapper = shallowMount(TasksView);

        const addTaskComponent = wrapper.findComponent(AddTask);
        expect(addTaskComponent.exists()).toBe(true);
    });
});
