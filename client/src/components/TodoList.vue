<template>
    <div id="main">
        <input
            type="text"
            placeholder="What do you have to do?"
            @keypress="newTodo"
            v-model="newTodoItem"
        />
        <div id="todo-items">
            <div v-for="item in todoItems" :key="item._id">
                <Todo
                    :todoItem="item.todo"
                    :todoId="item._id"
                    @deleted="loadTodos"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Todo from './Todo';
import Model from '../Model.js';

export default {
    name: 'TodoList',
    components: { Todo },
    data() {
        return {
            todoItems: [],
            newTodoItem: '',
        };
    },
    async created() {
        try {
            this.todoItems = await Model.getTodos();
        } catch (err) {
            console.log(err);
        }
    },
    methods: {
        async newTodo(e) {
            if (e.key == 'Enter' && this.newTodoItem != '') {
                await Model.addTodo(this.newTodoItem);
                this.newTodoItem = '';
                this.todoItems = await Model.getTodos();
            }
        },
        async loadTodos() {
            this.todoItems = await Model.getTodos();
        },
    },
};
</script>

<style scoped>
#main {
    background-color: var(--theme-secondary);
    border-radius: 8px;
    padding: 1rem;
    height: 100%;
    min-height: 35rem;
    min-width: 35rem;
    overflow: hidden;
}

input {
    width: 100%;
    border: none;
    border-radius: 0 12px 0 12px;
    height: 48px;
    outline: none;
    font-weight: bold;
    font-size: 22px;
    padding: 0 1rem;
    background-image: var(--theme-accent);
    color: white;
    opacity: 55%;
    box-shadow: 6px 8px black;
    transition: border-radius 400ms, opacity 400ms;
}

input:hover,
input:focus {
    border-radius: 12px 0 12px 0;
    opacity: 100%;
}

#todo-items {
    display: flex;
    flex-direction: column;
    height: 92%;
    margin-top: 1rem;
    overflow-y: scroll;
}

#todo-items > div {
    margin: 0.5rem 0;
}

/* width */
::-webkit-scrollbar {
    width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
    background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: var(--theme-primary);
}
</style>
