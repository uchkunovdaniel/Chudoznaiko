<script lang="ts">
	import { browser } from '$app/environment';

	let { data } = $props();

	if(browser) {
		document.title = 'Чудознайко - Анимации';

		for(const btn of document.getElementsByClassName('nav-buttons')){
			(btn as HTMLButtonElement).style.outline= 'none';
		}
		(document.getElementsByClassName('nav-buttons')[0] as HTMLButtonElement).style.outline = '2px solid white';

	}
</script>

<div class="heading">
	<h1>Анимации</h1>
</div>

<div class="animations">
	{#each data.animations as animation, i}
		<div class="animation">
			<button onclick="{() => {window.location.href = `/home/animations/${animation.video[0]}`}}" aria-label="{animation.video[0]}"></button>
			<img src="{data.thumbnails[i]}" alt="animation" style="width: 20vw; height: 13vw; border-radius: 20px">
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
			font-size: 3vw;
			color: white;
			font-family: "transforma", sans-serif;
			font-weight: 900;
	}
	.animations {
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