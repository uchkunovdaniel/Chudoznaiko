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


<div class="animations">
	{#each data.animations as animation, i}
		<div class="animation">
			<button onclick="{() => {window.location.href = `/home/animations/${animation.video[0]}`}}" aria-label="{animation.video[0]}"></button>
			<img src="{data.thumbnails[i]}" alt="animation" style="width: 25vw; height: 17vw; border-radius: 20px">
		</div>
	{/each}
</div>

<style>
	.animations {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			gap: 1rem;
			/*padding-left: 10vw;*/
			/*padding-right: 10vw;*/
			/*padding-top: 15vw;*/
			top: -8vw;
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