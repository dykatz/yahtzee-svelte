<script lang="ts">
    import { dice, ready } from './stores';

    import ScoreSlot from './ScoreSlot.svelte';
    import YahtzeeSlot from './YahtzeeSlot.svelte';

    function maphas<K, V>(map: Map<K, V>, func: Function): boolean {
        let r: boolean = false;

        map.forEach((value: V, key: K) => {
            if (func(key, value)) {
                r = true;
            }
        });

        return r;
    }

    $: _ones = $dice.get(1) ?? 0;
    $: _twos = 2 * ($dice.get(2) ?? 0);
    $: _threes = 3 * ($dice.get(3) ?? 0);
    $: _fours = 4 * ($dice.get(4) ?? 0);
    $: _fives = 5 * ($dice.get(5) ?? 0);
    $: _sixes = 6 * ($dice.get(6) ?? 0);

    $: sum = _ones + _twos + _threes + _fours + _fives + _sixes;

    $: hasThreeOfAKind = maphas($dice, (_: number, val: number) => val >= 3);
    $: hasFourOfAKind = maphas($dice, (_: number, val: number) => val >= 4);
    $: hasExactlyTwoOfAKind = maphas($dice, (_: number, val: number) => val === 2);
    $: hasExactlyThreeOfAKind = maphas($dice, (_: number, val: number) => val === 3);
    $: hasSmallStraight = $dice.has(3) && $dice.has(4) && (($dice.has(1) && $dice.has(2)) || ($dice.has(2) && $dice.has(5)) || ($dice.has(5) && $dice.has(6)));
    $: hasLargeStraight = $dice.has(2) && $dice.has(3) && $dice.has(4) && $dice.has(5) && ($dice.has(1) || $dice.has(6));
    $: hasYahtzee = maphas($dice, (_: number, val: number) => val === 5);

    $: _threeOfAKind = hasThreeOfAKind ? sum : 0;
    $: _fourOfAKind = hasFourOfAKind ? sum : 0;
    $: _fullHouse = (hasExactlyTwoOfAKind && hasExactlyThreeOfAKind) ? 25 : 0;
    $: _smallStraight = hasSmallStraight ? 30 : 0;
    $: _largeStraight = hasLargeStraight ? 40 : 0;

    let yahtzee: number = 0;
    $: _yahtzee = hasYahtzee ? (yahtzee === 0 ? 50 : yahtzee + 100) : 0;

    let ones: number = 0;
    let twos: number = 0;
    let threes: number = 0;
    let fours: number = 0;
    let fives: number = 0;
    let sixes: number = 0;

    $: upperLevelSum = ones + twos + threes + fours + fives + sixes;
    $: upperLevelBonus = upperLevelSum > 62 ? 35 : 0;

    let threeOfAKind: number = 0;
    let fourOfAKind: number = 0;
    let fullHouse: number = 0;
    let smallStraight: number = 0;
    let largeStraight: number = 0;
    let chance: number = 0;

    $: grandTotal = ones + twos + threes + fours + fives + sixes + upperLevelBonus + threeOfAKind + fourOfAKind + fullHouse + smallStraight + largeStraight + yahtzee + chance;
</script>

<table>
    <tr>
        <td rowspan=2>Upper Level</td>
        <td>Ones</td>
        <td>Twos</td>
        <td>Threes</td>
        <td>Fours</td>
        <td>Fives</td>
        <td>Sixes</td>
        <td>Upper Level Bonus</td>
    </tr>
    <tr>
        <td><ScoreSlot displayScore={_ones} score={ones} on:assignment="{() => {ones = _ones}}"/></td>
        <td><ScoreSlot displayScore={_twos} score={twos} on:assignment="{() => {twos = _twos}}"/></td>
        <td><ScoreSlot displayScore={_threes} score={threes} on:assignment="{() => {threes = _threes}}"/></td>
        <td><ScoreSlot displayScore={_fours} score={fours} on:assignment="{() => {fours = _fours}}"/></td>
        <td><ScoreSlot displayScore={_fives} score={fives} on:assignment="{() => {fives = _fives}}"/></td>
        <td><ScoreSlot displayScore={_sixes} score={sixes} on:assignment="{() => {sixes = _sixes}}"/></td>
        <td>{upperLevelBonus}</td>
        <td>Grand Total</td>
    </tr>
    <tr>
        <td rowspan=2>Lower Level</td>
        <td>3 of a Kind</td>
        <td>4 of a Kind</td>
        <td>Full House</td>
        <td>Small Straight</td>
        <td>Large Straight</td>
        <td>Yahtzee</td>
        <td>Chance</td>
        <td>{grandTotal}</td>
    </tr>
    <tr>
        <td><ScoreSlot displayScore={_threeOfAKind} score={threeOfAKind} on:assignment="{() => {threeOfAKind = _threeOfAKind}}"/></td>
        <td><ScoreSlot displayScore={_fourOfAKind} score={fourOfAKind} on:assignment="{() => {fourOfAKind = _fourOfAKind}}"/></td>
        <td><ScoreSlot displayScore={_fullHouse} score={fullHouse} on:assignment="{() => {fullHouse = _fullHouse}}"/></td>
        <td><ScoreSlot displayScore={_smallStraight} score={smallStraight} on:assignment="{() => {smallStraight = _smallStraight}}"/></td>
        <td><ScoreSlot displayScore={_largeStraight} score={largeStraight} on:assignment="{() => {largeStraight = _largeStraight}}"/></td>
        <td><YahtzeeSlot displayScore={_yahtzee} score={yahtzee} on:assignment="{() => {yahtzee = _yahtzee}}"/></td>
        <td><ScoreSlot displayScore={sum} score={chance} on:assignment="{() => {chance = sum}}"/></td>
    </tr>
</table>
