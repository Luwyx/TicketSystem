<script>
	import { onMount } from 'svelte';

	let data = null;
	let error = null;

	async function fetchData() {
		try {
			console.log('test');
			const response = await fetch('/api/dashboard'); // Your API endpoint

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const tempData = await response.json();
			console.log(tempData);
			data = tempData[0];
		} catch (err) {
			error = 'Fetch error: ' + err.message;
		}
	}

	onMount(() => {
		fetchData();
	});
</script>

<main class="Test">
	<div class="ScreenCenter">
		<h1>Fovo Fynsk</h1>
		<div class="layout">
			{#if error}
				<div class="error">{error}</div>
			{:else if data}
				<div>
					<h3>Total open tickets:</h3>
					<h3 class="value">{data.total_open_tickets}</h3>
				</div>
				<section>
					<div>
						<h3>Open tickets:</h3>
						<h3 class="value">{data.open_tickets}</h3>
					</div>
					<div>
						<h3>In progress tickets:</h3>
						<h3 class="value">{data.in_progress_tickets}</h3>
					</div>
					<div>
						<h3>Closed tickets:</h3>
						<h3 class="value">{data.closed_tickets}</h3>
					</div>
				</section>

				<div>
					<h3>High priority:</h3>
					<h3 class="value">{data.high_priority_tickets}</h3>
				</div>
			{:else}
				<div>Loading...</div>
			{/if}
		</div>
	</div>
</main>

<style>
	div {
		display: flex;
		align-items: center;
	}

	section {
		margin: 5vh;
		padding: 1vh 1vw;
		border: solid 3px black;
		border-radius: 5px;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.ScreenCenter,
	.layout {
		flex-direction: column;
		justify-content: baseline;
	}

	h1 {
		font-size: 50px;
		font-weight: 700;
	}

	h3 {
		font-size: 30px;
	}

	.error {
		color: red;
	}

	.value {
		background-color: #333;
		color: white;
		border-radius: 5px;
		padding: 5px;
	}
</style>
