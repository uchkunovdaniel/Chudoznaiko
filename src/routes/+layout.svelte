<script lang="ts">
	let { children} = $props();
	import './fonts.css';
	import Mobile from '$lib/components/mobile.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let mobile = $state(false);

	onMount(() => {
		if(browser){
			mobile = window.innerWidth < 768;
			window.addEventListener('resize', () => {
				mobile = window.innerWidth < 768;
			});
		}
	});

</script>
<div class="noerror"></div>
<style>
	.noerror{ display: none }
	:global(:root){
			--main: #9438FE;
			--bgcolor: #fde7fe;
			--accent: #99AAFE;
			--second-purple: #7F5BFF;
	}
	:global(html) {
      height: 100%;
      width: 100%;
      scroll-behavior: smooth;
      position: relative;
  }
	:global(body) {
      margin: 0;
      font-feature-settings: "ss01";
      align-content: center;
      height: 100vh;
      width: 100vw;
      overflow-x: hidden;
      background-attachment: fixed;
      background-repeat: no-repeat;
      backdrop-filter: blur(7px);
      background-size: cover;
  }
</style>

{#if mobile}
	<Mobile />
{:else}
	{@render children()}
{/if}