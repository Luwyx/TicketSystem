export async function load({ fetch }) {
	const response = await fetch('../api/sla/');
	const data = await response.json();

	return {
		props: {
			data
		}
	};
}
