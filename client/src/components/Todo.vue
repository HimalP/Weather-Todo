<template>
    <div id="todo-main">
        <p>{{ todoItem }}</p>
        <button @click="deleteTodo">X</button>
    </div>
</template>

<script>
import Model from '../Model';

export default {
    name: 'Todo',
    props: {
        todoItem: String,
        todoId: String,
    },
    methods: {
        async deleteTodo() {
            await Model.deleteTodo(this.todoId);
            this.$emit('deleted');
        },
    },
};
</script>

<style scoped>
#todo-main {
    background-color: var(--theme-primary);
    border-radius: 8px;
    padding: 1rem;
    color: white;
    font-weight: bold;
    font-size: 32px;
    display: flex;
    margin-right: 5px;
}

button {
    border: none;
    border-radius: 8px;
    width: 2.5rem;
    background-color: rgb(175, 60, 60);
    cursor: pointer;
    margin-left: auto;
    color: white;
    font-weight: bold;
    outline: none;
}

button:active {
    background-color: rgb(117, 39, 39);
}
</style>
