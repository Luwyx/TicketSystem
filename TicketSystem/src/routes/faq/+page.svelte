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
						<h3>{faq.header}</h3>
						<p>{faq.text}</p>
						<div class="spacer">
							<div>
								<p>{format(new Date(faq.createTime), 'dd-MM-yyyy HH:mm')}</p>
								<p>User ID: {faq.userId}</p>
							</div>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
								><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
									d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
								/></svg
							>
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
		height: 50px;
		width: 50px;
	}

	div {
		display: flex;
	}

	.spacer {
		justify-content: space-between;
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

	button:hover svg {
		fill: white !important;
	}

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
