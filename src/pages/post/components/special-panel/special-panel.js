import styled from 'styled-components';
import { Icon } from '../../../../components';

const SpecialPanelContainer = ({ className, publishedAt, editButton }) => {

	return (
		<div className={className}>
			<div className='published-at'>
				<Icon
					id='fa-calendar-o'
					size='18px'
					margin='0 7px 0 0'
				/>
				{publishedAt}
			</div>
			<div className='buttons'>
				{editButton}
				<Icon
					id='fa-trash-o'
					size='21px'
					onClick={() => {
					}}
				/>
			</div>
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};

	& .published-at {
		display: flex;
		font-size: 18px;
	}

	& .buttons {
		display: flex;
		position: relative;
		top: -2px;
	}

	& i {
		position: relative;
		top: -1px;
	}
`;
