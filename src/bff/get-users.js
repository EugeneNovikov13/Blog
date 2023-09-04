export const getUsers = () =>
	fetch('http://localhost:3004/users').then((loadedUsers) => loadedUsers.json());
