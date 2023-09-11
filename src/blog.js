import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { Authorization, Post, Registration, Users } from './pages';
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

const Page = styled.div`
	padding: 120px 0;
`;

export const Blog = () => {
	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path='/' element={<div>Главная страница</div>}></Route>
					<Route path='/login' element={<Authorization />}></Route>
					<Route path='/register' element={<Registration />}></Route>
					<Route path='/users' element={<Users />}></Route>
					<Route path='/post' element={<div>Новая статья</div>}></Route>
					<Route path='/post/:id' element={<Post />}></Route>
					<Route path='*' element={<div>Ошибка</div>}></Route>
				</Routes>
			</Page>
			<Footer />
		</AppColumn>
	);
};
