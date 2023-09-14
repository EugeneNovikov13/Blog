import { transformPost } from '../transformers';

export const getPosts = () =>
	fetch('http://localhost:3004/posts')
		.then((loadedPosts) => loadedPosts.json())
		.then((loadedPosts) => loadedPosts && loadedPosts.map(transformPost));
