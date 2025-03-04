<script lang="ts">
	import Game1 from '$lib/components/game1.svelte';

	let { data } = $props();

</script>

<div class="heading">
	<h1>{data.name}</h1>
</div>

{#if data.index === 1}
	<Game1 />
{:else}
	<p>Game not found</p>
{/if}

<style>
		.heading {
			display: flex;
			justify-content: center;
			align-items: center;
      width: 50vw;
			height: 10vh;
			background: var(--accent);
			margin: auto;
			border-radius: 10px;
			position: fixed;
			top: 18vh;
			left: 25vw;
	}
		h1{
			font-size: 2vw;
			color: white;
			font-family: "transforma", sans-serif;
			font-weight: 900;
			user-select: none;
		}
		p{
			font-size: 2vw;
			color: #373737;
			font-family: "transforma", sans-serif;
			font-weight: 900;
			user-select: none;
			text-align: center;
		}
</style>