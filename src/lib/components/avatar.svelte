<script lang="ts">
		import bow from "$lib/assets/avatars/accessories/accessory1.png";
		import hat from "$lib/assets/avatars/accessories/accessory2.png";
		import eyes1 from "$lib/assets/avatars/eyes/eyes1.png";
		import eyes2 from "$lib/assets/avatars/eyes/eyes2.png";
		import eyes3 from "$lib/assets/avatars/eyes/eyes3.png";
		import eyes4 from "$lib/assets/avatars/eyes/eyes4.png";
		import eyes5 from "$lib/assets/avatars/eyes/eyes5.png";
		import nose1 from "$lib/assets/avatars/noses/nose1.png";
		import nose2 from "$lib/assets/avatars/noses/nose2.png";
		import mouth1 from "$lib/assets/avatars/mouths/mouth1.png";
		import mouth2 from "$lib/assets/avatars/mouths/mouth2.png";
		import mouth3 from "$lib/assets/avatars/mouths/mouth3.png";
		import close from "$lib/assets/close.svg";
		import html2canvas from 'html2canvas';
		import { enhance } from '$app/forms'

		interface arrow {
			img: string | null;
			action?: () => void | undefined;
		}

		class color{
			color: string;
			action: () => void;
			constructor(color: string) {
				this.color = color;
				this.action = () => {
					changeBG(this.color);
				}
			}

		}

		let leftArrows: arrow[] = [];
		let rightArrows: arrow[] = [];

		let colors: color[] = [];

		colors.push(new color("#F283B6"));
		colors.push(new color("orange"))
		colors.push(new color("#FADF63"));
		colors.push(new color("#B1CC74"));
		colors.push(new color("#6B7FD7"));
		colors.push(new color("#545F66"));

		colors.push(new color("#FFE5D9"));
		colors.push(new color("#FAFAC6"));
		colors.push(new color("#E7E08B"));
		colors.push(new color("#D7B377"));
		colors.push(new color("#8F754F"));
		colors.push(new color("#594A26"));



		for(let i = 1; i <= 4; i++){
			leftArrows.push({
				img: "../src/lib/assets/arrowL.svg",
			});
			rightArrows.push({
				img: "../src/lib/assets/arrowR.svg",
			});
		}

		leftArrows[0].action = () => {
			decrement("accessory");
		}
		rightArrows[0].action = () => {
			increment("accessory");
		}

		leftArrows[1].action = () => {
			decrement("eyes");
		}
		rightArrows[1].action = () => {
			increment("eyes");
		}

		leftArrows[2].action = () => {
			decrement("nose");
		}
		rightArrows[2].action = () => {
			increment("nose");
		}

		leftArrows[3].action = () => {
			decrement("mouth");
		}
		rightArrows[3].action = () => {
			increment("mouth");
		}

		function changeBG(color: string){
			const avatar: HTMLDivElement | null = document.querySelector(".avatar")
			avatar!.style.background = color;
		}

		interface Accesssory {
			img: string;
			pos: "center" | "left";
		}
		interface Eyes {
			img: string
		}
		interface Nose {
			img: string
		}
		interface Mouth {
			img: string
		}

		let accessories: Accesssory[] = [{img: bow, pos: 'left'}, {img: hat, pos: 'center'}, {img: "", pos: "center"}];
		let eyes: Eyes[] = [{img: eyes1}, {img: eyes2}, {img: eyes3}, {img: eyes4}, {img: eyes5}];
		let noses: Nose[] = [{img: nose1}, {img: nose2}, {img: ""}];
		let mouths: Mouth[] = [{img: mouth1}, {img: mouth2}, {img: mouth3}];

		let selectedAccessory: Accesssory = accessories[2];
		let selectedEyes: Eyes = eyes[0];
		let selectedNose: Nose = noses[2];
		let selectedMouth: Mouth = mouths[0];

		function decrement(item: string){
			switch (item){
				case "accessory":
						if(accessories.indexOf(selectedAccessory) > 0){
							selectedAccessory = accessories[accessories.indexOf(selectedAccessory) - 1];
						}
						else {
							selectedAccessory = accessories[accessories.length - 1];
						}

					break;
				case "eyes":
						if(eyes.indexOf(selectedEyes) > 0){
							selectedEyes = eyes[eyes.indexOf(selectedEyes) - 1];
						}
						else {
							selectedEyes = eyes[eyes.length - 1];
						}
					break;
				case "nose":
						if(noses.indexOf(selectedNose) > 0){
							selectedNose = noses[noses.indexOf(selectedNose) - 1];
						}
						else {
							selectedNose = noses[noses.length - 1];
						}
					break;
				case "mouth":
						if(mouths.indexOf(selectedMouth) > 0){
							selectedMouth = mouths[mouths.indexOf(selectedMouth) - 1];
						}
						else {
							selectedMouth = mouths[mouths.length - 1];
						}
					break;
			}
		}

		function increment(item: string){
			switch (item) {
				case "accessory":
						if (accessories.indexOf(selectedAccessory) < accessories.length - 1) {
							selectedAccessory = accessories[accessories.indexOf(selectedAccessory) + 1];
						} else {
							selectedAccessory = accessories[0];
						}
					break;
				case "eyes":
						if (eyes.indexOf(selectedEyes) < eyes.length - 1) {
							selectedEyes = eyes[eyes.indexOf(selectedEyes) + 1];
						} else {
							selectedEyes = eyes[0];
						}
					break;
				case "nose":
						if (noses.indexOf(selectedNose) < noses.length - 1) {
							selectedNose = noses[noses.indexOf(selectedNose) + 1];
						} else {
							selectedNose = noses[0];
						}
					break;
				case "mouth":
						if (mouths.indexOf(selectedMouth) < mouths.length - 1) {
							selectedMouth = mouths[mouths.indexOf(selectedMouth) + 1];
						} else {
							selectedMouth = mouths[0];
						}
					break;
			}
		}

		function saveImg() {
			const avatar: HTMLDivElement | null = document.querySelector(".avatar");
			if (avatar) {
				html2canvas(avatar, {backgroundColor: null}).then((canvas) => {
					const data = new FormData();
					data.append('image', canvas.toDataURL('image/png'));
					fetch('/home?/saveimg', {
						method: 'POST',
						body: data,
						headers: {
							'x-sveltekit-action': true
						}
					})

				});
			}
		}

