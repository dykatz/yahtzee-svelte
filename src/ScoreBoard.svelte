<script lang="ts">
    import { dice, totalScore, usedSlots } from './stores';

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
    $: _yahtzee = hasYahtzee ? (yahtzee === 0 ? 50 : yahtzee + 100) : yahtzee;

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

    $: if ($usedSlots === 13) {
        $totalScore = grandTotal;
    }

    $: if ($usedSlots === 0) {
        ones = 0;
        twos = 0;
        threes = 0;
        fours = 0;
        fives = 0;
        sixes = 0;
        threeOfAKind = 0;
        fourOfAKind = 0;
        fullHouse = 0;
        smallStraight = 0;
        largeStraight = 0;
        yahtzee = 0;
        chance = 0;
    }
</script>

<div class="grid grid-cols-9 gap-4">
    <div>Upper Level</div>
    <div>
	Ones<br>
	<ScoreSlot displayScore={_ones} score={ones} on:assignment="{() => { ones = _ones; }}"/>
    </div>
    <div>
	Twos<br>
	<ScoreSlot displayScore={_twos} score={twos} on:assignment="{() => { twos = _twos; }}"/>
    </div>
    <div>
	Threes<br>
	<ScoreSlot displayScore={_threes} score={threes} on:assignment="{() => { threes = _threes; }}"/>
    </div>
    <div>
	Fours<br>
	<ScoreSlot displayScore={_fours} score={fours} on:assignment="{() => { fours = _fours; }}"/>
    </div>
    <div>
	Fives<br>
	<ScoreSlot displayScore={_fives} score={fives} on:assignment="{() => { fives = _fives; }}"/>
    </div>
    <div>
	Sixes<br>
	<ScoreSlot displayScore={_sixes} score={sixes} on:assignment="{() => { sixes = _sixes; }}"/>
    </div>
    <div>Upper Level Bonus<br>{upperLevelBonus}</div>
    <div></div>

    <div>Lower Level</div>
    <div>
	3 of a Kind<br>
	<ScoreSlot displayScore={_threeOfAKind} score={threeOfAKind} on:assignment="{() => { threeOfAKind = _threeOfAKind; }}"/>
    </div>
    <div>
	4 of a Kind<br>
	<ScoreSlot displayScore={_fourOfAKind} score={fourOfAKind} on:assignment="{() => { fourOfAKind = _fourOfAKind; }}"/>
    </div>
    <div>
	Full House<br>
	<ScoreSlot displayScore={_fullHouse} score={fullHouse} on:assignment="{() => { fullHouse = _fullHouse; }}"/>
    </div>
    <div>
	Small Straight<br>
	<ScoreSlot displayScore={_smallStraight} score={smallStraight} on:assignment="{() => { smallStraight = _smallStraight; }}"/>
    </div>
    <div>
	Large Straight<br>
	<ScoreSlot displayScore={_largeStraight} score={largeStraight} on:assignment="{() => { largeStraight = _largeStraight; }}"/>
    </div>
    <div>
	Yahtzee<br>
	<YahtzeeSlot displayScore={_yahtzee} score={yahtzee} on:assignment="{() => { yahtzee = _yahtzee; }}"/>
    </div>
    <div>
	Chance<br>
	<ScoreSlot displayScore={sum} score={chance} on:assignment="{() => { chance = sum; }}"/>
    </div>

    <div>Grand Total<br>{grandTotal}</div>
</div>
