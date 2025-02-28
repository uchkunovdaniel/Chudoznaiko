<script lang="ts">
    import Landing from "$lib/components/landing.svelte";
    import Login from "$lib/components/login.svelte";
    // import Register from "$lib/components/register.svelte";

    let { form } = $props();
    let visible = $state(false);

    function showLogin(){
        if (!visible){
            visible = true;
            document.getElementsByClassName('text')[0].setAttribute('style', 'visibility: hidden');
        }
        else{
            visible = false;
            document.getElementsByClassName('text')[0].setAttribute('style', 'visibility: visible');
        }
    }
</script>
<div class="bg">
    {#if visible}
        <Login {showLogin} {form} />
    {/if}

    <Landing {showLogin} />
</div>

<style>
    .bg{
        width: 100vw;
        height: 200vh;
        background: url("/src/lib/assets/background.webp") var(--accent) no-repeat center center/cover;
        z-index: 100;
    }
</style>