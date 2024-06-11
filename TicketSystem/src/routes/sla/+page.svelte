<script>
	import { onMount } from 'svelte';
	import { format } from 'date-fns';
	let data = null;
	let error = null;

	async function fetchData() {
		try {
			const response = await fetch('/api/sla'); // Your API endpoint
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const tempData = await response.json();
			data = tempData[0];
		} catch (err) {
			error = 'Fetch error: ' + err.message;
		}
	}

	onMount(() => {
		fetchData();
	});
</script>

{#if error}
	<p>{error}</p>
{:else if data}
	<h2>{data.header}</h2>
	<!-- Assuming data has a title property -->
	<p>{@html data.text}</p>
	<div>
		<p>{format(new Date(data.createData), 'dd-MM-yyyy HH:mm')}</p>
		<p>{data.version}</p>
	</div>
{:else}
	<p>Loading...</p>
	<!-- Or any loading indicator -->
{/if}

<style>
	div {
		display: flex;
		justify-content: space-between;
	}
</style>
