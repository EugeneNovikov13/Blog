export const deleteComment = (id) =>
	fetch(`http://localhost:3004/comments/${id}`, {
		method: 'DELETE',
	});
