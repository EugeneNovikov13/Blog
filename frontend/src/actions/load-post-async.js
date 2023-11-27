import { setPostData } from './set-post-data';
import { request } from '../utils';

export const loadPostAsync = (postId) => dispatch =>
	request(`/posts/${postId}`).then(postData => {
		if (postData.data) {
			dispatch(setPostData(postData.data));
		}

		return postData;
	});
