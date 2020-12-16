<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { ready } from './stores';
    
    let dispatch = createEventDispatcher();

    export let score: number = 0;
    export let displayScore: number = 0;

    let burned: boolean = false;
    $: disabled = burned || !$ready;

    function onClick() {
        score = displayScore;
        if (displayScore === 0) {
            burned = true;
        }
        $ready = false;
        dispatch('assignment');
    }
</script>

<button {disabled} on:click={onClick}>{disabled ? score : displayScore}</button>
