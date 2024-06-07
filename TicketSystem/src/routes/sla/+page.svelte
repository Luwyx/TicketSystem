<script>
	export let data;
</script>

{#if data}
	<h2>{data.header}</h2>
	<p>{data.text}</p>
	<p>{data.creatData}</p>
	<p>{data.version}</p>
{:else}
	<p>No data available</p>
{/if}
