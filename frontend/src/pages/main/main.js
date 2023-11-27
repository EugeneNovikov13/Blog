import React, { useEffect, useState } from 'react';
import { Pagination, PostCard, Search } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import styled from 'styled-components';
import { debounce } from './utils';
import { request } from '../../utils';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	useEffect(() => {
		request(`/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`).then(
			({ data: { posts, lastPage } }) => {
				setPosts(posts);
				setLastPage(lastPage);
			},
		);
	}, [page, shouldSearch]);

	const startDelayedSearch = debounce(setShouldSearch, 2000);
	// const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<div className="posts-and-search">
				<Search onChange={onSearch} searchPhrase={searchPhrase} />
				{posts.length ? (
					<div className="post-list">
						{posts.map(
							({ id, title, imageUrl, publishedAt, comments }) => (
								<PostCard
									key={id}
									id={id}
									title={title}
									imageUrl={imageUrl}
									publishedAt={publishedAt}
									commentsCount={comments.length}
								/>
							),
						)}
					</div>
				) : (
					<div className="no-posts-found">Статьи не найдены</div>
				)}
			</div>
			{posts.length > 0 && lastPage > 1 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& .post-list {
		display: flex;
		flex-wrap: wrap;
		gap: 40px;
		padding: 40px 40px 80px;
	}

	& .no-posts-found {
		text-align: center;
		font-size: 18px;
		margin-top: 40px;
	}
`;
