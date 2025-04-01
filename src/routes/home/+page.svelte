<script lang="ts">
		import { browser } from '$app/environment';
		import { enhance } from '$app/forms';
		import { createAvatar } from '@dicebear/core';
		import { funEmoji } from '@dicebear/collection';
		import send from '$lib/assets/send.svg';

		let { data } = $props();

		if (browser){
			for(const btn of document.getElementsByClassName('nav-buttons')){
				(btn as HTMLButtonElement).style.outline = 'none';
		}
		document.title = 'Чудознайко';
		}

		const avatar = createAvatar(funEmoji, {
			seed: data.user?.name,
			size: 90,
		});

		const svg = avatar.toDataUri();
		let pfp = $state(svg);
		$effect(() => {
			const avatar = createAvatar(funEmoji, {
				seed: data.user?.id,
				size: 90,
			});
			pfp = avatar.toDataUri();
		});

</script>

<div class="container">
	<div class="animations">
		<h1>Анимации</h1>
		<div class="ai">
			<p>
				Цветните анимации представят научни и социални теми забавно и образователно за децата.
			</p>
		</div>
		<button class="hidden" onclick="{() => {window.location.href = `/home/animations/`}}" aria-label="animation"></button>
		<img src="{data.thumbnailsa[0]}" alt="animations" style="width: 80%; height: 40%; border-radius: 1rem;">
	</div>
	<div class="games">
		<h1>Игри</h1>
		<div class="ai">
			<p>Образователните игри са лесни за навигиране от деца, като развиват тяхната логика, креативност и знания.</p>
		</div>
		<button class="hidden" onclick="{() => {window.location.href = `/home/games/`}}" aria-label="animation"></button>
		<img src="{data.thumbnailsg[0]}" alt="animations" style="width: 80%; height: 40%; border-radius: 1rem;">
	</div>
	<div class="profile">
		<img class="avatar" src="{pfp}" alt="avatar">
		<h1>Здравей,</h1>
		{#if data.user?.name}
			<h1 id="name">{data.user.name}</h1>
			<div class="favourites">
				{#each data.favourites.thumbnails.animations as fav, i}
					<button onclick="{() => {window.location.href = `/home/animations/${data.favourites.ids.animations[i]}`}}" aria-label="animation" style="border: none; background: none; cursor: pointer;">
						<img src="{fav}" alt="favourite" style="width: 5vw; height: 5vw; border-radius: 1em;">
					</button>
				{/each}
				{#each data.favourites.thumbnails.games as fav, i}
					<button onclick="{() => {window.location.href = `/home/games/${data.favourites.ids.games[i]}`}}" aria-label="game" style="border: none; background: none; cursor: pointer;">
						<img src="{fav}" alt="favourite" style="width: 5vw; height: 5vw; border-radius: 1em;">
					</button>
				{/each}
			</div>
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
			color: white;
			font-family: "transforma", sans-serif;
			font-weight: 900;
			margin: 0;
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
		.animations, .games, .profile{
			width: 25vw;
			height: 35vw;
			background: var(--accent);
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
		}
		.ai{
			width: 90%;
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
		}
		.hidden{
			position: absolute;
			width: 20vw;
			height: 13vw;
			border-radius: 1rem;
			background: none;
			border: none;
			cursor: pointer;
			bottom: 1.5vw;
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
        font-family: "transforma", sans-serif;
        font-size: 1.5vw;
        font-weight: 900;
        color: var(--main);
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
				width: 8vw;
				border-radius: 1rem;
				box-shadow: rgba(0, 0, 0, 0.38) 0 0 5px 2px;
    }
		.input-icon {
      position: relative;
      /*right: 4.5vw;*/
      /*width: 1.5vw;*/
      height: 1.5vw;
      user-select: none;
			/*bottom: 12vw*/
    }
		.favourites{
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			gap: 1vw;
			margin-top: 1vw;
		}
</style>