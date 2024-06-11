<script>
	import { onMount } from 'svelte';
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
	<h2>{data.header}</h2> <!-- Assuming data has a title property -->
	<p>{@html data.text}</p>
	<p>{data.createData}</p>
	<p>{data.version}</p>
{:else}
	<p>Loading...</p> <!-- Or any loading indicator -->
{/if}
