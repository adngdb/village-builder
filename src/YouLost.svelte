<script>
    import restart from './actions/restart';
</script>

<style>
    section {
        display: grid;
        height: 100%;
    }
    .panel {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }
    h1 {
        color: rgb(162, 34, 34);
        font-size: 4em;
        margin: 5vmin 0;
    }
    p {
        font-size: 1.4em;
        line-height: 1.4;
        margin: 5vmin 0;
    }
    .controls {
        text-align: center;
    }
</style>

<section>
    <div class="panel">
        <h1>They bathed in your blood!</h1>
        <p>
            Your armies are defeated, the Demons killed your people and burned your farms.
        </p>
        <p>
            Humanity is doomed…
        </p>
        <p>
            Unless… There might be another hope.
        </p>
        <p class="controls">
            <button on:click={ restart }>Play Again</button>
        </p>
    </div>
</section>
