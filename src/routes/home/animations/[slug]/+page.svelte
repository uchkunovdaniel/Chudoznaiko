<script lang="ts">
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';
	import send from '$lib/assets/send.svg';
	import save from '$lib/assets/save.svg';
	import closeb from '$lib/assets/closeb.svg';
	// import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { browser } from '$app/environment';

	function slideFromBottom(node: Node, {
    delay = 0,
    duration = 400,
    easing = quintOut
	}) {
    return {
      delay,
      duration,
      easing,
      css: (t: number) => `
        transform: translateY(${(1 - t) * 100}%);
        opacity: ${t};
      `
    };
  }
		function slideToBottom(node: Node, {
    delay = 0,
    duration = 400,
    easing = quintOut
  	}) {
    return {
      delay,
      duration,
      easing,
      css: (t: number) => `
        transform: translateY(${(1 - t) * 100}%);
        opacity: ${t};
      `
    };
  }

	let { data, form }: PageProps = $props();

	let visible = $state(false);

	if(browser){
		let input = document.getElementById('prompt');
		input?.addEventListener('focus', () => visible = true);
	}
</script>


<div class="heading">
	{data.name}
</div>
<div class="content">
	<video controls loop>
		<source src="{data.video}" type="video/mp4">
		<track src="" kind="captions">
	</video>
<div class="text">
	<div class="description">
		<p>{data.description}</p>
	</div>
	<form class="prompt" method="POST" action="?/prompt" use:enhance>
		<button style="background: none; border: none; cursor: pointer; position: absolute;" type="submit">
			<img src="{send}" alt="send" class="input-icon">
		</button>
		<input id='prompt' type="text" placeholder="Попитай нашия помощник" name="prompt" autocomplete="off">
		{#if visible}
			<div class="response" in:slideFromBottom={{duration: 500}} out:slideToBottom={{duration: 500}}>
				<img src="{closeb}" alt="closeb" class="input-icon" style="width: 1vw; height: 1vw; position: absolute; right: 1vw; top: 1vw;">
				<button aria-label="close" style="background: none; border: none; cursor: pointer; position: absolute; right: 0; top: 0; width:3vw; height: 3vw" onclick={() => visible = false}></button>
				<span>ЧудоБот</span>
				{form?.response}
			</div>
		{/if}
	</form>
</div>
</div>
<form method="POST" action="?/save" use:enhance>
	<button class="favbtn" type="submit" name="id" value="{data.id}">
		Запази в любими
		<img class="favourite" src="{save}" alt="save">
	</button>
</form>

<style>
	span{
		font-size: 1.5vw;
		font-family: "transforma", sans-serif;
		font-weight: 900;
		font-feature-settings: 'ss01';
		position: absolute;
		top: 1vw;
	}
	video {
		width: 50vw;
		height: 28vw;
		/*height: fit-content;*/
		border-radius: 10px;
		position: relative;
	}
	.heading {
			color: white;
			display: block;
			justify-content: center;
			/*align-items: center;*/
			text-align: center;
      width: 50vw;
			height: fit-content;
			background: var(--accent);
			left: 6.5vw;
			margin:  3vw 0 3vh 0;
			border-radius: 10px;
			position: relative;
			/*line-height: 3.5vw;*/
			font-size: 2.5vw;
			user-select: none;
			top: 0;
	}
	.description{
		padding-left: 1vw;
		padding-right: 1vw;
		line-height: 2vw;
		color: rgb(55, 55, 55);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 28vw;
		height: 40.5vh;
		background: var(--accent);
		flex-direction: column;
		overflow-y: auto;
		text-align: justify;
		/*right: 5vw;*/
		/*top: 4.5vw;*/
		border-radius: 10px;
		position: relative;
		font-family: "transforma_light", sans-serif;
		font-weight: 900;
		font-feature-settings: 'ss01';
		/*top: 28vh;*
		/*padding: 1vw;*/
		font-size: 1.2vw;
	}
	.response{
			padding: 1vw;
			position: absolute;
			top: 12.7vw;
			width: 28vw;
			height: 24vw;
			background: rgba(255, 255, 255, 1);
			border-radius: 0.5rem;
			box-shadow: rgba(255, 255, 255, 0.38) 0 0 5px;
			font-family: "transforma_light", sans-serif;
			font-size: 1.2vw;
			user-select: none;
			display: flex;
			justify-content: center;
			align-items: center;
	}

	input:focus + .response{
			visibility: visible;
	}
	.content{
			display: flex;
			flex-direction: row;
			justify-content:space-evenly;
			/*gap: 10vw;*/
	}
	input {
			position: relative;
			background: rgba(255, 255, 255, 1);
      padding-right: 2.5vw;
      padding-left: 1vw;
      width: 26.5vw;
      height: 5vw;
      border: none;
      border-radius: 0.5rem;
      outline: none;
      transition: ease 0.25s;
      font-family: "transforma_light", sans-serif;
      font-size: 1.2vw;
      user-select: none;
			/*top: 4vw;*/
      box-shadow: rgba(255, 255, 255, 0.38) 0 0 5px;
		/*background: var(--accent)	*/
	}
	.text{
			display: flex;
			flex-direction: column;
			gap: 6vh;
			max-height: 60vh;
			font-family: "transforma", sans-serif;
			font-weight: 900;
			font-feature-settings: 'ss01';
	}
	.input-icon {
      position: absolute;
      left: 27.7vw;
      width: 1.5vw;
      height: 1.5vw;
      user-select: none;
			top: 1.7vw;
			z-index: 100;
    }
		.favourite{
			width: 2vw;
			height: 2vw;
    }
		.favbtn{
			position: relative;
			left: 43vw;
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