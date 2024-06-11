// +page.js

export async function load({ fetch }) {
	try {
		const response = await fetch('/api/sla'); // Your API endpoint
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const tempData = await response.json();
		let data = tempData[0];
	  return data;
	} catch (error) {
	  console.error('Error fetching data:', error);
	  
	}
	
  }
