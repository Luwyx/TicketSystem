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
		<h1>Welcome to FAQ</h1>
		{#if error}
			<p>{error}</p>
		{:else}
			<div class="faqFlex">
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

	.faqFlex {
		display: flex;
	}

	article {
		border: 3px solid #333;
		border-radius: 5px;
		
	}
</style>
