<!-- Javascript goes here -->
<script>
	//import { SetTopbarContent } from '../+layout.svelte';
	import { onMount } from 'svelte';
	import { user } from '../../stores.js';

	let data = null;

	user.subscribe((value) => {
		data = value;
	});
</script>

<!-- HTML goes here -->
<main>
	<body>
		<div class="userspacer">
			<div class="user">
				<div class="iconholder">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
						><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
							d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
						/></svg
					>
				</div>
				{#if data !== null}
					<h2>{data.firstName + ' ' + data.lastName}</h2>
				{:else}
					<h2>Name: N/A</h2>
				{/if}
			</div>
			<hr />
			<div class="userinfo">
				<p>
					Name: {#if data !== null && data.firstName !== null && data.lastName !== null}{data.firstName +
							' ' +
							data.lastName}{:else}N/A{/if}
				</p>
				<p>
					Email: {#if data !== null && data.email !== null}{data.email}{:else}N/A{/if}
				</p>
				<p>
					Work Phone: {#if data !== null && data.workPhone !== null}{data.workPhone}{:else}N/A{/if}
				</p>
				<p>
					Private Phone: {#if data !== null && data.privatePhone !== null}{data.privatePhone}{:else}N/A{/if}
				</p>
			</div>
			<hr />
			<div class="tickets">
				<p>Current Tickets:</p>
				<p>
					{#if data !== null && data.total_open_tickets !== null}{data.total_open_tickets}{:else}N/A{/if}
				</p>
			</div>
		</div>
	</body>
</main>

<!-- CSS goes here -->
<style>
	.userspacer {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.user {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.iconholder {
		width: 50px;
	}

	.tickets {
		display: flex;
	}

	h2 {
		font-size: 2em;
	}

	p {
		font-size: 1.5em;
	}
</style>
