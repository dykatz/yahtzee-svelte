<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { Dispatcher } from './dispatcher';

    const dispatch = createEventDispatcher();

    let used: boolean = false;
    let disabled: boolean = true;
    let score: number = 0;

    Dispatcher.enlist('produceRoll', (dice: number[]) => {
        if (used) {
            return;
        }

        disabled = false;
        dispatch('calcScore', dice);
    });
    
    function consumeRoll() {
        used = true;
        Dispatcher.emit('consumeRoll');
    }

    Dispatcher.enlist('consumeRoll', () => { disabled = true; });

    export function setScore(_score: number) {
        score = _score;
    }

    export function getScore(): number {
        return used ? score : 0;
    }
</script>

{#if used}
    {score}
{:else}
    <button disabled={disabled} on:click={consumeRoll}>
        {#if !disabled}{score}{/if}
    </button>
{/if}
