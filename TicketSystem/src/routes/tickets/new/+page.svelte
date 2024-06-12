<script>
    import { goto } from '$app/navigation';
	//import { user } from 'pg/lib/defaults.js';
    import { user, users, status, priority } from '../../../stores.js';


    let usersData = [];
    let statusesData = [];
    let prioritiesData = [];
    let userData = null;


    users.subscribe(value => {
		usersData = value;
	});
    status.subscribe(value => {
		statusesData = value;
	});
    priority.subscribe(value => {
		prioritiesData = value;
	});
    user.subscribe(value => {
		userData = value;
	});

    let ticket = {
        assignedUserId: '',
        status: '',
        priority: '',
        header: '',
        text: '',
        createdUserId: userData.userId
    };

    let error = null;

    async function submitData() {
        try {
            const { assignedUserId, status, priority, header, text } = ticket;

            // Check if any field is empty
            if (!assignedUserId || !status || !priority || !header || !text) {
                throw new Error('All fields are required');
            }

            const response = await fetch(`/api/tickets`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ticket),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok') + JSON.stringify(ticket);
            }
            goto(`/tickets`);
            // Handle successful creation (e.g., redirect or show a success message)
        } catch (err) {
            error = 'Submit error: ' + err.message;
        }
    }
</script>

<!-- HTML goes here -->
<main>
    <h1>Create New Ticket</h1>
    {#if error}
        <p>{error}</p>
    {:else}
        <form on:submit|preventDefault={submitData}>
            <div>
                <label for="assignedUserId">Assigned User:</label>
                <select id="assignedUserId" bind:value={ticket.assignedUserId}>
                    <option value="">Select User</option>
                    {#each usersData as user}
                        <option value={user.userId}>{user.firstName} {user.lastName}</option>
                    {/each}
                </select>
            </div>
            <div>
                <label for="status">Status:</label>
                <select id="status" bind:value={ticket.status}>
                    <option value="">Select Status</option>
                    {#each statusesData as status}
                        <option value={status.statusId}>{status.status}</option>
                    {/each}
                </select>
            </div>
            <div>
                <label for="priority">Priority:</label>
                <select id="priority" bind:value={ticket.priority}>
                    <option value="">Select Priority</option>
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
