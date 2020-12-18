<script lang="ts">
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

<input type="text" autocomplete="off" disabled={disabled} bind:value={nickName}>
<button on:click="{onSave}" disabled={disabled}>Submit</button>
<br>

{#if leaderboard.length === 0}
No scores in leaderboard yet!
{:else}
<table>
    <tr>
        <th>Name</th>
        <th>Date</th>
        <th>Score</th>
    </tr>
    {#each leaderboard as leader (leader.date)}
    <tr>
        <td>{leader.name}</td>
        <td>{leader.date.toDateString()}</td>
        <td>{leader.score}</td>
    </tr>
    {/each}
</table>
{/if}
