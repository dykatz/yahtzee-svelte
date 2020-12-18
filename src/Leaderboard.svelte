<script lang="ts">
    import { usedSlots } from './stores';

    let disabled: boolean = true;
    let nickName: string = "";

    $: if ($usedSlots === 13) {
        disabled = false;
    }

    function onSave() {
        disabled = true;
        $usedSlots = 0;
        nickName = "";
    }
</script>

<input type="text" autocomplete="off" disabled={disabled} value={nickName}>
<button on:click="{onSave}" disabled={disabled}>Submit</button>
