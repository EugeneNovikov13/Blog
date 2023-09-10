import styled from 'styled-components';
import { H2 } from '../../components';
import {TableRow, UserRow} from './components';

const UsersContainer = ({ className }) => {
	const users = [];

	return (
		<div className={className}>
			<H2>Пользователи</H2>
			<div>
				<TableRow>
					<div className='login-column'>Логин</div>
					<div className='registered-at-column'>Дата регистрации</div>
					<div className='role-column'>Роль</div>
				</TableRow>
				{users.map(({ id, login, registeredAt, roleId }) => (
					<UserRow key={id} login={login} registeredAt={registeredAt} roleId={roleId} />
				))}
			</div>

		</div>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin: 0 auto;
	width: 570px;
`;
