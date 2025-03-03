<script lang="ts">
    import { fade } from 'svelte/transition';
    import close from '$lib/assets/close.svg';
    import email from '$lib/assets/email.svg';
    import eye from '$lib/assets/eye.svg';
    import hide from '$lib/assets/hide.svg';
    import google from '$lib/assets/google.svg';
    import Login from './login.svelte';

    let { showLogin, form } = $props();

    function showPassword(){
        // eslint-disable-next-line no-undef
        let passwords = document.getElementsByClassName('input-field') as HTMLCollectionOf<HTMLInputElement>;
        let icon = document.getElementById('showPassword') as HTMLImageElement;
        let icon2 = document.getElementById('showPassword2') as HTMLImageElement;

        for(const password of passwords){
            if (password.type === 'password'){
                password.type = 'text';
                icon.src = eye;
                icon2.src = eye;
            }
            else if(password.type === 'text'){
                password.type = 'password';
                icon.src = hide;
                icon2.src = hide;
            }
        }
    }
    let Email = $state('');
    let Password = $state('');
		let PasswordConfirm = $state('');
    let login = $state(false);


</script>

{#if login}
    <Login {showLogin} {form}/>
{:else}
    <div class="register" transition:fade={{duration:100}}>
        <button id="closebtn" onclick="{showLogin}">
            <img class="close" src="{close}" alt="close"/>
        </button>

        <div class="circle"></div>

        <h1>Регистрирай се</h1>

        <form class="input-container" action="?/register" method="POST" id="form">
            <img src="{email}" alt="email" class="input-icon">

            <input bind:value={Email} required autocomplete="email" type="email" placeholder="Имейл" class="input-field" name="email" >

            <img src="{hide}" alt="password" class="input-icon" id="showPassword">

            <button class="input-icon" onclick="{showPassword}" aria-label="show password" style="background: none; border: none;" type="button"></button>

            <input bind:value={Password} required autocomplete="new-password" type="password" placeholder="Парола" class="input-field" id="password" name="password">

            <img src="{hide}" alt="password" class="input-icon" id="showPassword2">
            <button class="input-icon" onclick="{showPassword}" aria-label="show password" style="background: none; border: none;" type="button"></button>

            <input bind:value={PasswordConfirm} required autocomplete="new-password" type="password" placeholder="Потвърди парола" class="input-field" id="password" name="passwordConfirm">
        </form>

        <p>или</p>

        <div class="socials">
            <button style="background: none; width: 2.5vw; height: 2.5vw; display: flex; justify-content: center; align-items: center; border: none;">
                <img src="{google}" alt="Google" id="google"/>
            </button>
        </div>
        <button id="registerbtn" type="submit" form="form">Регистрация</button>

        <button onclick="{() => {login = true}}" style="background: none; border: none;" id="loginbtn">Вече имаш акаунт? <b>Влез тук</b></button>
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

    .register {
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
      top: 2vw;
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
    .input-icon:nth-child(6), .input-icon:nth-child(7) {
      top: 10vw;
      cursor: pointer;
    }

    .input-field {
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

    p{
      padding-top: 1vw;
      color: white;
      font-size: 1.5vw;
      font-family: "transforma", sans-serif;
      font-weight: 500;
      user-select: none;
      text-shadow: rgba(255, 255, 255, 0.65) 0 0 3px;
    }

    .socials{
      display: flex;
      width: 6vw;
      height: 4vw;
      justify-content: center;
      user-select: none;
      position: relative;
      bottom: .5vw;
    }

    .socials img{
      width: 2.5vw;
      height: 2.5vw;
      cursor: pointer;
      background: white;
      border-radius: 50%;
    }


    #registerbtn {
        background: rgba(255, 255, 255, 1);
        width: 13vw;
        height: 4vw;
        border: none;
        border-radius: 0.5rem;
        font-family: "transforma", sans-serif;
        font-size: 1.5vw;
        font-weight: 900;
        color: rgba(148, 56, 254, 1);
        outline: none;
        cursor: pointer;
        transition: ease 0.25s;
        box-shadow: rgba(255, 255, 255, 0.38) 0 0 5px;
        user-select: none;
        padding: 0;
    }
    #registerbtn:hover {
        box-shadow: 5px 7px 0 rgba(0, 0, 0, .5);
    }
    #registerbtn:active {
        transform: translate(5px, 7px);
        box-shadow: 0 0 0;
    }
    #loginbtn{
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
