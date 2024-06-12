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
	<button class="addButton">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
			><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
				d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
			/></svg
		>
	</button>
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
</style>
