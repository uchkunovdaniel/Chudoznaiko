<script lang="ts">
	let { data } = $props();

</script>

<div class="heading">
	<h1>Образователни игри</h1>
</div>

<p>{data.name}</p>

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
			position: fixed;
			top: 18vh;
			left: 25vw;
	}
		h1{
			font-size: 2.5vw;
			color: white;
			font-family: "transforma", sans-serif;
			font-weight: 900;
	}
		p{
			font-size: 3vw;
			color: #373737;
			font-family: "transforma_light", sans-serif;
			font-weight: 900;
			text-align: center;
			margin-top: 10vh;
		}
</style>