<script lang="ts">
	import { browser } from '$app/environment';

	let { data } = $props();

	if(browser){
		document.title = 'Чудознайко - Игри';
			for(const btn of document.getElementsByClassName('nav-buttons')){
			(btn as HTMLButtonElement).style.outline = 'none';
		}
		(document.getElementsByClassName('nav-buttons')[1] as HTMLButtonElement).style.outline = '2px solid white';
	}

</script>

<div class="heading">
	<h1>Образователни игри</h1>
</div>

<div class="games">
	{#each data.games as game, i}
		<div class="game">
			<button onclick="{() => {window.location.href = `/home/games/${game.thumbnail[0]}`}}" aria-label="game"></button>
			<img src="{data.thumbnails[i]}" alt="{game.thumbnail[0]}" style="width: 20vw; height: 13vw; border-radius: 20px">
		</div>
	{/each}
</div>

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
			position: relative;
			top: 18vh;
	}
	h1{
			font-size: 2.5vw;
			color: white;
			font-family: "transforma", sans-serif;
			font-weight: 900;
	}
	.games {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			gap: 1rem;
			padding-left: 10vw;
			padding-right: 10vw;
			padding-top: 15vw;
			/*top: 10rem;*/
			position: relative;
	}
	button{
			position: absolute;
			width: 20vw;
			height: 13vw;
			border-radius: 20px;
			background: none;
			border: none;
			cursor: pointer;
	}
</style>