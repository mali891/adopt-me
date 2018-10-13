import React from 'react';
import pf from 'petfinder-client';
import { Consumer } from './SearchContext';
import Pet from './Pet';
import SearchBox from './SearchBox';

//Pass the API creds to API method
const petfinder = pf({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET
})

class Results extends React.Component {
    state = {
        pets: []
    }

    //Initiate search on render
    componentDidMount() { this.search() }

    search = () => {
        const searchParams = this.props.searchParams;

        //Call the API using state from Context
        petfinder.pet.find({ 
            output: "full", 
            location: searchParams.location, 
            animal: searchParams.animal,
            breed: searchParams.breed, 
        })
            .then(data => {
                const petsArray = data.petfinder.pets;
                let pets;

                //Make sure we have an array to work with
                if(petsArray && petsArray.pet) {
                    Array.isArray(petsArray.pet) ? pets = petsArray.pet : pets = [petsArray.pet]
                } else {
                    pets = []
                }

                this.setState({ pets })
            })
    }
    
    render() {
        return (
            <div className="search">
                <SearchBox search={ this.search } />

                {/* render list of pets */}
                { this.state.pets.map(pet => {
                    let breed;

                    Array.isArray(pet.breeds.breed) ? breed = pet.breeds.breed.join(', ') : breed = pet.breeds.breed;

                    return (
                        <Pet 
                            key={ pet.id }  
                            id={ pet.id }
                            name={ pet.name }  
                            animal={ pet.animal }  
                            breed={ breed }  
                            media={ pet.media }
                            location={ `${pet.contact.city}, ${pet.contact.state}` }
                        />
                    ) 
                })}
            </div>
        )
    }
}

//This is needed since we are using context outside of render method
export default function ResultsWithContext(props) {
    return (
        <Consumer>
            { context => <Results { ...props } searchParams={ context }/> }
        </Consumer>
    )
}
