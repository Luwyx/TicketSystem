<script>
	import Navbar from '../lib/navbar.svelte';
	import Topbar from '../lib/topbar.svelte';

	export let data;


	
</script>

<div class="grid-container">
	<div class="topbar">
		<Topbar content={data.topbarContent} />
	</div>
	<div class="sidebar">
		<Navbar />
	</div>
	<div class="content">
		<slot />
	</div>
</div>

<style>
	.grid-container {
		display: grid;
		grid-template-rows: 15vh 1fr;
		grid-template-columns: 20vw 1fr;
		min-height: 100vh;
	}
	.topbar {
		grid-row: 1;
		grid-column: 2;
		background-color: #666;
	}
	.sidebar {
		grid-row: 1 / span 2;
		grid-column: 1;
		background-color: #333;
		padding: 1rem;
	}
	.content {
		grid-row: 2;
		grid-column: 2;
		padding: 1rem;
	}
</style>
