export const deleteUser = (userId) =>
	fetch(`http://localhost:3004/users/${userId}`, {
		method: 'DELETE',
	});
