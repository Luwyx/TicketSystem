<div class="Sidebar">
	<h1>Fovo Fynsk</h1>
	<nav>
		<a href="/User">User</a>
		<a href="/tickets">Tickets</a>
		<a href="/Sla">SLA</a>
		<a href="/Faq">FAQ</a>
	</nav>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

	.Sidebar {
		background-color: #333;
		height: 100vh;
		margin: 0;
	}

	nav {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 15%;
		/* padding: 0 100px 0; */
		height: max-content;
	}

	a {
		color: white;
		cursor: pointer;
		font-family: 'Space mono', monospace;
		font-weight: 400;
		font-style: normal;
		font-size: large;
		text-decoration: none;
		padding: 5px;
	}

	a:hover {
		color: black;
		background-color: white;
		border-radius: 5px;
	}

	h1 {
		color: white;
		font-family: 'Space mono', monospace;
		font-weight: 700;
		font-size: 30px;
	}
</style>
