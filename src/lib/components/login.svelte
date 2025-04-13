<script lang="ts">
    import { fade } from 'svelte/transition';
    import close from '$lib/assets/close.svg';
    import email from '$lib/assets/email.svg';
    import eye from '$lib/assets/eye.svg';
    import hide from '$lib/assets/hide.svg';
    import google from '$lib/assets/google.svg';
    import Register from './register.svelte';
    import { enhance } from '$app/forms';

    let { showLogin, form } = $props();

    function showPassword(){
        // eslint-disable-next-line no-undef
        let passwords = document.getElementsByClassName('input-field') as HTMLCollectionOf<HTMLInputElement>;
        let icon = document.getElementById('showPassword') as HTMLImageElement;

        for(const password of passwords){
            if (password.type === 'password'){
                password.type = 'text';
                icon.src = eye;
            }
            else if(password.type === 'text') {
                password.type = 'password';
                icon.src = hide;
            }
        }
    }
    let Email = $state('');
    let Password = $state('');
    let register = $state(false);


</script>

{#if register}
    <Register {showLogin} {form} />
{:else}
    <div class="login" transition:fade={{duration:100}}>
    <button id="closebtn" onclick="{showLogin}">
        <img class="close" src="{close}" alt="close"/>
    </button>

    <div class="circle"></div>

    <h1>Влез в профила си</h1>
    {#if form?.success === false}
        <p style="font-size: 1.3vw" id="error">{form.message}</p>
    {/if}
    <form class="input-container" id="form" action="?/login" method="POST" use:enhance>
        <img src="{email}" alt="email" class="input-icon">

        <input bind:value={Email} required type="email" placeholder="Имейл" class="input-field" name="email" >

        <img src="{hide}" alt="password" class="input-icon" id="showPassword">

        <button class="input-icon" onclick="{showPassword}" aria-label="show password" style="background: none; border: none;" type="button"></button>

        <input bind:value={Password} required  type="password" placeholder="Парола" class="input-field" id="password" name="password">

    </form>

    <p>или</p>

    <form class="socials" action="?/google" method="POST">
        <button type="submit" style="background: none; width: 2.5vw; height: 2.5vw; display: flex; justify-content: center; align-items: center; border: none;">
            <img src="{google}" alt="Google" id="google"/>
        </button>

<!--        <button type="submit" name="apple" style="background: none; width: 2.5vw; height: 2.5vw; display: flex; justify-content: center; align-items: center; border: none;">-->
<!--            <img src="{apple}" alt="Apple" id="apple">-->
<!--        </button>-->
    </form>
    <button id="loginbtn" type="submit" form="form">Влез</button>
    <button onclick="{() => {register = true}}" style="background: none; border: none; cursor: pointer;" id="registerbtn">Нямаш акуант? <b>Регистрирай се</b></button>

</div>
{/if}

<style>
    #closebtn, .close {
      width: 1vw;
      height: 1vw;
      background: none;
      position: fixed;
      border: transparent;
      top: 1em;
      right: 1em;
      z-index: 11;
      user-select: none;
    }

    .circle {
      position: fixed;
      width: 1.5vw;
      height: 1.5vw;
      background: rgba(89, 83, 83, 0.45);
      top: .65em;
      right: .63em;
      border-radius: 50%;
      z-index: 10;
      display: none;
    }

    :hover + .circle {
      display: block;
    }

    .login {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 35vw;
      width: 35vw;
      z-index: 10;
      top: 50%;
      transform: translate(-50%, -50%);
      left: 50%;
      background: linear-gradient(315deg, var(--main) 0%, var(--second-purple) 100%);
      border-radius: 0.5rem;
      box-shadow: 0 4px 30px rgb(93, 90, 90);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      border: 1px solid rgba(148, 56, 254, 0.31);
    }

    h1 {
      position: fixed;
      color: white;
      font-size: 2.2vw;
      font-family: "transforma", sans-serif;
      font-weight: 900;
      user-select: none;
      top: 1vw;

      /*text-shadow: rgba(255, 255, 255, 0.65) 0 0 3px;*/
    }

    input[type=email]:focus, input[type="password"]:focus{
      box-shadow: 5px 7px 0 rgba(0, 0, 0, .5);
    }

    .input-container {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 1.5vw;
      top: 1vw;
    }

    .input-icon {
      position: absolute;
      right: 6.5vw;
      top: 1vw;
      width: 1.5vw;
      height: 1.5vw;
      user-select: none;
    }

    .input-icon:nth-child(3), .input-icon:nth-child(4) {
      top: 5.5vw;
      cursor: pointer;
    }

    .input-field{
      background: rgba(255, 255, 255, 1);
      padding-right: 2.5vw;
      padding-left: 1em;
      width: 20vw;
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

    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      50% { transform: translateX(5px); }
      75% { transform: translateX(-5px); }
      100% { transform: translateX(5px); }

    }
    #error{
      animation: shake 0.3s;
      margin: .5vw 0 0 0 ;
      padding: 0 0 .5vw 0;
    }

    p{
      color: white;
      font-size: 1.5vw;
      font-family: "transforma", sans-serif;
      font-weight: 900;
      user-select: none;
      top: 1vw;
      /*text-shadow: rgba(255, 255, 255, 0.65) 0 0 3px;*/
    }

    .socials{
      display: flex;
      width: 6vw;
      height: 4vw;
      justify-content: center;
      user-select: none;
      position: relative;
      bottom: 1vw;
    }

    .socials img{
      width: 2.5vw;
      height: 2.5vw;
      cursor: pointer;
      background: white;
      border-radius: 50%;
    }

    #loginbtn {
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
    }
      #loginbtn:hover {
      box-shadow: 5px 7px 0 rgba(0, 0, 0, .5);
      }

      #loginbtn:active {
      transform: translate(5px, 7px);
      box-shadow: 0 0 0;
    }
    #registerbtn{
        position: absolute;
        bottom: 1vw;
        right: 1vw;
        color: white;
        font-size: 1.2vw;
        font-family: "transforma_light", sans-serif;
        font-weight: 500;
        user-select: none;
    }
</style>
