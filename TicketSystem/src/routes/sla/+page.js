export async function load({ fetch }) {
	const response = await fetch('/api/sla'); // Your API endpoint
	const data = await response.json();
	console.log('Fetched data in +page.js:', data);
	console.log('test: ', data.header);
	return {
		data // Directly return the data object
	};
}
