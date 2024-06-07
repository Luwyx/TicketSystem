<script>
	let data;
  
	async function fetchData() {
	  const response = await fetch('/api/sla'); // Your API endpoint
	  data = await response.json();
	}
  
	fetchData(); // Call the function to fetch data when the component is initialized
  </script>
  
  {#if data}
	<h2>{data.header}</h2>
	<p>{data.text}</p>
	<p>{data.createDate}</p>
	<p>{data.version}</p>
  {:else}
	<p>Loading...</p> <!-- Or any loading indicator -->
  {/if}
  