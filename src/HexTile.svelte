<script>
    export let empty = false;
    export let onTileClick = null;
</script>

<style>
    /* Source: https://codepen.io/gpyne/pen/iElhp */
    .hexagon {
        font-size: 1.3vmin;
        position: relative;
        display: inline-block;
        margin: 0.1em 1.8em;
        background-color: hsl(220, 75%, 75%);
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
        background-color: hsla(60, 75%, 75%, 1.0);
        cursor: pointer;
        z-index: 105;
    }
    .hexagon:active {
        background-color: hsla(60, 75%, 50%, 1.0);
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
    .hexagon > div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 140%;
        font-size: 4vmin;
        line-height: 1.2;
        z-index: 100;
    }
</style>

<div class="hexagon" class:empty on:click={ onTileClick }>
    <div>
        <slot></slot>
    </div>
</div>
