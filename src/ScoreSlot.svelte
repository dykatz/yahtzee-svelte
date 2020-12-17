<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { ready, usedSlots } from './stores';

    let dispatch = createEventDispatcher();

    export let score: number = 0;
    export let displayScore: number = 0;

    let used: boolean = false;
    $: disabled = used || !$ready;

    function onClick() {
        score = displayScore;
        used = true;
        $ready = false;
        $usedSlots += 1;
        dispatch('assignment');
    }

    $: if ($usedSlots === 0) {
        score = 0;
        displayScore = 0;
        used = false;
    }
</script>

<button {disabled} on:click={onClick}>{used ? score : displayScore}</button>
