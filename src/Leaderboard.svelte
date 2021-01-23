<script lang="ts">
	import { Button, DataTable, TextField } from 'smelte';

    import { totalScore, usedSlots } from './stores';
    import { yahtzeeDB } from './db';

    let disabled: boolean = true;
    let nickName: string = "";

    $: if ($usedSlots === 13) {
        disabled = false;
    }

    let leaderboard = [];
    yahtzeeDB.getLeaderboard().then(leaders => {
        leaderboard = leaders.reverse();
    });

    function onSave() {
        yahtzeeDB.addNewScore(nickName, $totalScore).then(() => {
            yahtzeeDB.getLeaderboard().then(leaders => {
                leaderboard = leaders.reverse();
            });
        });

        disabled = true;
        $usedSlots = 0;
        nickName = "";
    }
</script>

<TextField {disabled} bind:value={nickName} label="Nick Name"/>
<Button on:click="{onSave}" disabled={disabled}>Submit</Button>
<br>

{#if leaderboard.length === 0}
No scores in leaderboard yet!
{:else}
<DataTable data={leaderboard.map(l => { return { ...l, date: l.date.toDateString() }; })}/>
{/if}
