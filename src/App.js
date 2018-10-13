import React from 'react';
import { render } from 'react-dom';
import { Router, Link } from '@reach/router';
import pf from 'petfinder-client';
import { Provider } from './SearchContext';
import Results from './Results';
import Details from './Details';
import SearchParams from './SearchParams';

//Pass the API creds to API method
const petfinder = pf({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET
})

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: "Seattle, WA",
            animal: "",
            breed: "",
            breeds: [],
            handleLocationChange: this.handleLocationChange,
            handleAnimalChange: this.handleAnimalChange,
            handleBreedChange: this.handleBreedChange,
            getBreeds: this.getBreeds,
        }
    }

    handleLocationChange = e => this.setState({ location: e.target.value })

    //Run getBreeds after setState has been called
    handleAnimalChange = e => this.setState({ animal: e.target.value }, this.getBreeds)

    handleBreedChange = e => this.setState({ breed: e.target.value })

    getBreeds = () => {
        //If user has selected an animal, return relevant results from the API
        if(this.state.animal) {
            petfinder.breed.list({ animal: this.state.animal })
                .then(data => {
                    if(data.petfinder && data.petfinder.breeds && Array.isArray(data.petfinder.breeds.breed)) {
                        this.setState({ breeds: data.petfinder.breeds.breed })
                    }
                })
        //Otherwise set to empty array
        } else {
            this.setState({ breeds: [] })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="wrapper">
                    <header>
                        <Link to="/">Adopt me!</Link>
                        {/* Link to search page to show routing */}
                        <Link to="/search-params">
                            <span aria-label="search">🔍</span>
                        </Link>
                    </header>
                    {/* Open Context API provider to pass data to several components without prop drilling */}
                    <Provider value={ this.state }>
                        <Router>
                            <Results path="/" />
                            <Details path="/details/:id" />
                            <SearchParams path="/search-params" />
                        </Router>
                    </Provider>
                </div>
            </React.Fragment>
        )
    }
}


render(<App />, document.getElementById("root"));
