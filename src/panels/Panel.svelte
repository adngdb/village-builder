<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function cancel() {
        dispatch('cancel');
    }
</script>

<style>
    section {
        display: grid;
        height: 100%;
        position: absolute;
        z-index: 200;
    }

    .panel .close {
        cursor: pointer;
        float: right;
        margin-right: 1vmin;
    }

    .panel .controls {
        text-align: center;
    }
</style>

<section>
    <div class="panel">
        <h2>
            <span on:click={ cancel } class="close">
                <img class="icon" src="img/ui/cancel.svg" alt="" />
            </span>
            <slot name="title"></slot>
        </h2>

        <slot></slot>

        <p class="controls">
            <button on:click={ cancel }>
                <img class="icon" src="img/ui/cancel.svg" alt="" />
                Close
            </button>

            <slot name="control"></slot>
        </p>
    </div>
</section>
