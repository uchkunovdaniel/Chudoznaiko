<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	import search from '$lib/assets/search.svg';
	import '../fonts.css';
	import user from '$lib/assets/user.svg';
	import UserInfo from '$lib/components/userinfo.svelte';
	import { goto } from '$app/navigation'

	let visible = $state(false);
	function showProfile(){
		visible = !visible;
	}

	let { children, data } = $props();

	let Search: string = $state('');


</script>

<header>
	<button onclick="{() => goto('/home')}" style="margin-bottom: .5vw;background: none; border: none; outline: none; width: 15vw; height: 5vw; display: flex; align-items: baseline;">
		<img src="{logo}" alt="Чудознайко" id="logo">
	</button>
	<button id="animations" class="nav-buttons" onclick="{() => goto('/home/animations')}">Анимации</button>
	<button id="games" class="nav-buttons" onclick="{() => goto('/home/games')}">Образователни игри</button>
	<button id="about" class="nav-buttons" onclick="{() => goto('/home/about')}">За нас</button>
	<input type="text" id="search" class="nav-buttons" placeholder="Търсене" bind:value={Search}>
	<img src="{search}" alt="search" id="search-btn">
	<button id="userbtn" onclick="{showProfile}">
		<img id="user" src="{user}" alt="user"/>
	</button>
</header>

{#if visible}
	<UserInfo {showProfile} {data} />
{/if}

<style>
		:global(body){
			margin: 0;
			padding: 0;
			font-family: "transforma", sans-serif;
		}
		header{
			background: var(--main);
			width: 100vw;
			height: 5vw;
			position: fixed;
			top: 0;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			gap: 3.5vw;
			z-index: 100;
			padding-left: 2vw;
			/*view-transition-name: indicator;*/
		}
		#logo{
				width: 15vw;
				height: 5vw;
				margin-bottom: .5vw;
				user-select: none;
		}
		.nav-buttons{
			width: fit-content;
			height: fit-content;
			display: flex;
			background: none;
			color: white;
			font-size: 1.5vw;
			cursor: pointer;
			font-family: "transforma", sans-serif;
			font-weight: 900;
			user-select: none;
			border-radius: 10px;
			border: none;
			line-height: 2.5vw;
			/*box-shadow: rgba(255, 255, 255, 0.38) 0 0 5px;*/
		}
		.nav-buttons:hover{
			outline: 2px solid white;
		}
		#search{
				align-items: center;
				width: 15vw;
				height: fit-content;
				border-radius: 10px;
				border: none;
				outline: none;
				font-family: "transforma_light", sans-serif;
				font-size: 1.5vw;
				line-height: 2.5vw;
				user-select: none;
				padding-left: .5em;
				padding-right: .5em;
				background: var(--bgcolor);
				color: #373737;
				/*margin-left: 8vw;*/
				position: relative;
				right: -3vw;
		}
		#search-btn{
				width: 3vw;
				height: 3vw;
				cursor: pointer;
				/*position: absolute;*/
				right: 1vw;
				user-select: none;
		}
		#userbtn, #user{
        width: 3vw;
        height: 3vw;
        background: none;
        border: none;
        outline: none;
				user-select: none;
    }
</style>

{@render children()}