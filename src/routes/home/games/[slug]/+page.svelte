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
		<div class="container">
			<form method="POST" action="{data.user?.favourite_animations.includes(data.id) ? '?/delete' : '?/save'}" use:enhance>
				<button class="favbtn" type="submit" name="id" value="{data.id}">
					<img class="favourite" src="{save}" alt="save">
					<span class="save">{data.user?.favourite_animations.includes(data.id) ? "Запазено в любими" : "Запази видео"}</span>
				</button>
			</form>
			<div class="description">{data.description}</div>
		</div>
{:else}
	<p>Game not found</p>
{/if}
<style>
		.description{
			width: 69vw;
			position: relative;
			/*margin: auto;*/
			/*right: 5vw;*/
			/*top: 20vw;*/
			font-size: 1.3vw;
			text-align: justify;
			background: var(--accent);
			padding: 1vw;
			border-radius: 10px;
			font-family: "transforma_regular", sans-serif;
			color: #373737;
			margin-bottom: 1vw;
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
		.save{
			font-size: 1vw;
			font-family: "transforma", sans-serif;
			/*font-weight: 900;*/
			font-feature-settings: 'ss01';
			color: white;
			margin-top: .2vw;
			user-select: none;
		}
		.favbtn{
			position: relative;
			/*left: 14.5vw;*/
			/*top: 4vw;*/
			width: fit-content;
			height: 2vw;
			display: flex;
			justify-content: center;
			align-items: center;
			font-family: transforma, sans-serif;
			border: none;
			border-radius: 5px;
			background: var(--main);
			cursor: pointer;
			color: white;
		}
		.favourite{
			width: 1.4vw;
			height: 1.4vw;
			user-select: none;
			margin-right: .5vw;
    }
		.container{
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				width: fit-content;
				margin: auto;
				flex-direction: column;
				gap: 1vw;
		}
</style>