<!-- Javascript goes here -->
<script>
	import { onMount } from 'svelte';
	import { format } from 'date-fns';
	let data = [];
	let error = null;

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

	onMount(() => {
		fetchData();
	});
</script>

<!-- HTML goes here -->
<main>
	<body>
		<button class="addButton">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
				><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
					d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
				/></svg
			>
		</button>
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
						</div>
						<p class="faqText">{faq.text}</p>

						<div class="spacer">
							<div class="dateIDSpacer">
								<p>{format(new Date(faq.createTime), 'dd-MM-yyyy HH:mm')}</p>
								<p>User ID: {faq.userId}</p>
							</div>
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
	}

	.dateIDSpacer {
		display: flex;
		justify-content: space-between;
		gap: 5px;
	}

	.faqText {
		margin: 10px 0;
	}

	.addButton {
		position: absolute;
		top: 3vh;
		right: 4vh;
	}

	button {
		background-color: transparent;
		width: 25px;
		height: 25px;
		border: none;
		padding: 5px;
		border-radius: 5px;
	}

	button:hover {
		background-color: #333;
	}

	button:hover svg {
		fill: white !important;
	}

	.faqGrid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-auto-rows: 1fr;
		gap: 2vh;
		padding: 0 5px;
	}

	article {
		border: 3px solid #666;
		border-radius: 10px;
		padding: 10px;
		aspect-ratio: calc(1 / 1);
		background-color: #666;
		grid-template-columns: 1fr;
		grid-auto-rows: 1fr auto 1 fr;
	}

	h2 {
		text-align: center;
		font-size: 30px;
	}

	h3,
	p {
		color: white;
	}
</style>
