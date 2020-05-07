<script>
    export let empty = false;
    export let onTileClick = null;

    export let type = '';
    export let attacked = false;
</script>

<style>
    /* Source: https://codepen.io/gpyne/pen/iElhp */
    .hexagon {
        background-color: hsl(220, 75%, 75%);
        cursor: pointer;
        display: inline-block;
        font-size: 1.2vmin;
        margin: 0.1em 1.8em;
        position: relative;
        text-align: center;
    }
    .hexagon,
    .hexagon::before,
    .hexagon::after {
        width: 6.7em;
        height: 11.6em;
        border-radius: 20%/5%;
    }
    .hexagon::before {
        background-color: inherit;
        content: "";
        position: absolute;
        left: 0;
        transform: rotate(-60deg);
    }
    .hexagon::after {
        background-color: inherit;
        content: "";
        position: absolute;
        left: 0;
        transform: rotate(60deg);
    }
    .hexagon:nth-child(even) {
        top: 5.9em;
    }
    .hexagon:hover {
        background-color: hsl(60, 75%, 75%);
        z-index: 105;
    }
    .hexagon:active {
        background-color: hsl(60, 75%, 50%);
        z-index: 110;
    }
    .hexagon.empty {
        position: relative;
        display: none;
        width: 6.7em;
        height: 11.6em;
        margin: 0.1em 1.8em;
    }
    .hexagon.empty:nth-child(even) {
        top: 5.9em;
    }
    .hexagon .content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 140%;
        font-size: 4vmin;
        line-height: 1.2;
        z-index: 100;
    }

    /* Game specific styles */
    .camp {
        background-color: hsl(353, 90%, 39%);
    }

    .camp:hover {
        background-color: hsl(353, 82%, 56%);
    }

    .camp.attacked {
        background-color: hsl(25, 100%, 50%);
    }

    .camp.attacked:hover {
        background-color: hsl(25, 80%, 60%);
    }

    .village {
        background-color: hsl(173, 90%, 39%);
    }

    .village:hover {
        background-color: hsl(173, 90%, 50%);
    }
</style>

<div
    class={ "hexagon " + type }
    class:empty
    class:attacked
    on:click={ onTileClick }
>
    <div class="content">
        <slot></slot>
    </div>
</div>
