import { defineComponent, ref } from 'vue';
import type { Task } from '@/model/Task';

export default defineComponent({
    name: 'AddTask',
    emits: ['addTask'],
    setup(_, { emit }) {
        const taskName = ref<string>('');

        const submitTask = () => {
            if (taskName.value.trim()) {
                const newTask: Task = {
                    id: Date.now(),
                    name: taskName.value,
                    completed: false,
                };
                emit('addTask', newTask);
                taskName.value = '';
            }
        };

        return { taskName, submitTask };
    },
});

}
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
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
    __VLS_styleScopedClasses['add-button'];
    // CSS variable injection
    // CSS variable injection end
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("add-task") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("text"), value: ((__VLS_ctx.taskName)), placeholder: ("Aufgabenname"), ...{ class: ("task-input") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.submitTask) }, ...{ class: ("add-button") }, });
    __VLS_styleScopedClasses['add-task'];
    __VLS_styleScopedClasses['task-input'];
    __VLS_styleScopedClasses['add-button'];
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
