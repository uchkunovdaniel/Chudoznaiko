<script lang="ts">
		let { data } = $props();
</script>

<div class="container">
	<div class="profile">
		<img class="avatar" src="{data.avatar}" alt="User Avatar" />
		<div class="email">
			{data.user?.email}
		</div>
		<button class="changepass">Промени парола</button>
		<button class="logout">Излез</button>
	</div>
	<div class="content">

	</div>
</div>


<style>
	.container{
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		height: 100%;
		padding-left: 10vw;
		padding-top: 8vw;
	}
	.avatar{
			width: 20vw;
	}
	.profile{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 2vw;
	}
	.email{
		font-size: 1.1vw;
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
		width: 21vw;
		background: #CDE8FE;
		border-radius: 10px;
		color: #373737;
		font-family: transforma, sans-serif;
		cursor: pointer;
		border: none;
	}
</style>