import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { TableRow, UserRow } from './components';
import { Content, H2 } from '../../components';
import styled from 'styled-components';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);

	const requestServer = useServerRequest();

	useEffect(() => {
		Promise.all([
			requestServer('fetchUsers'),
			requestServer('fetchRoles'),
		]).then(([usersRes, rolesRes]) => {
			if (usersRes.error || rolesRes.error) {
				setErrorMessage(usersRes.error || rolesRes.error);
				return;
			}

			setUsers(usersRes.res);
			setRoles(rolesRes.res);
		});
	}, [requestServer]);

	console.log(users);

	return (
		<Content error={errorMessage}>
			<H2>Пользователи</H2>
			<div>
				<TableRow>
					<div className='login-column'>Логин</div>
					<div className='registered-at-column'>Дата регистрации</div>
					<div className='role-column'>Роль</div>
				</TableRow>
				{users.map(({ id, login, registeredAt, roleId }) => (
					<UserRow
						key={id}
						login={login}
						registeredAt={registeredAt}
						roleId={roleId}
						roles={roles}
					/>
				))}
			</div>
		</Content>
	);
}

export const Users = styled(UsersContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin: 0 auto;
	width: 570px;
`;
