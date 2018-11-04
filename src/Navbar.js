import React from 'react';
import { Link } from '@reach/router';
import styled from 'react-emotion';
import colours from './styles/colours';

const Container = styled('header')`
	background-color: ${colours.primary};
	position: sticky;
	top: 0;
	z-index: 2;
	padding: 20px 50px;
`

const SearchLink = styled(Link)`
	transition: 200ms ease-in-out;

	&:hover {
		transform: scale(1.1)
	}
`

const Navbar = () => (
	<Container>
		<Link to="/">Adopt me!</Link>
		{/* Link to search page to show routing */}
		<SearchLink to="/search-params">
			<span aria-label="search">🔍</span>
		</SearchLink>
	</Container>
)

export default Navbar;