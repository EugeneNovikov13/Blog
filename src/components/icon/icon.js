import styled from 'styled-components';

//нужно отдельно пробросить inactive в пропсах, чтобы он не попал вместе с ...props в div
const IconContainer = ({ className, id, inactive, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden='true'></i>
	</div>

);

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	color: ${({ disabled }) => disabled ? '#ccc' : '#000'};

	&:hover {
		cursor: ${({ inactive }) => (inactive ? 'default' : 'pointer')};
	}
`;
