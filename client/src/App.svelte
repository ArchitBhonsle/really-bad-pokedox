<script>
	import { scale } from "svelte/transition";
	import { flip } from "svelte/animate"
	import AddPokemon from "./AddPokemon.svelte"
	import Pokemon from "./Pokemon.svelte";

	let pokedex = [];


	const loadDatabase = () => fetch('http://localhost:3000/pokedex')
		.then(response => response.json())
		.then(pokemonInDatabase => {
			pokedex = pokemonInDatabase;
	});
	loadDatabase();
</script>

<main>
	<AddPokemon on:refresh={loadDatabase}/>
	<div class="pokemon-list">
		{#each pokedex as pokemon (pokemon.id)}
			<div animate:flip={{duration: 400}} transition:scale>
				<Pokemon {pokemon} on:refresh={loadDatabase}/>
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		padding: 0 15%;
		margin: 0 auto;
	}
	.pokemon-list {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		padding: 20px 0;
	}
</style>