<script lang="ts">
	import sneji from '$lib/assets/sneji.svg'
	import dani from '$lib/assets/dani.svg'
	import arrowS from '$lib/assets/arrowS.svg'
	import arrowD from '$lib/assets/arrowD.svg'
	import { browser } from '$app/environment';

	if(browser) {
		document.title = 'Чудознайко - За нас';

		for(const btn of document.getElementsByClassName('nav-buttons')){
			(btn as HTMLButtonElement).style.outline = 'none';
		}
		(document.getElementsByClassName('nav-buttons')[2] as HTMLButtonElement).style.outline = '2px solid white';
	}
</script>

<div class="label" id="snejilbl">
	<h1>Снежи</h1>
</div>
<img id="arrowS" src="{arrowS}" alt="arrow"/>
<div class="images">
	<div id="sneji" style="background: url({sneji}) no-repeat"></div>
	<div id="dani" style="background: url({dani}) no-repeat"></div>
</div>
<div class="label" id="danilbl">
	<h1>Дани</h1>
</div>
<img id="arrowD" src="{arrowD}" alt="arrow"/>

<div class="about">
	<p>Здравейте! <br><br>Ние сме ученици от Професионална гимназия по електротехника и електроника - гр. Пловдив, специалност “Приложно Програмиране”. Вляво можете да видите Снежи - тя е дизайнер, аниматор и художник, а вдясно виждате Дани, който е програмистът в отбора.
	</p></div>

<style>
		.images{
				user-select: none;
        width: max-content;
        max-height: 40vw;
        display: flex;
        justify-content: flex-end;
        align-items: baseline;
        margin: 6em 0 0 20vw;
        overflow: hidden;
    }
		#sneji{
        width: 13vw;
        height: 70vh;
    }
    #dani{
        width: 14vw;
        height: 70vh;
    }
		.label{
				width: 7vw;
				height: 1.5vw;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				z-index: 1;
				position: absolute;
				font-family: "transforma", sans-serif;
				font-feature-settings: 'ss01';
				font-size: .8vw;
				/*line-height: 1em;*/
				padding: .6em;
				font-weight: 900;
				font-style: normal;
				border-radius: 10px;
				box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
				user-select: none;
		}
		#snejilbl{
				background: #F1CEFE;
				margin: 13vw 0 0 3vw;
		}
		#danilbl{
				background: var(--accent);
				margin: -13vw 0 0 53vw;
		}

		#arrowS{
				width: 10vw;
        height: 8vw;
				position: fixed;
				margin: 12vw 0 0 11vw;
		}
		#arrowD{
				width: 10vw;
				height: 8vw;
				position: fixed;
				margin: -22vw 0 0 49vw;
		}
		.about{
			position: fixed;
			display: flex;
			justify-content: center;
			/*align-items: center;*/
			width: 30vw;
			height: max-content;
			background: var(--accent);
			/*right: 5vw;*/
			/*margin:  0 0 3vw 0;*/
			border-radius: 10px;
			font-family: "transforma_light", sans-serif;
			font-weight: 900;
			font-feature-settings: 'ss01';
			top: 28vh;
			right: 4vw;
			padding: 1vw;
			color: white;
			text-align: left;
			line-height: 4vh;
			font-size: 3vh;
			user-select: none;
	}
</style>
