<!-- Javascript goes here -->
<script>
	import { onMount } from 'svelte';
	import { format } from 'date-fns';
	import { goto } from '$app/navigation';
	let data = [];
	let error = null;

	async function fetchData() {
		try {
			const response = await fetch('/api/tickets'); // Your API endpoint

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
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svgTop"
				><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
					d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
				/></svg
			>
		</button>
		<h1>List of Tickets</h1>
		{#if error}
			<p>{error}</p>
		{:else}
			<div class="ticketFlex">
				<!-- Insert tickets here -->
				{#each data as ticket}
					<hr />
					<article>
						<div class="content">
							<h3>{ticket.header}</h3>
							<p>{ticket.text}</p>
							<p>{format(new Date(ticket.createTime), 'dd-MM-yyyy HH:mm')}</p>
						</div>
						<div class="info">
							<p>{ticket.statusName}</p>
							<p>{ticket.priorityName}</p>
						</div>
						<div class="buttons">
							<button on:click={() => goto(`tickets/${ticket.ticketId}/edit`)}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
									><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
										d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
									/></svg
								>
							</button>
							<button on:click={() => goto(`tickets/${ticket.ticketId}/notes`)}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
									><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
										d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 192H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
									/></svg
								>
							</button>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</body>
</main>

<!-- CSS goes here -->
<style>
	.svgTop {
		fill: white;
		width: 50px;
	}

	.addButton {
		position: absolute;
		top: 3vh;
		right: 4vh;
		height: 50px;
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
</style>
