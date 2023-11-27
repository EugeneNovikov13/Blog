export const getCommentsCount = (comments = [], postId) => {
	return comments.reduce((acc, comment) => comment.postId === postId ? acc + 1 : acc, 0);
};
