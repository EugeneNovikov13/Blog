import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useServerRequest } from '../../../../hooks';
import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { sanitizeContent } from './utils';
import { savePostAsync } from '../../../../actions';
import styled from 'styled-components';
import { PROP_TYPE } from '../../../../constants';

const PostFormContainer = ({ className, post: { id, title, imageUrl, publishedAt, content } }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();

	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitleValue] = useState(title);
	const contentRef = useRef(null);

	//обновляем состояния перед рендерингом компонента, чтобы инпуты возвращались пустыми
	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title);
	}, [imageUrl, title]);

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(
				requestServer,
				{
					id,
					imageUrl: imageUrlValue,
					title: titleValue,
					content: newContent,
				},
			),
		).then(({ id }) => navigate(`/post/${id}`));
	};

	const onImageUrlValueChange = ({ target }) => setImageUrlValue(target.value);

	const onTitleValueChange = ({ target }) => setTitleValue(target.value);

	return (
		<div className={className}>
			<Input
				value={imageUrlValue}
				placeholder='Изображение...'
				onChange={onImageUrlValueChange}
			/>
			<Input
				value={titleValue}
				placeholder='Заголовок...'
				onChange={onTitleValueChange}
			/>
			<SpecialPanel
				id={id}
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
			{/*редактируемый элемент HTML*/}
			<div ref={contentRef}
				 contentEditable={true}
				 suppressContentEditableWarning={true}
				 className='post-text'
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .post-text {
		min-height: 80px;
		border: 1px solid #000;
		font-size: 18px;
		white-space: pre-line;
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
