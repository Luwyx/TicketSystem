// +page.js

export async function load({ fetch }) {
	try {
	  const response = await fetch('/api/sla'); // Your API endpoint
	  if (!response.ok) {
		throw new Error('Failed to fetch data');
	  }
	  const data = await response.json();
	  return {
		props: {
		  data
		}
	  };
	} catch (error) {
	  console.error('Error fetching data:', error);
	  return {
		props: {
		  data: null
		}
	  };
	}
  }
  