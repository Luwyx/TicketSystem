<script>
	import { goto } from '$app/navigation';

	function navigate(path) {
		goto(path);
	}
</script>

<div class="Sidebar">
	<h1><a class="Title" href="./">Fovo Fynsk</a></h1>
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
		gap: 10vh;
		padding: 15%;
	}

	nav {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 8vh;
		/* padding: 0 100px 0; */
		height: max-content;
	}

	a {
		color: white;
		cursor: pointer;
		font-size: 30px;
		text-decoration: none;
		padding: 5px;
		text-align: center;
		text-wrap: nowrap;
	}

	a:hover {
		color: black;
		background-color: white;
		border-radius: 5px;
	}

	h1 {
		color: white;
		font-family: 'Space mono', monospace;
		box-sizing: border-box;
		text-align: center;
	}

	.Title {
		font-size: 40px;
		font-weight: 700;
		padding: 0;
	}
</style>
