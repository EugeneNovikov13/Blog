export const getLastPageFromLinks = links => {
	const result = links.match(/_page=(\d{1,4})&_limit=\d{1,3}>; rel="last"/);

	return Number(result[1]);

	//мой способ найти последнюю страницу
	// return +links.split('&_').at(-2).at(-1);
};
