<script>
    import { onMount } from 'svelte';
    import { format } from 'date-fns';
    import { page } from '$app/stores';
    import { get } from 'svelte/store';

    let data = [];
    let error = null;
    let id = 0;

    async function fetchData() {
        try {
            const response = await fetch(`/api/notes/${id}`); // Your API endpoint

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            if (Array.isArray(result)) {
                data = result;
            } else {
                data = [];
            }
        } catch (err) {
            error = 'Fetch error: ' + err.message;
        }
    }

    onMount(() => {
        id = get(page).params.id;
        if (id) {
            fetchData();
        }
        
    });
</script>

<!-- HTML goes here -->
<main>
    <h1>Notes for ticket {id}</h1>
    {#if error}
        <p>{error}</p>
    {:else if data.length === 0}
        <p>No notes available.</p>
    {:else}
        <div class="ticketFlex">
            <!-- Insert tickets here -->
            {#each data as note}
                <hr />
                <article>
                    <div class="content">
                        <h3>{note.text}</h3>
                        <p>{note.userId}</p>
                        <p>{format(new Date(note.createTime), 'dd-MM-yyyy HH:mm')}</p>
                    </div>                        
                </article>
            {/each}
        </div>
    {/if}
</main>

<!-- CSS goes here -->
<style>
    .ticketFlex {
        display: flex;
        flex-direction: column;
    }

    article {
        display: grid;
        gap: 5vw;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    div {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .content {
        justify-content: space-evenly;
        grid-column: 1 / 3;
    }

</style>
