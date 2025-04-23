<script lang="ts">
		import { browser } from '$app/environment';

		let { data } = $props();

</script>

<div class="container">
	<div class="profile">
		<img class="avatar" src="{data.avatar}" alt="User Avatar" />
		<div class="email">
			{data.user?.email}
		</div>
		<button class="changepass">Промени парола</button>
		<form action="/home?/logout" method="POST">
			<button class="logout">Излез</button>
		</form>
	</div>
	<div class="content">
		<div class="favourites">
			<h2 class="favlabel">Любими</h2>
			{#each data.favourites.thumbnails.animations.slice(0,2) as thumbnail}
				<img src="{thumbnail}" alt="Thumbnail" style="margin-top: 3vw"/>
			{/each}
		</div>
		<div class="badges">
			<h2 class="badgelabel">Значки</h2>
			<h1 style="margin-top: 3vw">Нямате значки</h1>
		</div>
	</div>
</div>


<style>
	.container{
		display: flex;
		/*flex-direction: column;*/
		align-items: center;
		gap: 3vw;
		width: 100%;
		height: 100%;
		padding-left: 10vw;
		margin-top: 2vw;
		/*padding-top: 3vw;*/
	}
	.avatar{
			width: 18vw;
	}
	.profile{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 2vw;
		/*margin-top: 7vw;*/
	}
	.email{
		font-size: 1vw;
		line-height: 3vw;
		/*height: 3vw;*/
		padding: 1vw;
		background: var(--accent);
		border-radius: 10px;
		color: #373737;
		font-family: transforma, sans-serif;
		/*margin-top: 1rem;*/
	}
	.changepass, .logout{
		font-size: 1.4vw;
		line-height: 3vw;
		padding: 1vw;
		width: 19vw;
		background: #CDE8FE;
		border-radius: 10px;
		color: #373737;
		font-family: transforma, sans-serif;
		cursor: pointer;
		border: none;
	}
	.favourites, .badges{
		display: flex;
		align-items: center;
		background: var(--accent);
		width: 55vw;
		height: 18.5vw;
		justify-content: flex-start;
		border-radius: 10px;
		padding-left: 2vw;
	}
	.content{
			display: flex;
			flex-direction: column;
			gap: 2vw;
			align-items: center;
			justify-content: center;
	}
	.favourites > img {
			width: 20vw;
			border-radius: 10px;
	}
	h2{
			position: absolute;
			font-family: transforma_regular, sans-serif;
	}
	.favlabel{
			top: 7vw
	}
	.badgelabel{
			top: 28vw;
	}
</style>