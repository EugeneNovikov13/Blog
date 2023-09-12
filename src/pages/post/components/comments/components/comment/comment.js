import styled from 'styled-components';
import { Icon } from '../../../../../../components';

const CommentContainer = ({ className, id, author, publishedAt, content }) => {
	return (
		<div className={className}>
			<div className='information-panel'>
				<div className='author'>
					<Icon
						id='fa-user-circle-o'
						margin='0 0 0 10px'
						size='18px'
						onClick={() => {
						}}
					/>
					{author}
				</div>
				<div className='published-at'><Icon
					id='fa-calendar-o'
					margin='0 0 0 10px'
					size='18px'
					onClick={() => {
					}}
				/>
					{publishedAt}
				</div>
			</div>
			<div className='comment-text'>{content}</div>
		</div>
	);
};

export const Comment = styled(CommentContainer)`

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author {
		display: flex;
	}

	& .published-at {
		display: flex;
	}
`;
