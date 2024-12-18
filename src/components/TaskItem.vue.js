import { defineComponent } from 'vue';
import type { Task } from '@/model/Task';

export default defineComponent({
    name: 'TaskItem',
    props: {
        task: {
            type: Object as () => Task,
    required: true,
},
},
emits: ['deleteTask', 'editTask'],
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
    __VLS_styleScopedClasses['task-item'];
    __VLS_styleScopedClasses['edit-button'];
    __VLS_styleScopedClasses['delete-button'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ ...{ class: ("task-item") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.task.name);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("buttons") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.$emit('editTask', __VLS_ctx.task);
            } }, ...{ class: ("edit-button") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.$emit('deleteTask', __VLS_ctx.task.id);
            } }, ...{ class: ("delete-button") }, });
    __VLS_styleScopedClasses['task-item'];
    __VLS_styleScopedClasses['buttons'];
    __VLS_styleScopedClasses['edit-button'];
    __VLS_styleScopedClasses['delete-button'];
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
