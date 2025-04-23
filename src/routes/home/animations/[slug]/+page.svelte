<script lang="ts">
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';
	import send from '$lib/assets/send.svg';
	import save from '$lib/assets/save.svg';
	import saved from '$lib/assets/saved.svg';

	let { data, form }: PageProps = $props();

	function toggle() {
		const description = document.querySelector('.description') as HTMLElement;
		if(description.style.zIndex == "1"){
			description.style.zIndex = "0";
		}
		else{
			description.style.zIndex = "1";
		}
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

	<div class="response">
		<button class="desc" onclick="{toggle}">Описание</button>
		<span style="right: 3.5vw">ЧудоБот</span>
		<p>{form?.response}</p>
		<form class="prompt" method="POST" action="?/prompt" use:enhance>
			<button style="background: none; border: none; cursor: pointer; position: absolute;" type="submit">
				<img src="{send}" alt="send" class="input-icon">
			</button>
			<input id='prompt' type="text" placeholder="Попитай нашия помощник" name="prompt" autocomplete="off">
		</form>
	</div>
	<div class="description">
		<span style="left: 3.5vw">Описание</span>
		<button class="res" onclick="{toggle}">ЧудоБот</button>
		<p>{data.description}</p>
	</div>
	</div>
<form method="POST" action="{data.user?.favourite_animations.includes(data.id) ? '?/delete' : '?/save'}" use:enhance>
	<button class="favbtn" type="submit" name="id" value="{data.id}" style="color: {data.user?.favourite_animations.includes(data.id) ? 'var(--main)' : '#373737'}">
		{data.user?.favourite_animations.includes(data.id) ? "Запазено в любими" : "Запази в любими"}
		<img class="favourite" src="{data.user?.favourite_animations.includes(data.id) ? saved : save}" alt="save">
	</button>
</form>

<style>
	span{
		font-size: 1.5vw;
		font-family: "transforma", sans-serif;
		font-weight: 900;
		font-feature-settings: 'ss01';
		position: absolute;
		top: .5vw;
		/*background: red;*/
		/*width: inherit;*/
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
		height: 57vh;
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
		z-index: 0;
	}
	.response{
			padding: 1vw 1vw 0 1vw;
			position: absolute;
			/*top: 12.7vw;	*/
			width: 28vw;
			height: 27vw;
			background: var(--accent);
			border-radius: 0.5rem;
			/*box-shadow: rgba(255, 255, 255, 0.38) 0 0 5px;*/
			font-family: "transforma_light", sans-serif;
			font-size: 1.2vw;
			user-select: none;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			z-index: 1;
			right: 6.69vw;
			flex-direction: column;
			gap: 3vw;
			/*overflow-y: auto;*/
	}
	.content{
			display: flex;
			flex-direction: row;
			justify-content:space-evenly;
			/*gap: 10vw;*/
	}
	input {
			position: relative;
			background: var(--accent);
      padding-right: 2.5vw;
      padding-left: 1vw;
      width: 26.5vw;
      height: 5vw;
      border: none;
      border-radius: 0.5rem;
      outline: none;
      font-family: "transforma_light", sans-serif;
      font-size: 1.2vw;
      user-select: none;
			text-align: center;
			/*top: 4vw;*/
      /*box-shadow: rgba(255, 255, 255, 0.38) 0 0 5px;*/
			/*z-index: 1000;*/
		/*background: var(--accent)	*/
	}

	.input-icon {
      position: absolute;
      left: 27.7vw;
      width: 1.5vw;
      height: 1.5vw;
      user-select: none;
			top: 1.7vw;
			z-index: 1010;
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
		.desc{
			width: 15vw;
			height: 3vw;
			background: white;
			/*border-radius: 50%;*/
			position: absolute;
			top: 0;
			left: 0;
			border: 3px solid rgba(55, 55, 55, 0.37);
			border-top-left-radius: 0.5rem;
			border-bottom-right-radius: .5rem;
			font-size: 1.5vw;
			font-family: "transforma", sans-serif;
			font-weight: 900;
			font-feature-settings: 'ss01';
		}
		.res{
			width: 15vw;
			height: 3vw;
			background: white;
			/*border-radius: 50%;*/
			position: absolute;
			top: 0;
			right: 0;
			border: 3px solid rgba(55, 55, 55, 0.37);
			border-top-right-radius: 0.5rem;
			border-bottom-left-radius: .5rem;
			font-size: 1.5vw;
			font-family: "transforma", sans-serif;
			font-weight: 900;
			font-feature-settings: 'ss01';
		}
</style>