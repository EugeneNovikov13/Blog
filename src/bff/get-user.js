export const getUser = async (loginToFind) =>
	fetch(`http://localhost:3004/users?login=${loginToFind}`)
		.then((loadedUser) => loadedUser.json())
		.then(([loadedUser]) => loadedUser);
