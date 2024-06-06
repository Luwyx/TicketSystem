export async function load({ url }) {
	let topbarContent = 'Default Sidebar Content';

	if (url.pathname === '/users') {
		topbarContent = 'Hi, ' + UserName + '!';
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
