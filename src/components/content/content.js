//импортируем напрямую, а не через индекс, так как компоненты находятся на одном уровне
import { Error } from '../error/error';

export const Content = ({ children, error }) =>
	error ? <Error error={error} /> : children;
