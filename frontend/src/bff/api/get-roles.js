export const getRoles = () =>
	fetch('http://localhost:3004/roles').then((loadedRoles) => loadedRoles.json());

