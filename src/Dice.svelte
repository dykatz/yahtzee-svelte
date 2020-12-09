<script lang="ts">
    import { onMount, tick } from 'svelte';

    export let num: number = 0;

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    onMount(async () => {
        ctx = canvas.getContext("2d");
    });

    $: {
        if (ctx) {
            ctx.clearRect(0, 0, 64, 64);
            ctx.fillStyle = "black";
            ctx.beginPath();
            if (num === 1) {
                ctx.arc(32, 32, 6, 0, Math.PI * 2);
            } else if (num === 2) {
                ctx.arc(21, 42, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(42, 21, 6, 0, Math.PI * 2);
            } else if (num === 3) {
                ctx.arc(32, 32, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(21, 42, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(42, 21, 6, 0, Math.PI * 2);
            } else if (num === 4) {
                ctx.arc(21, 21, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(21, 42, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(42, 21, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(42, 42, 6, 0, Math.PI * 2);
            } else if (num === 5) {
                ctx.arc(21, 21, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(21, 42, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(42, 21, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(42, 42, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(32, 32, 6, 0, Math.PI * 2);
            } else if (num === 6) {
                ctx.arc(21, 18, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(21, 45, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(42, 18, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(42, 45, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(21, 32, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(42, 32, 6, 0, Math.PI * 2);
            }
            ctx.fill();
        }
    }
</script>

<canvas bind:this={canvas} width=64 height=64></canvas>
