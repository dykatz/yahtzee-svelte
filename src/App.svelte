<script lang="ts">
	import 'smelte/src/tailwind.css';
	import DiceBar from './DiceBar.svelte';
	import ScoreBoard from './ScoreBoard.svelte';
	import Leaderboard from './Leaderboard.svelte';
</script>

<main>
	<ScoreBoard/>
	<hr>
	<DiceBar/>
	<hr>
	<Leaderboard/>
</main>
