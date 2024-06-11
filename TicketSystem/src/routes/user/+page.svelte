<!-- Javascript goes here -->
<script>
	//import { SetTopbarContent } from '../+layout.svelte';
	import { onMount } from 'svelte';
	let data = null;
	let error = null;

	async function fetchData() {
		try {
			const response = await fetch('/api/users/1'); // Your API endpoint
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const tempData = await response.json();
			
			data = tempData[0];
			console.log(data);
		} catch (err) {
			error = 'Fetch error: ' + err.message;
		}
	}

	onMount(() => {
		fetchData();
	});
</script>

<!-- HTML goes here -->
<main>
    <body>
        <div class="userspacer">
            <div class="iconholder">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                <!-- Placeholder for username -->
            </div>
            <div class="userinfo">
                {#if data !== null}
                <p>Name: {data.firstName + ' ' + data.lastName}</p>
                <p>Email: {data.email}</p>
                <p>Work Phone: {data.workPhone}</p>
                <p>Private Phone: {data.privatePhone}</p>
                {:else}
                <p>Name: N/A</p>
                <p>Email: N/A</p>
                <p>Work Phone: N/A</p>
                <p>Private Phone: N/A</p>
                {/if}
            </div>
            <div>
                <h2>Current Tickets!</h2>
                {#if data !== null}
                <h3>{data.total_open_tickets}</h3>
                {:else}
                <h3>N/A</h3>
                {/if}
            </div>
        </div>
    </body>
</main>


<!-- CSS goes here -->
<style>

	.userspacer {
		display: flex;
		flex-direction: column;
	}


	.iconholder {
		width: 5vw;
	}



</style>
