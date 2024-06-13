import { user, users, status, priority, supportLevel } from '../stores.js';

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
async function loadUsers(fetch) {
    try {
        const response = await fetch('/api/users'); // Your API endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();        
		users.set(data);

      

    } catch (err) {
        error = 'Fetch error: ' + err.message;
        console.error(error);
    }
}
async function loadStatus(fetch) {
    try {
        const response = await fetch('/api/status'); // Your API endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
		status.set(data);

      

    } catch (err) {
        error = 'Fetch error: ' + err.message;
        console.error(error);
    }
}
async function loadPriority(fetch) {
    try {
        const response = await fetch('/api/priority'); // Your API endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
		priority.set(data);

      

    } catch (err) {
        error = 'Fetch error: ' + err.message;
        console.error(error);
    }
}
async function loadSupportLevel(fetch) {
    try {
        const response = await fetch('/api/supportLevel'); // Your API endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
		supportLevel.set(data);

      

    } catch (err) {
        error = 'Fetch error: ' + err.message;
        console.error(error);
    }
}

export async function load({ url, fetch }) {
    await loadUser(fetch);
    await loadUsers(fetch);
    await loadStatus(fetch);
    await loadPriority(fetch);
    await loadSupportLevel(fetch);
     
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
