<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let pokemon;

    const handleDelete = () => {
        console.log('delete');
        fetch('http://localhost:3000/pokedex', {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: pokemon.id})
        }).then(() => {
            dispatch('refresh');
        });
    }
</script>

<div class="pokemon-details" on:refresh>
    <div class="pokemon-id" on:dblclick={handleDelete}>#{pokemon.id}</div>
    <div class="pokemon-name">{pokemon.name}</div>
    <img class="pokemon-image" src={`data:image/png;base64, ${pokemon.image}`} alt=""
        height=100 width=100/>
</div>

<style>
    .pokemon-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
        padding: 20px 20px;
        margin: 5px;
        background-color: #121212;
    }
    .pokemon-id {
        font-weight: bold;
        width: 40px;
        cursor: pointer;
    }
    .pokemon-id:hover {
        color: #ff8d00;
    }
    .pokemon-name {
        text-transform: capitalize;
    }
</style>

