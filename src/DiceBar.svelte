<script lang="ts">
	import { Button } from 'smelte';

    import { dice, ready, usedSlots } from './stores';

    import Dice from './Dice.svelte';

    let d1: number = 1;
    let d2: number = 2;
    let d3: number = 3;
    let d4: number = 4;
    let d5: number = 5;

    let l1: boolean = false;
    let l2: boolean = false;
    let l3: boolean = false;
    let l4: boolean = false;
    let l5: boolean = false;

    let rerolls: number = 3;
    let disabled: boolean = false;

    function rollDice() {
        if (rerolls === 3) {
            l1 = false;
            l2 = false;
            l3 = false;
            l4 = false;
            l5 = false;
        }
        
        if (!l1) { d1 = Math.floor(Math.random() * 6 + 1); }
        if (!l2) { d2 = Math.floor(Math.random() * 6 + 1); }
        if (!l3) { d3 = Math.floor(Math.random() * 6 + 1); }
        if (!l4) { d4 = Math.floor(Math.random() * 6 + 1); }
        if (!l5) { d5 = Math.floor(Math.random() * 6 + 1); }

        rerolls -= 1;
        if (rerolls < 1) {
            disabled = true;
            l1 = true;
            l2 = true;
            l3 = true;
            l4 = true;
            l5 = true;
        }

        $dice = [d1, d2, d3, d4, d5].reduce((prev: Map<number, number>, item: number) => {
            prev.set(item, 1 + (prev.get(item) ?? 0));
            return prev;
        }, new Map());

        $ready = true;
    }

    $: if (!$ready) {
        rerolls = 3;
        disabled = false;
    }

    $: if ($usedSlots === 13) {
        disabled = true;
        rerolls = 0;
    }

    $: if ($usedSlots === 0) {
        disabled = false;
        rerolls = 3;
    }
</script>

<div class="grid grid-cols-6 pad-4">
	<div><Dice num={d1}/></div>
	<div><Dice num={d2}/></div>
	<div><Dice num={d3}/></div>
	<div><Dice num={d4}/></div>
	<div><Dice num={d5}/></div>
	<div><Button on:click={rollDice} disabled={disabled}>{rerolls} rolls remaining!</Button></div>
	
	<div><Button disabled={l1} on:click="{() => { l1 = true; }}">Lock</Button></div>
	<div><Button disabled={l2} on:click="{() => { l2 = true; }}">Lock</Button></div>
	<div><Button disabled={l3} on:click="{() => { l3 = true; }}">Lock</Button></div>
	<div><Button disabled={l4} on:click="{() => { l4 = true; }}">Lock</Button></div>
	<div><Button disabled={l5} on:click="{() => { l5 = true; }}">Lock</Button></div>
</div>
