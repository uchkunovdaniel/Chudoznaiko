<script lang="ts">
    import user from '$lib/assets/user.svg'
    import logo from '$lib/assets/logo.svg'

    let { showLogin } = $props();

</script>

<div class="container">
    <button id="userbtn" onclick="{showLogin}" >
        <img id="user" src="{user}" alt="user"/>
    </button>
    <div class="text">
        <img src="{logo}" alt="logo" id="logo" />
        <h2>Интерактивна платформа за обучение</h2>
        <button class="start" onclick="{() => scroll(0, window.innerHeight)}">Научи повече</button>
    </div>
</div>
<div class="about">
    <div class="description">
        <p>ЧудоЗнайко е интерактивна образователна платформа, създадена за любопитните малки откриватели на възраст от 3 до 7 години. Чрез завладяващи анимации, увлекателни мини-игри и приятелски настроен чатбот, децата лесно и забавно научават повече за света около тях. Темите обхващат природни явления, научни концепции, социални умения и ежедневни ситуации, представени по достъпен и интерактивен начин. С ЧудоЗнайко ученето се превръща в игра, а сложните въпроси получават ясни и забавни отговори, които развиват детското въображение, логика и знания.</p>
    </div>
    <button class="start" id="start" onclick="{() => {showLogin();window.scrollTo(0,0)}}">Да започнем</button>
</div>

<style>
    .container {
        margin: 0;
        display: flex;
        align-items: center;
        width: 100vw;
        height: 100vh;
        justify-content: center;
        /*padding-left: 5vw;*/
        gap: 15vw;
        z-index: 10;
    }
    .text{
        line-height: 3vh;
        display: flex;
        /*justify-content: center;*/
        align-items: center;
        flex-direction: column;
        z-index: 101;
        /*margin: 0 0 0 5em;*/
    }
    #user{
        position: fixed;
        top: 1em;
        right: 1em;
        user-select: none;
        width: 5vw;
        height: 5vh;
    }
    #userbtn{
        position: fixed;
        top: 0;
        right: 0;
        width: 5vw;
        height: 5vh;
        background: none;
        border: none;
        outline: none;
    }
    h2 {
        grid-column-start: 1;
        /*margin-left: 1em;*/
        font-size: 1.5vw;
        font-family: "transforma_mix",sans-serif;
        font-weight: 400;
        user-select: none;
        /*color: #282626;*/
        color: white;
        /*text-shadow: 0 2px 2px rgba(0, 0, 0, 0.67);*/
    }
    .start {
        /*grid-column-start: 1;*/
        text-align: center;
        margin-top: 1em;
        /*padding: 0;*/
        font-size: 1.25vw;
        color: #373737;
        width: 12vw;
        height: 4vw;
        border: none;
        outline: none;
        font-family: "transforma", sans-serif;
        font-weight: 900;
        background: white;
        /*background: linear-gradient(var(--main) 0%, var(--second-purple) 100%);*/
        backdrop-filter: blur(5px);
        border-radius: 10px;
        /*box-shadow: rgba(0, 0, 0, 0.47) 5px 5px 6px 0, inset -8px -8px 16px 0 rgb(119, 94, 199),*/
        /*inset 0 11px 28px 0 rgb(196, 148, 255);*/
        user-select: none;
        /*box-shadow: rgba(255, 255, 255, 0.38) 0 0 5px;*/
    }
    .start:hover {
      transition: ease 0.25s;
      box-shadow: 5px 7px 0 rgba(0, 0, 0, .6);
    }
    .start:active {
      transform: translate(5px, 7px);
      box-shadow: 0 0 0;
    }
    #logo{
      user-select: none;
    }
    .about{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
        margin-left: 20vw;
    }
    .description{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: #ffffff;
        font-family: 'transforma', sans-serif;
        color: #373737;
        font-size: 1.3vw;
        width: 40vw;
        height: 24vw;
        position: relative;
        border-radius: 10px;
        padding: 1vw;
        text-align: justify;
        transition: ease 0.25s;
        box-shadow: 7px 7px 0 rgba(0, 0, 0, .6);
    }
    #start{
        position: relative;
        /*top: 10vh;*/
        /*left: 65vw;*/
        width: 15vw;
        height: 5vw;
        color: var(--main);
        background: white;
    }
</style>
