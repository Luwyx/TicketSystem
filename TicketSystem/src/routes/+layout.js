import { user } from '../stores.js';

let data = null;
let error = null;

async function loadUser(fetch) {
    try {
        const response = await fetch('/api/users/2'); // Your API endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const tempData = await response.json();
        
		data = tempData[0];
		user.set(data);

      

    } catch (err) {
        error = 'Fetch error: ' + err.message;
        console.error(error);
    }
}

export async function load({ url, fetch }) {
    await loadUser(fetch);

    let topbarContent = 'Fovo Fynsk';

    switch (url.pathname) {
        case '/user':
            topbarContent = 'Hi, ' + data.firstName + ' ' + data.lastName + '!';
            break;
        case '/tickets':
            topbarContent = 'Tickets';
            break;
        case '/sla':
            topbarContent = 'SLA';
            break;
        case '/faq':
            topbarContent = 'FAQ';
            break;
    }

    return {
        topbarContent,
        data,
        error
    };
}
