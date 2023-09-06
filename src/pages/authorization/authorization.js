import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { useState } from 'react';
import { Button, H2, Input } from '../../components';
import styled from 'styled-components';

const authFromSchema = yup.object().shape({
	login: yup.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
		.min(3, 'Неверный логин. Минимум 3 символа')
		.max(15, 'Неверный логин. Максимум 15 символов'),
	password: yup.string()
		.required('Заполните пароль')
		.matches(/^[\w#%]+$/, 'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %')
		.min(6, 'Неверный пароль. Минимум 6 символа')
		.max(30, 'Неверный пароль. Максимум 30 символов'),
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
`;

const ErrorMessage = styled.div`
	font-size: 18px;
	margin: 10px 0 0;
	padding: 10px;
	background-color: #fcadad;
`;

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		formState: {
			errors,
		},
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFromSchema),
	});

	const [serverError, setServerError] = useState(null);

	const onSubmit = ({ login, password }) => {
		server.authorize(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
			}


		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	return (
		<div className={className}>
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type='text'
					placeholder='Логин...'
					{...register('login', {
					onChange: () => setServerError(null),
				})}
				/>
				<Input
					type='password'
					placeholder='Пароль...'
					{...register('password', {
					onChange: () => setServerError(null),
				})}
				/>
				<Button type='submit' disabled={!!formError}>
					Авторизоваться
				</Button>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<StyledLink to='/register'>
					Регистрация
				</StyledLink>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
