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
<div class="games">
	{#each data.games as game, i}
		<div class="game">
			<button onclick="{() => {window.location.href = `/home/games/${game.thumbnail[0]}`}}" aria-label="game"></button>
			<img src="{data.thumbnails[i]}" alt="{game.thumbnail[0]}" style="width: 25vw; height: 17vw; border-radius: 20px">
		</div>
	{/each}
</div>

<style>
	.games {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			gap: 1rem;
			/*padding-left: 10vw;*/
			/*padding-right: 10vw;*/
			/*padding-top: 15vw;*/
			top: 3vw;
			position: relative;
	}
	button{
			position: absolute;
			width: 25vw;
			height: 17vw;
			border-radius: 20px;
			background: none;
			border: none;
			cursor: pointer;
	}
</style>