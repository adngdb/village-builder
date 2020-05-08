<script>
    import restart from '../actions/restart';
</script>

<style>
    section {
        display: grid;
        height: 100%;
        text-align: center;
    }
    .content {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        margin: auto;
        padding: 0 2vmin;
    }
    h1 {
        color: hsl(208, 100%, 64.7%);
        font-size: 4em;
        margin: 5vmin 0;
    }
    p {
        color: hsl(0, 0%, 90%);
        font-size: 1.4em;
        line-height: 1.4;
        margin: 5vmin 0;
    }
    .controls {
        text-align: center;
    }
</style>

<section>
    <div class="content">
        <h1>You eradicated the vermin!</h1>
        <p>
            Your armies are victorious, the Archdemon's head hangs on a pike, your people are finally safe…
        </p>
        <p>
            Humanity is saved!
        </p>
        <p>
            What are all those soldiers going to do now? This story doesn't tell…
        </p>
        <p class="controls">
            <button on:click={ restart }>Play Again</button>
        </p>
    </div>
</section>
