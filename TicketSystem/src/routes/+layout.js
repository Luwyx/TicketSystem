export async function load({ url }) {
	let topbarContent = 'Fovo Fynsk';

	if (url.pathname === '/user') {
		// topbarContent = 'Hi, ' + UserName + '!';
	} else if (url.pathname === '/tickets') {
		topbarContent = 'Tickets';
	} else if (url.pathname === '/sla') {
		topbarContent = 'SLA';
	} else if (url.pathname === '/faq') {
		topbarContent = 'FAQ';
	}

	return {
		topbarContent
	};
}
