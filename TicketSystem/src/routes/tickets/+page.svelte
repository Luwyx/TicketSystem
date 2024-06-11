<!-- Javascript goes here -->
<script>
	import { onMount } from 'svelte';
	import { format } from 'date-fns';
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
		<h1>Welcome to Tickets</h1>
		{#if error}
			<p>{error}</p>
		{:else}
			<div class="ticketFlex">
				<!-- Insert tickets here -->
				{#each data as ticket}
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
					</article>
				{/each}
			</div>
		{/if}
	</body>
</main>

<!-- CSS goes here -->
<style>
	.ticketFlex {
		display: flex;
		flex-direction: column;
	}

	article {
		display: flex;
		gap: 5vw;
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.content {
		justify-content: space-evenly;
	}

	.info {
		height: 100%;
		justify-content: space-evenly;
	}

	.info p {
		color: white;
		background-color: #333;
		border-radius: 5px;
		padding: 5px;
	}
</style>
