<!-- Javascript goes here -->
<script>
	import { onMount } from 'svelte';
	import { format } from 'date-fns';
	import { user } from '../../stores.js';
	let data = [];
	let error = null;
	let faqFunction = '';

	async function fetchData() {
		try {
			const response = await fetch('/api/faq'); // Your API endpoint

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			data = await response.json();
		} catch (err) {
			error = 'Fetch error: ' + err.message;
		}
	}

	let showPopup = false;

	let selectedFaq = null;

	// Function to toggle popup visibility
	function togglePopup(type, faq = null) {
		if (type !== null) {
			if (type === 'new') {
				faqFunction = 'Add faq';
				selectedFaq = null;
				clearForm();
			} else if (type === 'edit') {
				faqFunction = 'Edit faq';
				selectedFaq = faq;
				loadFaqData(faq);
			}
		}
		showPopup = !showPopup;
		if (!showPopup) {
			clearForm(); // Clear the form when closing the popup
		}
	}

	function clearForm() {
		faq.header = '';
		faq.text = '';
	}
	function loadFaqData(faqToEdit) {
		if (faqToEdit) {
			faq = {
				header: faqToEdit.header,
				text: faqToEdit.text,
				userId: faqToEdit.userId
			};
		} else {
			error = 'Faq not found.';
		}
	}

	let userData = null;
	user.subscribe((value) => {
		userData = value;
	});

	let faq = {
		header: '',
		text: '',
		userId: userData.userId
	};

	// Methode to create faq
	async function submitData() {
		try {
			// Check if any field is empty
			if (!faq.text) {
				throw new Error('All fields are required');
			}

			const response = await fetch(`/api/faq`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(faq)
			});
			console.log(faq);

			if (!response.ok) {
				throw new Error('Network response was not ok') + JSON.stringify(faq);
			}
		} catch (err) {
			error = 'Submit error: ' + err.message;
		}
		togglePopup(null);
		fetchData();
	}

	// Methode to update faq
	async function submitEditedData() {
		try {
			const text = faq.text;

			const response = await fetch(`/api/faq/${selectedFaq.faqId}`, {
				method: 'PUT', // Use PUT method for editing existing resource
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(faq) // Send only updated fields
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

	// Methode to delete faq
	async function deleteFaq(faqId) {
		console.log(faqId);
		try {
			const response = await fetch(`/api/faq/${faqId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			// Remove the faq from the data array
			data = data.filter((faq) => faq.faqId !== faqId);
		} catch (err) {
			error = 'Delete error: ' + err.message;
		}
	}

	onMount(() => {
		fetchData();
	});
</script>

<!-- HTML goes here -->
<main>
	<body>
		<button class="addButton" on:click={() => togglePopup('new')}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="addSvg"
				><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
					d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
				/></svg
			>
		</button>

		<!-- Popup -->
		{#if showPopup}
			<div class="popup-container">
				<div class="popup">
					<span class="close" on:click={() => togglePopup(null)}>&times;</span>
					<h2>{faqFunction}</h2>
					<!-- Add faq form -->
					<form>
						<div class="addPopup">
							<label for="faqHeader">Faq header:</label>
							<textarea id="faqHeader" bind:value={faq.header}></textarea>
						</div>
						<div class="addPopup">
							<label for="faqText">Faq Text:</label>
							<textarea id="faqText" bind:value={faq.text}></textarea>
						</div>
						{#if faqFunction === 'Add faq'}
							<button class="popupButton" type="button" on:click={() => submitData()}>Submit</button
							>
						{:else if faqFunction === 'Edit faq'}
							<button class="popupButton" type="button" on:click={() => submitEditedData()}
								>Save</button
							>
						{/if}
					</form>
				</div>
			</div>
		{/if}

		<h2>List of FAQs</h2>
		<br />
		{#if error}
			<p>{error}</p>
		{:else}
			<div class="faqGrid">
				<!-- Insert tickets here -->
				{#each data as faq}
					<article>
						<div class="headerSpacer">
							<h3>{faq.header}</h3>
							<div class="buttons">
								<button on:click={() => togglePopup('edit', faq)}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
										><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
											d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
										/></svg
									>
								</button>
								<button on:click={() => deleteFaq(faq.faqId)}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
										><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
											d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
										/></svg
									>
								</button>
							</div>
						</div>
						<p class="faqText">{faq.text}</p>

						<div class="spacer">
							<p>{format(new Date(faq.createTime), 'dd-MM-yyyy HH:mm')}</p>
							<p>{faq.fullName}</p>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</body>
</main>

<!-- CSS goes here -->
<style>
	svg {
		fill: white;
		height: 25px;
		width: 25px;
	}

	.addSvg {
		height: 50px;
		width: 50px;
	}

	h3 {
		font-weight: 700;
	}

	div {
		display: flex;
	}

	.headerSpacer {
		display: flex;
		justify-content: space-between;
	}

	.spacer {
		justify-content: space-between;
		gap: 15px;
	}

	.faqText {
		margin: 10px 0;
		background-color: #333;
		padding: 10px;
		border-radius: 10px;
	}

	.addButton {
		position: absolute;
		top: 3vh;
		right: 4vh;
	}

	.addPopup {
		display: flex;
		flex-direction: column;
	}

	button {
		background-color: transparent;
		width: 25px;
		height: 25px;
		border: none;
		padding: 5px;
		border-radius: 5px;
	}

	.addButton {
		height: 50px;
		width: 50px;
		border-radius: 15px;
	}

	button:hover {
		background-color: #333;
	}

	button:hover svg {
		fill: white !important;
	}

	.faqGrid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-auto-rows: 1fr;
		gap: 3vh;
		padding: 0 5px;
	}

	article {
		display: grid;
		border: 3px solid #666;
		border-radius: 10px;
		padding: 10px;
		aspect-ratio: calc(1 / 1);
		background-color: #666;
		grid-template-columns: 1fr;
		grid-auto-rows: auto 1fr auto;
	}

	h2 {
		text-align: center;
		font-size: 30px;
	}

	h3,
	p {
		color: white;
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
		flex-direction: column;
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
	}

	.popupButton:hover {
		background-color: #333;
		color: white;
	}
</style>
