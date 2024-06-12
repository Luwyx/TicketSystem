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
		<h2>Welcome to FAQ</h2>
		<br />
		{#if error}
			<p>{error}</p>
		{:else}
			<div class="faqGrid">
				<!-- Insert tickets here -->
				{#each data as faq}
					<article>
						<h3>{faq.header}</h3>
						<p>{faq.text}</p>
						<p>{format(new Date(faq.createTime), 'dd-MM-yyyy HH:mm')}</p>
						<p>{faq.userId}</p>
					</article>
				{/each}
			</div>
		{/if}
	</body>
</main>

<!-- CSS goes here -->
<style>
	.faqGrid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-auto-rows: 1fr;
		gap: 10px;
		padding: 0 5px;
	}

	article {
		border: 3px solid #666;
		border-radius: 10px;
		padding: 10px;
		aspect-ratio: calc(1 / 1);
		background-color: #666;
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
