<script>
	import { goto } from '$app/navigation';

	function navigate(path) {
		goto(path);
	}
</script>

<div class="Sidebar">
	<h1>Fovo Fynsk</h1>
	<nav>
		<a href="/user">User</a>
		<a href="/tickets">Tickets</a>
		<a href="/sla">SLA</a>
		<a href="/faq">FAQ</a>
	</nav>
</div>

<style>
	.Sidebar {
		background-color: #333;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15vh;
		padding: 15%;
	}

	nav {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10vh;
		/* padding: 0 100px 0; */
		height: max-content;
	}

	a {
		color: white;
		cursor: pointer;
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
		box-sizing: border-box;
	}
</style>
