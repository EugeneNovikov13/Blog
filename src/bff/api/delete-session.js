export const deleteSession = async (sessionId) =>
	fetch(`http://localhost:3004/sessions/${sessionId}`, {
		method: 'DELETE',
	});


