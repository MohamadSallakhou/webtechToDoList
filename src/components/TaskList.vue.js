import { defineComponent } from 'vue';
import TaskItem from './TaskItem.vue';
import AddTask from './AddTask.vue';
import EditTask from './EditTask.vue';
export default defineComponent({
    components: {
        TaskItem,
        AddTask,
        EditTask
    },
    data() {
        return {
            tasks: [],
            selectedTask: null
        };
    },
    methods: {
        /**
         * Adds a new task to the tasks array
         * @param {Task} task - The task object to add
         */
        addTask(task) {
            this.tasks.push(task);
        },
        /**
         * Deletes a task by its ID
         * @param {number} id - The ID of the task to delete
         */
        deleteTask(id) {
            this.tasks = this.tasks.filter(task => task.id !== id);
        },
        /**
         * Opens the EditTask component by setting the selectedTask
         * @param {Task} task - The task object to edit
         */
        openEditTask(task) {
            this.selectedTask = { ...task };
        },
        /**
         * Updates a task in the tasks array and closes the EditTask component
         * @param {Task} updatedTask - The updated task object
         */
        editTask(updatedTask) {
            const index = this.tasks.findIndex(task => task.id === updatedTask.id);
            if (index !== -1) {
                this.tasks.splice(index, 1, updatedTask);
            }
            this.selectedTask = null;
        }
    }
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{
            TaskItem,
            AddTask,
            EditTask
        },
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("task-list") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("task-items") }, });
    for (const [task] of __VLS_getVForSourceType((__VLS_ctx.tasks))) {
        const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.TaskItem;
        /** @type { [typeof __VLS_components.TaskItem, ] } */
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onDeleteTask': {} }, ...{ 'onEditTask': {} }, key: ((task.id)), task: ((task)), }));
        const __VLS_2 = __VLS_1({ ...{ 'onDeleteTask': {} }, ...{ 'onEditTask': {} }, key: ((task.id)), task: ((task)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        let __VLS_6;
        const __VLS_7 = {
            onDeleteTask: (__VLS_ctx.deleteTask)
        };
        const __VLS_8 = {
            onEditTask: (__VLS_ctx.openEditTask)
        };
        let __VLS_3;
        let __VLS_4;
        var __VLS_5;
    }
    if (__VLS_ctx.selectedTask) {
        const __VLS_9 = __VLS_resolvedLocalAndGlobalComponents.EditTask;
        /** @type { [typeof __VLS_components.EditTask, ] } */
        // @ts-ignore
        const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({ ...{ 'onEditTask': {} }, task: ((__VLS_ctx.selectedTask)), }));
        const __VLS_11 = __VLS_10({ ...{ 'onEditTask': {} }, task: ((__VLS_ctx.selectedTask)), }, ...__VLS_functionalComponentArgsRest(__VLS_10));
        let __VLS_15;
        const __VLS_16 = {
            onEditTask: (__VLS_ctx.editTask)
        };
        let __VLS_12;
        let __VLS_13;
        var __VLS_14;
    }
    const __VLS_17 = __VLS_resolvedLocalAndGlobalComponents.AddTask;
    /** @type { [typeof __VLS_components.AddTask, ] } */
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({ ...{ 'onAddTask': {} }, }));
    const __VLS_19 = __VLS_18({ ...{ 'onAddTask': {} }, }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    let __VLS_23;
    const __VLS_24 = {
        onAddTask: (__VLS_ctx.addTask)
    };
    let __VLS_20;
    let __VLS_21;
    var __VLS_22;
    __VLS_styleScopedClasses['task-list'];
    __VLS_styleScopedClasses['task-items'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
let __VLS_self;
