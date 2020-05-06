<script>
    import Resources from './Resources.svelte';

    export let screen;
    export let setScreen;
</script>

<style>
    menu {
        background-color: #ddd;
        border: 0.1vmin solid #aaa;
        border-top: none;
        border-radius: 0 0 1vmin 1vmin;
    	box-sizing: border-box;
        height: 100%;
        padding: 0;
        margin: auto;
        width: 90vmin;
    }
    .screens {
        margin-bottom: 1vmin;
    }
    .screens li {
        background-color: white;
        border: 2px solid #ccc;
        border-radius: 100%;
        box-sizing: border-box;
        cursor: pointer;
        display: inline-block;
        padding: 0.6vmin;
    }
    .screens li:hover {
        background-color: rgb(210, 255, 204);
    }
    .screens li.active {
        border-color: rgb(103, 149, 96);
    }
    .screens li img {
        height: 5vh;
        width: 5vh;
    }
</style>

<menu>
    <ul class="screens">
        <li
            on:click={ () => setScreen('world') }
            class:active={ screen === 'world' }
        >
            <img src="img/world.svg" alt="World Map" />
        </li>
        <li
            on:click={ () => setScreen('village') }
            class:active={ screen === 'village' }
        >
            <img src="img/village.svg" alt="Village" />
        </li>
    </ul>
    <Resources />
</menu>
