<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let id, name, image = null;

    const convertImageToBase64 = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            image = reader.result;
        }
    }

    const handleSubmit = () => {
        const data = {id, name, image};
        fetch('http://localhost:3000/pokedex', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(() => {
            dispatch('refresh');
            image = null;
            id = "";
            name = "";
        });
    }

</script>

<form class="insert" on:submit|preventDefault={handleSubmit} on:refresh>
    <div class="insert-text">
        <input type="text" bind:value={id} placeholder="ID">
        <input type="text" bind:value={name} placeholder="Name">
    </div>
    {#if image === null}
        <label class="insert-image">
            <input type="file" accept="image/png"
                on:change={(e) => convertImageToBase64(e)}>
            ⇪
        </label>
    {:else}
        <img class="image-preview" src={image}
            height=100 width=100 alt="uploaded preview"/>
    {/if}
    <button>Insert</button>
</form>

<style>
    .insert {
        display: flex;
        justify-content: space-around;
        align-items: center;
        line-height: 100px;
        background-color: #121212;
        padding: 20px 30px;
        margin: auto;
        margin-top: 20px;
        border-radius: 10px;
        width: 40%;
    }

    .insert-text {
        display: flex;
        flex-direction: column;
    }

    input[type='text'] {
        margin: 11px 0;
    }

    input[type='file'] {
        display: none;
    }

    .insert-image {
        display: inline-block;
        padding: 0px;
        border: 1px solid white;
        border-radius: 10px;
        vertical-align: middle;
        text-align: center;
        cursor: pointer;
        height: 100px;
        width: 100px;
        font-size: 30px;
    }

    .insert > button {
        padding: 10px 20px;
        background-color: #ff8d00;
        color: black;
        font-weight: bold;
        border: none;
        border-radius: 10px;
        cursor: pointer;
    }

    .insert > button:hover {
        background-color: #f47100;
    }

</style>