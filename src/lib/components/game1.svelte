<script lang="ts">
    import bear from "/src/lib/assets/bear.svg";
    import honey from "/src/lib/assets/honey.svg";

    import otter from "/src/lib/assets/otter.svg";
    import worm from "/src/lib/assets/worm.svg";

    import squirrel from "/src/lib/assets/squirrel.svg";
    import acorn from "/src/lib/assets/acorn.svg";

    import cat from "/src/lib/assets/cat.svg";
    import catfood from "/src/lib/assets/catfood.svg";

    import dog from "/src/lib/assets/dog.svg";
    import dogfood from "/src/lib/assets/dogfood.svg";

    import duck from "/src/lib/assets/duck.svg";
    import rabbit from "/src/lib/assets/rabbit.svg";
    import elephant from "/src/lib/assets/elephant.svg";
    import grass from "/src/lib/assets/grass.svg";

    import frog from "/src/lib/assets/frog.svg";
    import fly from "/src/lib/assets/fly.svg";

    import seal from "/src/lib/assets/seal.svg";
    import penguin from "/src/lib/assets/penguin.svg";
    import fish from "/src/lib/assets/fish.svg";

    import { browser } from '$app/environment';

    interface AnimalPair {
        animal: {
            name: string;
            file: string;
        };
        food: {
            name: string;
            file: string;
        };
    }

    const ANIMAL_PAIRS: AnimalPair[] = [
        { animal: { name: 'Видра', file: otter }, food: { name: 'Червей', file: worm } },
        { animal: { name: 'Катерица', file: squirrel }, food: { name: 'Жълъд', file: acorn } },
        { animal: { name: 'Мечка', file: bear }, food: { name: 'Мед', file: honey } },
        { animal: { name: 'Котка', file: cat }, food: { name: 'Котешка храна', file: catfood } },
        { animal: { name: 'Куче', file: dog }, food: { name: 'Кучешка храна', file: dogfood } },
        { animal: { name: 'Пате', file: duck }, food: { name: 'Трева', file: grass } },
        { animal: { name: 'Зайче', file: rabbit }, food: { name: 'Трева', file: grass } },
        { animal: { name: 'Слон', file: elephant }, food: { name: 'Трева', file: grass } },
        { animal: { name: 'Жаба', file: frog }, food: { name: 'Муха', file: fly } },
        { animal: { name: 'Тюлен', file: seal }, food: { name: 'Риба', file: fish } },
        { animal: { name: 'Пингвин', file: penguin }, food: { name: 'Риба', file: fish } }
    ];

    let matchedPairs: string[] = $state([]);
    let selectedAnimal: string | null = $state(null);
    let selectedFood: string | null = $state(null);
    let error: boolean = $state(false);
    let shuffledAnimals: AnimalPair[] = $state([]);
    let shuffledFoods: AnimalPair[] = $state([]);

    function shuffle<T>(array: T[]): T[] {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    let selectedPairs: AnimalPair[] = $state([]);
    let gameStarted: boolean = $state(false); // New flag to track if the game has started

    function initializeGame(): void {
        selectedPairs = [];
        const usedFoods: Set<string> = new Set();

        while (selectedPairs.length < 3) {
            const pair = ANIMAL_PAIRS[Math.floor(Math.random() * ANIMAL_PAIRS.length)];
            if (!usedFoods.has(pair.food.name)) {
                selectedPairs.push(pair);
                usedFoods.add(pair.food.name);
            }
        }

        shuffledAnimals = shuffle([...selectedPairs]);
        shuffledFoods = shuffle([...selectedPairs]);

        matchedPairs = [];
        selectedAnimal = null;
        selectedFood = null;
        error = false;
        gameStarted = true; // Set the flag to true after initialization
    }
    function handleAnimalClick(animal: string): void {
        if (matchedPairs.includes(animal)) return;
        selectedAnimal = selectedAnimal === animal ? null : animal;
        error = false;
    }

    function handleFoodClick(food: string): void {
        if (matchedPairs.includes(food)) return;
        selectedFood = selectedFood === food ? null : food;

        if (selectedAnimal && selectedFood) {
            const isValidPair = ANIMAL_PAIRS.some(
                pair => pair.animal.name === selectedAnimal && pair.food.name === selectedFood
            );

            if (isValidPair) {
                matchedPairs = [...matchedPairs, selectedAnimal, selectedFood];
                error = false;
            } else {
                error = true;
                setTimeout(() => {
                    error = false;
                }, 1000);
            }

            selectedAnimal = null;
            selectedFood = null;
        }
    }

    if (browser) {
        initializeGame();
    }
</script>
<div class="game-container">
    {#if matchedPairs.length === selectedPairs.length * 2 && gameStarted}
        <div class="win-message">
            <h2>Поздравления! Печелиш! 🎉</h2>
            <button onclick={initializeGame} style="height: 5vw">Играй пак</button>
        </div>
    {:else}
        <div class="animals">
            {#each shuffledAnimals as pair}
                <button
                    class:selected={selectedAnimal === pair.animal.name}
                    class:matched={matchedPairs.includes(pair.animal.name)}
                    class:shake={error && selectedAnimal === pair.animal.name}
                    onclick={() => handleAnimalClick(pair.animal.name)}>

                    <img class="image" src="{pair.animal.file}" alt="{pair.animal.name}" />
                </button>
            {/each}
        </div>

        <div class="foods">
            {#each shuffledFoods as pair}
                <button
                    class:selected={selectedFood === pair.food.name}
                    class:matched={matchedPairs.includes(pair.food.name)}
                    class:shake={error && selectedFood === pair.food.name}
                    onclick={() => handleFoodClick(pair.food.name)}
                >
                    <img class="imagef" src="{pair.food.file}" alt="{pair.food.name}" style="width: fit-content" />
                </button>
            {/each}
        </div>
    {/if}
</div>

<style>
    .image {
        display: block;
        width: 11vw;
        height: 11vw;
        margin-right: auto;
        margin-left: auto;
    }

    .imagef{
        display: block;
        width: 5vw;
        height: 5vw;
        margin-right: auto;
        margin-left: auto;
    }
    .animals, .foods {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .game-container {
        max-width: fit-content;
        max-height: 500px;
        margin: 15vw 2vw;
        padding: 20px;
        text-align: center;
    }

    button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 10px;
        gap: 1vw;
        font-size: 18px;
        cursor: pointer;
        background-color: #ffffff;
        border: 2px solid #ccc;
        border-radius: 8px;
        transition: all 0.3s ease;
        width: 13vw;
        height: 18vw;
        font-family: transforma, sans-serif;
        user-select: none;
        text-align: center;
    }

    button.selected {
        background-color: var(--main);
        color: white;
        border-color: var(--second-purple);
    }

    button.matched {
        background-color: var(--accent);
        color: white;
        border-color: var(--accent);
        cursor: not-allowed;
    }

    button.shake {
        animation: shake 0.5s;
        background-color: #ff4444;
        color: white;
        border-color: #cc0000;
    }

    .win-message {
        padding: 20px;
        background-color: var(--accent);
        border-radius: 10px;
        margin: 20px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }

    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        50% { transform: translateX(10px); }
        75% { transform: translateX(-10px); }
        100% { transform: translateX(0); }
    }
</style>