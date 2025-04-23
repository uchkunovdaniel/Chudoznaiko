<script lang="ts">
		import { browser } from '$app/environment';
		import { enhance } from '$app/forms';
		import send from '$lib/assets/send.svg';
		import defaultAvatar from '$lib/assets/defaultAvatar.png';

		let { data } = $props();

		if (browser){
			for(const btn of document.getElementsByClassName('nav-buttons')){
				(btn as HTMLButtonElement).style.outline = 'none';
		}
			document.title = 'Чудознайко';
			// document.querySelector('.avatar')!.addEventListener('click', () => {
			// 	window.location.href = '/home/avatar';
			// });
		}
</script>

<div class="container">
	<div class="column">
		<div class="animations">
			<h1>Анимации</h1>
			<div class="ai">
				<p>
					Цветните анимации представят научни и социални теми забавно и образователно за децата.
				</p>
			</div>
			<button class="hidden" onclick="{() => {window.location.href = `/home/animations/`}}" aria-label="animation">
				<img src="{data.thumbnailsa[0]}" alt="animations" class="cover">
			</button>
		</div>
		<div class="games">
			<h1>Игри</h1>
			<div class="ai">
				<p>Образователните игри са лесни за навигиране от деца, като развиват тяхната логика, креативност и знания.</p>
			</div>
			<button class="hidden" onclick="{() => {window.location.href = `/home/games/`}}" aria-label="animation">
				<img src="{data.thumbnailsg[0]}" alt="animations" class="cover">
			</button>
		</div>
	</div>
	<div class="profile">
		<h1>Профил</h1>

		<button style="border: none; background: none; cursor: pointer;" onclick="{() => {window.location.href = `/home/avatar/`}}" aria-label="avatar">
			<img class="avatar" src="{data.avatar? data.avatar : defaultAvatar}" alt="avatar">
		</button>

		{#if data.user?.name}
			<h1 id="name" style="text-align: center">Здравей, <br>{data.user.name}</h1>
			<form action="?/removename" method="POST" use:enhance>
				<button class="edit" type="submit">Редактирай</button>
			</form>
		{:else}
			<form method="POST" action="?/name" use:enhance>
				<div class="editname">
					<input type="text"  placeholder="Име" name="name"/>
					<button style="background: none; border: none; cursor: pointer;" type="submit">
						<img src="{send}" alt="send" class="input-icon">
					</button>
				</div>
			</form>
		{/if}
	</div>
</div>

<style>
		.editname{
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			/*gap: 1vw;*/
			background: white;
			padding-right: -100px;
			border-radius: 10px;
		}
		h1{
			font-size: 2.5vw;
			color: black;
			font-family: "transforma", sans-serif;
			font-weight: 900;
			margin: 0;
			user-select: none;
		}
		.container{
				padding-top: 5vw;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				height: fit-content;
				width: 100vw;
		}
		.profile{
			width: 20vw;
			height: 35vw;
			background: #CDE8FE;
			border-radius: 1rem;
			margin: 1vw;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			transition: ease 0.25s;
			color: white;
			padding: 2vw;
			position: relative;
			user-select: none;
			gap: 2vw
		}
		.ai{
			width: 60%;
			height: 50%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		p{
			font-size: 1.5vw;
			font-family: "transforma_light", sans-serif;
			text-align: left;
			user-select: none;
		}
		.hidden{
			position: absolute;
			width: 20vw;
			height: 13vw;
			border-radius: 1rem;
			background: none;
			border: none;
			cursor: pointer;
			/*bottom: 1.5vw;*/
			/*background: red;*/
			right: 34vw;
			/*margin-top: 1vw;*/
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0;
			z-index: 100;
	}
		input{
			position: relative;
      background: rgba(255, 255, 255, 1);
      /*padding-right: 2.5vw;*/
      padding-left: 1em;
      width: 15vw;
      height: 3vw;
      border: none;
      border-radius: 0.5rem;
      outline: none;
      transition: ease 0.25s;
      font-family: "transforma_light", sans-serif;
      font-size: 1.2vw;
      user-select: none;
      box-shadow: rgba(255, 255, 255, 0.38) 0 0 5px;
    }
		.edit{
				background: rgba(255, 255, 255, 1);
        width: 12vw;
        height: 4vw;
        border: none;
        border-radius: 0.5rem;
        font-family: "transforma_light", sans-serif;
        font-size: 1.5vw;
        font-weight: 900;
        /*color: var(--main);*/
        outline: none;
        cursor: pointer;
        transition: ease 0.25s;
        box-shadow: rgba(255, 255, 255, 0.38) 0 0 5px;
        user-select: none;
				position: relative;
				margin-top: 5vw;
        /*top: 6vw ;*/
		}
		.edit:hover{
        box-shadow: 5px 7px 0 rgba(0, 0, 0, .5);
    }
		.edit:active{
        transform: translate(5px, 7px);
        box-shadow: 0 0 0;
    }
		.avatar{
				width: 9vw;
				border-radius: 1rem;
		}
		.input-icon {
      position: relative;
      /*right: 4.5vw;*/
      /*width: 1.5vw;*/
      height: 1.5vw;
      user-select: none;
			/*bottom: 12vw*/
    }
		.column{
				display: flex;
				flex-direction: column;
		}
		.games, .animations{
				height: 14.5vw;
				width: 60vw;
				background: var(--accent);
				border-radius: 1rem;
				display: flex;
				margin: 1vw;
				padding: 2vw;
				flex-direction: column;
				justify-content: center;
		}
		.cover{
				width: 20vw;
				height: 13vw;
				border-radius: 1rem;
				margin: 0;
		}
</style>