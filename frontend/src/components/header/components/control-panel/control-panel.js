import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon } from '../../../index';
import { ROLE } from '../../../../constants';
import { selectUserLogin, selectUserRole, selectUserSession } from '../../../../selectors';
import { logout } from '../../../../actions';
import { checkAccess } from '../../../../utils';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

const UserName = styled.div`
	font-size: 18px;
	font-weight: bold;
	margin-right: 10px;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const session = useSelector(selectUserSession);

	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout(session));
		sessionStorage.removeItem('userData');
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ?
					<Button onClick={() => navigate('/login')}>
						Войти
					</Button>
					:
					<>
						<UserName>{login}</UserName>
						<Icon
							id='fa-sign-out'
							margin='0'
							onClick={onLogout}
						/>
					</>}
			</RightAligned>
			<RightAligned>
				<Icon id='fa-backward'
					  margin='10px 0 0 0'
					  onClick={() => navigate(-1)}
				/>
				{isAdmin && (
					<>
						<Link to='/post'>
							<Icon id='fa-file-text-o' margin='10px 0 0 16px' />
						</Link>
						<Link to='/users'>
							<Icon id='fa-users' margin='10px 0 0 16px' />
						</Link>
					</>)}
			</RightAligned>

		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`

`;
