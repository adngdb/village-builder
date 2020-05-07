<script>
    import screen from './stores/screen';

    import Resources from './Resources.svelte';
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
            on:click={ screen.goToWorld }
            class:active={ $screen === screen.WORLD }
        >
            <img src="img/world.svg" alt="World Map" />
        </li>
        <li
            on:click={ screen.goToVillage }
            class:active={ $screen === screen.VILLAGE }
        >
            <img src="img/village.svg" alt="Village" />
        </li>
        <li
            on:click={ screen.goToArmy }
            class:active={ $screen === screen.ARMY }
        >
            <img src="img/army.svg" alt="Army" />
        </li>
    </ul>
    <Resources />
</menu>
