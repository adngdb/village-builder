<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function cancel() {
        dispatch('cancel');
    }

    // From https://svelte.dev/repl/0ace7a508bd843b798ae599940a91783?version=3.16.7
    function clickOutside(node) {
        const handleClick = event => {
            if (node && !node.contains(event.target) && !event.defaultPrevented) {
                node.dispatchEvent(
                    new CustomEvent('click_outside', node)
                )
            }
        }

        document.addEventListener('click', handleClick, true);

        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
        }
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
    <div class="panel" use:clickOutside on:click_outside={ cancel }>
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
