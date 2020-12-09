<script lang="ts">
    import { Dispatcher } from './dispatcher';

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

        Dispatcher.emit('produceRoll', [d1, d2, d3, d4, d5].reduce((prev: Map<number, number>, item: number) => {
            prev.set(item, 1 + (prev.get(item) ?? 0));
            return prev;
        }, new Map()));
    }

    Dispatcher.enlist('consumeRoll', () => {
        rerolls = 3;
        disabled = false;
    });
</script>

<table>
    <tr>
        <td><Dice num={d1}/></td>
        <td><Dice num={d2}/></td>
        <td><Dice num={d3}/></td>
        <td><Dice num={d4}/></td>
        <td><Dice num={d5}/></td>

        <td rowspan=2>
            <button on:click={rollDice} disabled={disabled}>Roll!</button>
            {rerolls} rolls remaining!
        </td>
    </tr>
    <tr>
        <td><button disabled={l1} on:click="{() => { l1 = true; }}">Lock</button></td>
        <td><button disabled={l2} on:click="{() => { l2 = true; }}">Lock</button></td>
        <td><button disabled={l3} on:click="{() => { l3 = true; }}">Lock</button></td>
        <td><button disabled={l4} on:click="{() => { l4 = true; }}">Lock</button></td>
        <td><button disabled={l5} on:click="{() => { l5 = true; }}">Lock</button></td>
    </tr>
</table>
