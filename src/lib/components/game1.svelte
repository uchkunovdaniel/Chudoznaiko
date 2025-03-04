<script lang="ts">
    interface AnimalPair {
        animal: string;
        food: string;
    }

    const ANIMAL_PAIRS: AnimalPair[] = [
        { animal: 'Видра', food: 'Червей' },
        { animal: 'Катерица', food: 'Жълъд' },
        { animal: 'Мечка', food: 'Мед' },
    ];

    let animals: string[] = [];
    let foods: string[] = [];
    let matchedPairs: string[] = [];
    let selectedAnimal: string | null = null;
    let selectedFood: string | null = null;
    let error: boolean = false;

    function shuffle<T>(array: T[]): T[] {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    function initializeGame(): void {
        const shuffledPairs = shuffle([...ANIMAL_PAIRS]);

        animals = shuffledPairs.map(pair => pair.animal);
        foods = shuffle([...ANIMAL_PAIRS.map(pair => pair.food)]);
        matchedPairs = [];
        selectedAnimal = null;
        selectedFood = null;
        error = false;
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
                pair => pair.animal === selectedAnimal && pair.food === selectedFood
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

    initializeGame();
</script>


<div class="game-container">
    {#if matchedPairs.length === ANIMAL_PAIRS.length * 2}
        <div class="win-message">
            <h2>Поздравления! Печелиш! 🎉</h2>
            <button on:click={initializeGame}>Играй пак</button>
        </div>
    {:else}
        <div class="columns">
            <div class="animals">
                {#each animals as animal}
                    <button
                        class:selected={selectedAnimal === animal}
                        class:matched={matchedPairs.includes(animal)}
                        class:shake={error && selectedAnimal === animal}
                        on:click={() => handleAnimalClick(animal)}
                    >
                        {animal}
                    </button>
                {/each}
            </div>

            <div class="foods">
                {#each foods as food}
                    <button
                        class:selected={selectedFood === food}
                        class:matched={matchedPairs.includes(food)}
                        class:shake={error && selectedFood === food}
                        on:click={() => handleFoodClick(food)}
                    >
                        {food}
                    </button>
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    .game-container {
        max-width: 800px;
        margin: 2rem auto;
        padding: 20px;
        text-align: center;
    }

    .columns {
        display: flex;
        justify-content: space-around;
        margin: 2rem 0;
    }


    button {
        display: block;
        margin: 10px;
        padding: 15px 25px;
        font-size: 18px;
        cursor: pointer;
        background-color: #ffffff;
        border: 2px solid #ccc;
        border-radius: 8px;
        transition: all 0.3s ease;
				width: 13vw;
				font-family: transforma, sans-serif;
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