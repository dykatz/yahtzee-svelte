<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { ready, usedSlots } from './stores';
    
    let dispatch = createEventDispatcher();

    export let score: number = 0;
    export let displayScore: number = 0;

    let burned: boolean = false;
    $: disabled = burned || !$ready;

    function onClick() {
        if (score === 0) {
            $usedSlots += 1;
        }
        score = displayScore;
        if (displayScore === 0) {
            burned = true;
        }
        $ready = false;
        dispatch('assignment');
    }

    $: if ($usedSlots === 0) {
        score = 0;
        displayScore = 0;
        burned = false;
    }
</script>

<button {disabled} on:click={onClick}>{disabled ? score : displayScore}</button>