</script>

<div class="container">
	<div class="left">
		{#each leftArrows as arrow}
			<button class="arrow" onclick={arrow.action}>
					<img src={arrow.img} alt="Arrow" />
			</button>
		{/each}
	</div>

	<div class="avatar-container">

		<div class="avatar">
			{#if selectedAccessory.img}
				<img src={selectedAccessory.img} alt="Accessory" class="accessory" style="width: 10rem; height: 10rem ;position: absolute; right: {selectedAccessory.pos === 'center'? '6rem':'1rem'}" />
			{/if}
				<img src="{selectedEyes.img}" alt="Eyes" class="eyes" style="width: 20rem; height: 20rem ;position: absolute; right: .5rem; top: 0"/>
			{#if selectedNose.img}
				<img src="{selectedNose.img}" alt="Nose" class="nose" style="width: 20rem; height: 20rem ;position: absolute; right: .5rem; top: 0"/>
			{/if}
			<img src="{selectedMouth.img}" alt="Mouth" style="width: 30rem; height: 30rem ;position: absolute; right: -4rem; bottom: -1rem"/>
		</div>

		<div class="btns">
			<button class="reset" onclick="{() => {
				changeBG('white');
				selectedAccessory = accessories[2];
				selectedEyes = eyes[0];
				selectedNose = noses[2];
				selectedMouth = mouths[0];
		}}">
				<img src="{close}" alt="close">
			</button>
			<div class="colors">
				{#each colors as color}
					<button aria-label="colorselect" class="color" onclick="{color.action}" style="background: {color.color}"></button>
				{/each}
			</div>
				<button class="save" aria-label="save" onclick="{saveImg}"></button>
		</div>
	</div>

	<div class="right">
		{#each rightArrows as arrow}
			<button class="arrow" onclick={arrow.action}>
					<img src={arrow.img} alt="Arrow"/>
			</button>
		{/each}
	</div>
</div>

<style>
	.btns {
			display: flex;
			justify-content: center;
			gap: 1rem;
			align-items: center;
			flex-direction: row;
			margin-left: 0;
			width: fit-content;
			height: fit-content;
	}
	.avatar-container {
			display: flex;
			/*justify-content: flex-end;*/
			gap: 1rem;
			flex-direction: column;
			align-items: center;
			padding-top: 9rem;
	}
	.container {
			display: flex;
			justify-content: center;
			gap: 3rem;
			align-items: center;
			width: 100vw;
			height: 100vh;
			margin-top: -5rem;
	}
	.colors {
			display: flex;
			justify-content: center;
			padding: 1rem;
			gap: 1rem;
			align-items: flex-start;
			background: var(--accent);
			width: 19rem;
			height: 5rem;
			flex-wrap: wrap;
      border-radius: 1rem;
	}
	.reset, .save {
			background: var(--accent);
			height: 7rem;
			border: none;
			border-radius: 1rem;
			width: 5rem;
			/*margin-right: -10rem;*/
			cursor: pointer;
	}
	.left, .right {
			position: relative;
			/*top: 10vw;*/
			/*margin: auto;*/
			display: flex;
			flex-direction: column;
			width: 5rem;
			gap: 2rem;
			align-items: center;
			margin: -8rem;
	}
	.arrow{
			background: none;
			border: none;
			border-radius: .5rem;
			cursor: pointer;
			width: 3rem;
			height: 3rem;
			justify-content: center;
			display: flex;
			user-select: none;
			z-index: 100;
	}
	.avatar {
			position: relative;
			width: 19rem;
			height: 19rem;
			border-radius: 1rem;
			background: white;
			padding: 1rem;
	}
	.color {
			width: 2rem;
			height: 2rem;
			border-radius: .5rem;
			border: none;
	}
	.reset > img {
			width: 3rem;
			height: 3rem;
	}
</style>