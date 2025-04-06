<script lang="ts">
	import Game1 from '$lib/components/game1.svelte';
	import save from '$lib/assets/save.svg';
	import saved from '$lib/assets/saved.svg';
	import { enhance } from '$app/forms';

	let { data } = $props();

</script>

<div class="heading">
	<h1>{data.name}</h1>
</div>

{#if data.index === 1}
	<Game1 />
	<div class="description">{data.description}</div>
	<form method="POST" action="{data.user?.favourite_games.includes(data.id) ? '?/delete' : '?/save'}" use:enhance>
		<button class="favbtn" type="submit" name="id" value="{data.id}" style="color: {data.user?.favourite_games.includes(data.id) ? 'var(--main)' : '#373737'}; left: {data.user?.favourite_games.includes(data.id) ? '80.5vw' : '82vw'}">
			{data.user?.favourite_games.includes(data.id) ? "Запазено в любими" : "Запази в любими"}
		<img class="favourite" src="{data.user?.favourite_games.includes(data.id) ? saved : save}" alt="save">
	</button>
</form>
{:else}
	<p>Game not found</p>
{/if}
<style>
		.description{
				width: 35vw;
				position: absolute;
				right: 5vw;
				top: 20vw;
				font-size: 1.3vw;
				text-align: justify;
				background: var(--accent);
				padding: 1vw;
				border-radius: 10px;
				font-family: "transforma_regular", sans-serif;
				color: #373737;
		}
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
		.favourite{
			width: 2vw;
			height: 2vw;
    }
		.favbtn{
			position: absolute;
			left: 82vw;
			top: 41vw;
			/*top: 4vw;*/
			width: fit-content;
			height: 2vw;
			display: flex;
			justify-content: center;
			align-items: center;
			font-family: transforma, sans-serif;
			border: none;
			border-radius: 5px;
			background: none;
			cursor: pointer;
			color: #373737;
		}
</style>