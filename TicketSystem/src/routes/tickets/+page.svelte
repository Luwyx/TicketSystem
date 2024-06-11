<!-- Javascript goes here -->
<script>
</script>

<!-- HTML goes here -->
<main>
	<body>
		<h1>Welcome to Tickets</h1>
		<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
		<div class="ticketFlex">
			<!-- Insert tickets here -->
			<article>
				<div class="content">
					<h3>{data.header}</h3>
					<p>{data.text}</p>
					<p>{data.createData}</p>
				</div>
				<div class="info">
					<p>{data.status}</p>
					<p>{data.priority}</p>
				</div>
			</article>
		</div>
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
