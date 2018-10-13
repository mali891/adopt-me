import React from 'react';
import { ANIMALS } from 'petfinder-client';
import { Consumer } from './SearchContext';

class SearchBox extends React.Component {
    handleFormSubmit = e => {
        //Prevent form submission behaviour, call search method
        e.preventDefault();
        this.props.search();
    }

    render() {
        return (
            //Collect the state from the context provider for use
            <Consumer>
                { context => (
                    //return a function with context as a parameter to use
                    <div className="search-params">
                        <form onSubmit={ this.handleFormSubmit }>
                            <label htmlFor="location">
                                Location
                                <input 
                                    type="text" 
                                    id="location" 
                                    value={ context.location } 
                                    placeholder="Location"
                                    onChange={ context.handleLocationChange }
                                />
                            </label>
                            <label htmlFor="animal">
                                Animal
                                <select 
                                    name="animal" 
                                    id="animal" 
                                    value={ context.animal } 
                                    onChange={ context.handleAnimalChange }
                                    onBlur={ context.handleAnimalChange }>
                                <option />
                                { ANIMALS.map(animal => <option key={ animal } value={ animal }>{ animal }</option>) }
                                </select>
                            </label>
                            {/* If there are breeds, and if the animal type has different breeds to choose from */}
                            { context.breeds.length > 0 && context.animal !== 'pig' &&
                                <React.Fragment>
                                    <label htmlFor="breed">
                                        Breed
                                        <select 
                                            name="breed" 
                                            id="breed" 
                                            value={ context.breed } 
                                            onChange={ context.handleBreedChange }
                                            onBlur={ context.handleBreedChange }>
                                        <option />
                                        { context.breeds.map(breed => <option key={ breed } value={ breed }>{ breed }</option>) }
                                        </select>
                                    </label>
                                    <button>Submit</button>
                                </React.Fragment>
                            }
                        </form>
                    </div>
                )}
            </Consumer>
        )
    }
}

export default SearchBox;