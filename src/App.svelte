<script lang="ts">
	import DiceBar from './DiceBar.svelte';
	import ScoreBoard from './ScoreBoard.svelte';

	let scoreBoard: ScoreBoard;
	let diceBar: DiceBar;
</script>

<main>
	<ScoreBoard bind:this={scoreBoard}/>
	<DiceBar bind:this={diceBar}/>
</main>
