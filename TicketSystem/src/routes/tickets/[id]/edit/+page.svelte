<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { get } from 'svelte/store';
    import { goto } from '$app/navigation';
    import { users, status, priority } from '../../../../stores.js';

    let id = 0;
    let ticket = {};
    let error = null;

    let usersData = [];
    let statusesData = [];
    let prioritiesData = [];


    users.subscribe(value => {
		usersData = value;
	});
    status.subscribe(value => {
		statusesData = value;
	});
    priority.subscribe(value => {
		prioritiesData = value;
	});
    


    async function fetchTicket() {
        try {
            const response = await fetch(`/api/tickets/${id}`); // Your API endpoint

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const tempTicket = await response.json();
            ticket = tempTicket[0];

        } catch (err) {
            error = 'Fetch error: ' + err.message;
        }
    }
    
    async function submitData() {
    try {
        const { assignedUserId, status, priority, header, text } = ticket;
        const dataToSend = { assignedUserId, status, priority, header, text };

        const response = await fetch(`/api/tickets/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok'  + JSON.stringify(dataToSend));
        }
        goto(`/tickets`);
        // Handle successful update (e.g., redirect or show a success message)
    } catch (err) {
        error = 'Submit error: ' + err.message;
    }
}
async function deleteTicket() {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this ticket?");
            if (confirmDelete) {
                const response = await fetch(`/api/tickets/${id}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                goto(`/tickets`);
                // Handle successful deletion (e.g., redirect or show a success message)
            }
        } catch (err) {
            error = 'Delete error: ' + err.message;
        }
    }





    onMount(() => {
        id = get(page).params.id;
        if (id) {
            fetchTicket();
            //fetchUsers();
            //fetchStatus();
            //fetchPriority();
        }
    });
</script>

<!-- HTML goes here -->
<main>
    <h1>Edit Note {id}</h1>
    {#if error}
        <p>{error}</p>
    {:else}
        <form on:submit|preventDefault={submitData}>
            <div>
                <label for="assignedUserId">Assigned User:</label>
                <select id="assignedUserId" bind:value={ticket.assignedUserId}>
                    {#each usersData as user}
                        <option value={user.userId}>{user.firstName} {user.lastName}</option>
                    {/each}
                </select>
            </div>
            <div>
                <label for="status">Status:</label>
                <select id="status" bind:value={ticket.status}>
                    {#each statusesData as status}
                        <option value={status.statusId}>{status.status}</option>
                    {/each}
                </select>
            </div>
            <div>
                <label for="priority">Priority:</label>
                <select id="priority" bind:value={ticket.priority}>
                    {#each prioritiesData as priority}
                        <option value={priority.priorityId}>{priority.priority}</option>
                    {/each}
                </select>
            </div>
            <div>
                <label for="header">Header:</label>
                <input type="text" id="header" bind:value={ticket.header} />
            </div>
            <div>
                <label for="text">Text:</label>
                <textarea id="text" bind:value={ticket.text}></textarea>
            </div>
            <div>
                <button type="submit">Submit</button>
                <button type="button" on:click={deleteTicket}>Delete</button>
                <button type="button" on:click={() => goto(`/tickets`)}>Cancel</button>
            </div>
        </form>
    {/if}
</main>

<!-- CSS goes here -->
<style>
    main {
        padding: 1em;
    }

    form div {
        margin-bottom: 1em;
    }

    label {
        display: block;
        margin-bottom: 0.5em;
    }

    input, select, textarea {
        width: 100%;
        padding: 0.5em;
        font-size: 1em;
    }

    button {
        margin-right: 1em;
        padding: 0.5em 1em;
        font-size: 1em;
    }
</style>
