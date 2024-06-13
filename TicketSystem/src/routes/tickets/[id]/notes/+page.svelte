<script>
	import { onMount } from 'svelte';
	import { format } from 'date-fns';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { user } from '../../../../stores.js';

	let data = [];
	let error = null;
	let id = 0;
	let noteFunction = '';

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

	let selectedNote = null;

	// Function to toggle popup visibility
	function togglePopup(type, note = null) {
		if (type !== null) {
			if (type === 'new') {
				noteFunction = 'Add note';
				selectedNote = null;
				clearForm();
			} else if (type === 'edit') {
				noteFunction = 'Edit note';
				selectedNote = note;
				loadNoteData(note);
			}
		}
		showPopup = !showPopup;
		if (!showPopup) {
			clearForm(); // Clear the form when closing the popup
		}
	}

	function clearForm() {
		note.text = '';
	}
	function loadNoteData(noteToEdit) {
		if (noteToEdit) {
			note = {
				text: noteToEdit.text,
				userId: noteToEdit.userId,
				ticketId: noteToEdit.ticketId
			};
		} else {
			error = 'Note not found.';
		}
	}

	let userData = null;
	user.subscribe((value) => {
		userData = value;
	});

	let note = {
		text: '',
		userId: userData.userId,
		ticketId: get(page).params.id
	};

	// Methode to create note
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
				body: JSON.stringify(note)
			});
			console.log(note);

			if (!response.ok) {
				throw new Error('Network response was not ok') + JSON.stringify(note);
			}
		} catch (err) {
			error = 'Submit error: ' + err.message;
		}
		togglePopup(null);
		fetchData();
	}

	// Methode to update note
	async function submitEditedData() {
		try {
			const text = note.text;
			console.log(selectedNote);
			const response = await fetch(`/api/notes/${selectedNote.noteId}`, {
				method: 'PUT', // Use PUT method for editing existing resource
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ text }) // Send only updated fields
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			togglePopup(null);
			fetchData();
		} catch (err) {
			error = 'Submit error: ' + err.message;
		}
	}

	// Methode to delete note
	async function deleteNote(noteId) {
		console.log(noteId);
		try {
			const response = await fetch(`/api/notes/${noteId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			// Remove the note from the data array
			data = data.filter((note) => note.noteId !== noteId);
		} catch (err) {
			error = 'Delete error: ' + err.message;
		}
	}
</script>

<!-- HTML goes here -->
<main>
	<button class="addButton" on:click={() => togglePopup('new')}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="addSvg">
			<path
				d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
			/>
		</svg>
	</button>

	<!-- Popup -->
	{#if showPopup}
		<div class="popup-container">
			<div class="popup">
				<span class="close" on:click={() => togglePopup(null)}>&times;</span>
				<h2>{noteFunction}</h2>
				<!-- Add note form -->
				<form>
					<div>
						<label for="noteText">Note Text:</label>
						<textarea id="noteText" bind:value={note.text}></textarea>
					</div>
					{#if noteFunction === 'Add note'}
						<button class="popupButton" type="button" on:click={() => submitData()}>Submit</button>
					{:else if noteFunction === 'Edit note'}
						<button class="popupButton" type="button" on:click={() => submitEditedData()}
							>Save</button
						>
					{/if}
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
			<hr />
			<!-- Insert tickets here -->
			{#each data as note}
				<article>
					<div class="content">
						<h3>{note.text}</h3>
						<p>{note.userId}</p>
						<p>{format(new Date(note.createTime), 'dd-MM-yyyy HH:mm')}</p>
					</div>
					<div class="buttons">
						<button on:click={() => togglePopup('edit', note)}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
								><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
									d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
								/></svg
							>
						</button>
						<button on:click={() => deleteNote(note.noteId)}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
								><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
									d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
								/></svg
							>
						</button>
					</div>
				</article>
			{/each}
		</div>
	{/if}
</main>

<!-- CSS goes here -->
<style>
	.addSvg {
		fill: white;
		height: 50px;
		width: 50px;
	}

	.addButton {
		position: absolute;
		top: 3vh;
		right: 4vh;
		width: 50px;
		height: 50px;
	}

	button:hover {
		background-color: #333;
	}

	.ticketFlex {
		display: flex;
		flex-direction: column;
	}

	article {
		display: flex;
		gap: 5vw;
		justify-content: space-between;
		border: 3px solid #333;
		padding: 10px 15px;
		border-radius: 15px;
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.content {
		justify-content: space-evenly;
	}

	button {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		width: 40px;
		height: 40px;
		border: none;
		padding: 5px;
		border-radius: 15px;
	}

	button:hover {
		background-color: #333;
	}

	svg {
		fill: #333;
		height: 35px;
		width: 35px;
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

	span {
		width: 20px;
		height: 20px;
		font-size: 20px;
	}

	.popupButton {
		width: fit-content;
		height: fit-content;
		margin: 10px 0;
		padding: 5px;
		border-radius: 5px;
	}

	.popupButton:hover {
		background-color: #333;
		color: white;
	}
</style>
