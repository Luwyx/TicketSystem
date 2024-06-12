<script>
	import { onMount } from 'svelte';
	import { format } from 'date-fns';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
    import { user } from '../../../../stores.js';

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


    let showPopup = false;

    // Function to toggle popup visibility
    function togglePopup() {
        showPopup = !showPopup;
    }


    let userData = null;
    user.subscribe(value => {
		userData = value;
	});

    let note = {
        text: '',
        userId: userData.userId,
        ticketId: get(page).params.id,
    };
    async function submitData() {
    try {
        const text = note.text; // Corrected access to note's text property

        // Check if any field is empty
        if (!text) {
            throw new Error('All fields are required');
        }

        const response = await fetch(`/api/notes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(note),
        });
        console.log(note);

        if (!response.ok) {
            throw new Error('Network response was not ok') + JSON.stringify(note);
        }
        //goto(`/tickets`);
        // Handle successful creation (e.g., redirect or show a success message)
    } catch (err) {
        error = 'Submit error: ' + err.message;
    }
    togglePopup();
    fetchData();
}

</script>

<!-- HTML goes here -->
<main>
    <button class="addButton" on:click={togglePopup}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
        </svg>
    </button>

    <!-- Popup -->
    {#if showPopup}
    <div class="popup-container">
        <div class="popup">
            <span class="close" on:click={togglePopup}>&times;</span>
            <h2>Add Note</h2>
            <!-- Add note form -->
            <form>
                <div>
                    <label for="noteText">Note Text:</label>
                    <textarea id="noteText" bind:value={note.text}></textarea>
                </div>
                <button type="button" on:click={submitData}>Submit</button>
            </form>            
        </div>
    </div>
    {/if}

    <h1>Notes for ticket {id}</h1>
    <!-- Rest of your HTML content -->
    
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
	svg {
		fill: white;
		height: 50px;
		width: 50px;
	}

	.addButton {
		position: absolute;
		top: 3vh;
		right: 4vh;
	}

	button {
		background-color: transparent;
		width: 50px;
		height: 50px;
		border: none;
		padding: 5px;
		border-radius: 15px;
	}

	button:hover {
		background-color: #333;
	}

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

	.info {
		height: 100%;
		justify-content: space-evenly;
		align-items: center;
	}

	.info p {
		color: white;
		background-color: #333;
		border-radius: 5px;
		padding: 10px;
		text-align: center;
		width: 100%;
	}

	button {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		width: 50px;
		border: none;
		padding: 5px;
		border-radius: 15px;
	}

	button:hover {
		background-color: #333;
	}

	svg {
		fill: #333;
		height: 50px;
	}
	button:hover svg {
		fill: white !important;
	}

     /* Popup styles */
     .popup-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999; /* Ensure the popup is on top */
    }

    .popup {
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
        position: relative;
        z-index: 10000; /* Ensure the popup content is on top */
    }

    .close {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }
</style>
