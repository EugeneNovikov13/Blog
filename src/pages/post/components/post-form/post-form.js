import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useServerRequest } from '../../../../hooks';
import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { sanitizeContent } from './utils';
import { savePostAsync } from '../../../../actions';
import styled from 'styled-components';

const PostFormContainer = ({ className, post: { id, title, imageUrl, publishedAt, content } }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();

	const imageRef = useRef(null);
	const titleRef = useRef(null);
	const contentRef = useRef(null);

	const onSave = () => {
		const newImageUrl = imageRef.current.value;
		const newTitle = titleRef.current.value;
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(
				requestServer,
				{
					id,
					imageUrl: newImageUrl,
					title: newTitle,
					content: newContent,
				},
			),
		).then(() => navigate(`/post/${id}`));
	};

	return (
		<div className={className}>
			<Input ref={imageRef} defaultValue={imageUrl} placeholder='Изображение...' />
			<Input ref={titleRef} defaultValue={title} placeholder='Заголовок...' />
			<SpecialPanel
				publishedAt={publishedAt}
				margin='20px 0'
				editButton={
					<Icon
						id='fa-floppy-o'
						size='21px'
						margin='0 10px 0 0'
						onClick={onSave}
					/>
				}
			/>
			<div ref={contentRef} contentEditable={true} suppressContentEditableWarning={true}
				 className='post-text'>{content}</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .post-text {
		font-size: 18px;
		white-space: pre-line;
	}
`;
