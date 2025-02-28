<div class="container">
	<h1>404</h1>
	<p>Страницата не е намерена</p>
	<button onclick="{() => {window.location.href = '/home'}}">Начало</button>
</div>

<style>
	:global(body){
		margin: 0;
		padding: 0;
	}
	div{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 100vh;
		user-select: none;
	}
	h1{
		color: var(--main);
		text-align: justify;
		text-shadow: 13px 7px 8.9px rgba(0, 0, 0, 0.25);
		font-family: "transforma", sans-serif;
		font-size: 15vw;
		font-weight: 900;
		margin: 0;
  }
	p{
		color: #000;
		text-align: center;
		font-family: "transforma", sans-serif;
		font-size: 1.5vw;
		font-style: normal;
		font-weight: 900;
	}
	button{
        text-align: center;
        margin-top: 1em;
        font-size: 1.25vw;
        color: white;
        width: 12vw;
        height: 4vw;
        border: none;
        outline: none;
        font-family: "transforma", sans-serif;
        font-weight: 900;
        user-select: none;
				border-radius: 10px;
				background: var(--main);
				box-shadow: 10px 9px 24.2px 0px rgba(0, 0, 0, 0.25);
	}

</style>