import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { Authorization } from './pages';
import { Footer, Header } from './components';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`;

const Content = styled.div`
	padding: 120px 0;
`;

export const Blog = () => {
	return (
		<AppColumn>
			<Header />
			<Content>
				<Routes>
					<Route path='/' element={<div>Главная страница</div>}></Route>
					<Route path='/login' element={<Authorization />}></Route>
					<Route path='/register' element={<div>Регистрация</div>}></Route>
					<Route path='/users' element={<div>Страница пользователи</div>}></Route>
					<Route path='/post' element={<div>Новая статья</div>}></Route>
					<Route path='/post/:postId' element={<div>Статья</div>}></Route>
					<Route path='*' element={<div>Ошибка</div>}></Route>
				</Routes>
			</Content>
			<Footer />
		</AppColumn>
	);
};
