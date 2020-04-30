<template>
    <div id="app">
        <div id="weather">
            <Weather />
        </div>
        <div id="todo">
            <TodoList />
        </div>
    </div>
</template>

<script>
import Weather from './components/Weather';
import TodoList from './components/TodoList';

export default {
    name: 'App',
    components: { Weather, TodoList },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
:root {
    --theme-primary: rgb(31, 30, 46);
    --theme-secondary: rgb(39, 42, 61);
    --theme-accent: linear-gradient(
        to top,
        #b656eb,
        #ba55e9,
        #bf54e7,
        #c353e5,
        #c752e3,
        #ca51e0,
        #ce51de,
        #d150db,
        #d54fd7,
        #d94fd3,
        #dc4ed0,
        #df4ecc
    );
}

::placeholder {
    color: white;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
}

html,
body {
    height: 100vh;
    overflow-y: hidden;
    background-color: var(--theme-primary);
}

#app {
    height: 100%;
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: minmax(25rem, 35rem) auto;
    background-color: var(--theme-primary);
}

#weather {
    grid-row: 1/2;
    grid-column: 1/2;
    padding: 1.5rem;
}

#todo {
    grid-row: 1/2;
    grid-column: 2/3;
    padding: 1.5rem;
}
</style>
