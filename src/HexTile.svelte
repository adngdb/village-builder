<script>
    export let content = '';
</script>

<style>
    /* Source: https://codepen.io/gpyne/pen/iElhp */
    .hexagon {
        font-size: 0.1vmin;
        position: relative;
        display: inline-block;
        margin: 1em 18em;
        background-color: hsl(220, 75%, 75%);
        text-align: center;
    }
    .hexagon,
    .hexagon::before,
    .hexagon::after {
        width: 67em;
        height: 116em;
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
        top: 59em;
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
    .hexagon > span {
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

<div class="hexagon">
    <span>{content}</span>
</div>
