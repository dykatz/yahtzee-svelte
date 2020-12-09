<script lang="ts">
    import ScoreSlot from './ScoreSlot.svelte';

    let slotOnes: ScoreSlot;
    let slotTwos: ScoreSlot;
    let slotThrees: ScoreSlot;
    let slotFours: ScoreSlot;
    let slotFives: ScoreSlot;
    let slotSixes: ScoreSlot;
    let slotThreeKind: ScoreSlot;
    let slotFourKind: ScoreSlot;
    let slotHouse: ScoreSlot;
    let slotSmall: ScoreSlot;
    let slotLarge: ScoreSlot;
    let slotYahtzee: ScoreSlot;
    let slotChance: ScoreSlot;

    function onesCalcScore(e) {
        slotOnes.setScore(e.detail.get(1) ?? 0);
    }

    function twosCalcScore(e) {
        slotTwos.setScore(2 * (e.detail.get(2) ?? 0));
    }

    function threesCalcScore(e) {
        slotThrees.setScore(3 * (e.detail.get(3) ?? 0));
    }

    function foursCalcScore(e) {
        slotFours.setScore(4 * (e.detail.get(4) ?? 0));
    }

    function fivesCalcScore(e) {
        slotFives.setScore(5 * (e.detail.get(5) ?? 0));
    }

    function sixesCalcScore(e) {
        slotSixes.setScore(6 * (e.detail.get(6) ?? 0));
    }

    function threeKindCalcStore(e) {
        let hasThree: boolean = false;

        e.detail.forEach((value: number) => {
            if (value >= 3) {
                hasThree = true;
            }
        });

        if (!hasThree) {
            slotThreeKind.setScore(0);
        } else {
            let sum: number = 0;
            e.detail.forEach((value: number, key: number) => { sum += value * key; });
            slotThreeKind.setScore(sum);
        }
    }

    function fourKindCalcStore(e) {
        let hasFour: boolean = false;

        e.detail.forEach((value: number) => {
            if (value >= 4) {
                hasFour = true;
            }
        });

        if (!hasFour) {
            slotFourKind.setScore(0);
        } else {
            let sum: number = 0;
            e.detail.forEach((value: number, key: number) => { sum += value * key; });
            slotFourKind.setScore(sum);
        }
    }

    function fullHouseCalcStore(e) {
        let hasTwo: boolean = false;
        let hasThree: boolean = false;

        e.detail.forEach((value: number) => {
            if (value === 2) {
                hasTwo = true;
            }
            if (value === 3) {
                hasThree = true;
            }
        });

        slotHouse.setScore((hasTwo && hasThree) ? 25 : 0);
    }

    function smallStraightCalcStore(e) {
        let hasSmallStraight: boolean = false;
        let dice: Map<number, number> = e.detail;

        if (dice.has(3) && dice.has(4)) {
            if (dice.has(1) && dice.has(2)) {
                hasSmallStraight = true;
            }
            if (dice.has(5) && dice.has(6)) {
                hasSmallStraight = true;
            }
            if (dice.has(2) && dice.has(5)) {
                hasSmallStraight = true;
            }
        }

        slotSmall.setScore(hasSmallStraight ? 30 : 0);
    }

    function largeStraightCalcStore(e) {
        let hasLargeStraight: boolean = false;
        let dice: Map<number, number> = e.detail;

        if (dice.has(2) && dice.has(3) && dice.has(4) && dice.has(5)) {
            if (dice.has(1)) {
                hasLargeStraight = true;
            }
            if (dice.has(6)) {
                hasLargeStraight = true;
            }
        }

        slotLarge.setScore(hasLargeStraight ? 40 : 0);
    }

    function yahtzeeCalcStore(e) {
        let hasFive: boolean = false;

        e.detail.forEach((value: number) => {
            if (value === 5) {
                hasFive = true;
            }
        });

        slotYahtzee.setScore(hasFive ? 50 : 0);
    }

    function chanceCalcStore(e) {
        let sum: number = 0;
        e.detail.forEach((value: number, key: number) => { sum += value * key; });
        slotChance.setScore(sum);
    }

    let upperLevelSum: number = 0;
    
    $: upperLevelBonus = upperLevelSum > 62 ? 35 : 0;
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
        <td><ScoreSlot bind:this={slotOnes} on:calcScore={onesCalcScore}/></td>
        <td><ScoreSlot bind:this={slotTwos} on:calcScore={twosCalcScore}/></td>
        <td><ScoreSlot bind:this={slotThrees} on:calcScore={threesCalcScore}/></td>
        <td><ScoreSlot bind:this={slotFours} on:calcScore={foursCalcScore}/></td>
        <td><ScoreSlot bind:this={slotFives} on:calcScore={fivesCalcScore}/></td>
        <td><ScoreSlot bind:this={slotSixes} on:calcScore={sixesCalcScore}/></td>
        <td>{upperLevelBonus}</td>
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
    </tr>
    <tr>
        <td><ScoreSlot bind:this={slotThreeKind} on:calcScore={threeKindCalcStore}/></td>
        <td><ScoreSlot bind:this={slotFourKind} on:calcScore={fourKindCalcStore}/></td>
        <td><ScoreSlot bind:this={slotHouse} on:calcScore={fullHouseCalcStore}/></td>
        <td><ScoreSlot bind:this={slotSmall} on:calcScore={smallStraightCalcStore}/></td>
        <td><ScoreSlot bind:this={slotLarge} on:calcScore={largeStraightCalcStore}/></td>
        <td><ScoreSlot bind:this={slotYahtzee} on:calcScore={yahtzeeCalcStore}/></td>
        <td><ScoreSlot bind:this={slotChance} on:calcScore={chanceCalcStore}/></td>
    </tr>
</table>
