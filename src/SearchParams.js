import React from 'react';
import SearchBox from './SearchBox';
import { navigate } from '@reach/router';

class SearchParams extends React.Component {
    //Function to navigate back to homepage showing search results (from '/search-params' route)
    handleSearchSubmit = () => navigate('/');

    render() {
        return (
            <div className="search-route">
                <SearchBox search={ this.handleSearchSubmit } />
            </div>
        )
    }
}

export default SearchParams;