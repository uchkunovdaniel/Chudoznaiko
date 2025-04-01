<script lang="ts">
    import { fade } from 'svelte/transition';
    import close from '$lib/assets/close.svg';

    let { showProfile, data } = $props()

</script>

<div class="userinfo" transition:fade={{duration:100}}>
    <button id="closebtn" onclick="{showProfile}">
        <img class="close" src="{close}" alt="close"/>
    </button>

    <div class="circle"></div>

    <h1>Профил</h1>

    <p>Здравей, {data.user.name}</p>
    <p></p>
    <p>Имейл: {data.user.email}</p>
    <p></p>
    <form action="/home?/logout" method="POST">
        <button id="logoutbtn" type="submit" name="logout">Излез</button>
    </form>
</div>

<style>
    #closebtn, .close{
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

    .circle{
        position: fixed;
        width: 1.5vw;
        height: 1.5vw;
        background: rgba(89, 83, 83, 0.45);
        top: .65em;
        right: .65em;
        border-radius: 50%;
        z-index: 10;
        display: none;
    }

    :hover + .circle{
        display: block;
    }

    .userinfo{
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 35vw;
        width: 35vw;
        z-index: 1100;
        top: 55%;
        transform: translateY(-50%);
        right: 6.5vw;
        background: linear-gradient(315deg, var(--main) 0%, var(--second-purple) 100%);
        border-radius: 0.5rem;
        box-shadow: 0 4px 30px rgb(93, 90, 90);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(148, 56, 254, 0.31);
    }

    h1{
        position: fixed;
        color: white;
        font-size: 2.2vw;
        font-family: "transforma", sans-serif;
        font-weight: 900;
        user-select: none;
        top: 1vw;
        /*text-shadow: rgba(255, 255, 255, 0.65) 0 0 3px;*/
    }

    #logoutbtn{
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

    #logoutbtn:hover{
        box-shadow: 5px 7px 0 rgba(0, 0, 0, .5);
    }

    #logoutbtn:active{
        transform: translate(5px, 7px);
        box-shadow: 0 0 0;
    }

    p{
        color: white;
        font-size: 1.5vw;
        font-family: "transforma", sans-serif;
        font-weight: 900;
        user-select: none;
        text-align: left    ;
    }
</style>