import React from 'react';
import pf from 'petfinder-client';
import { navigate } from '@reach/router';
import Carousel from './Carousel';
import Modal from './Modal';

//Pass the API creds to API method
const petfinder = pf({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET
})

class Details extends React.Component {
    state = {
        loading: true,
        showModal: false,
    }

    toggleModal = () => this.setState({ showModal: !this.state.showModal })

    componentDidMount() {
        //Get the details for the relevant pet from the API
        petfinder.pet.get({
            output: "full",
            id: this.props.id,
        }).then(data => {
            const pet = data.petfinder.pet;
            let breed;

            if(Array.isArray(pet.breeds.breed)) {
                breed = pet.breeds.breed.join(', ');
            } else {
                breed = pet.breeds.breed;
            }

            this.setState({
                name: pet.name,
                animal: pet.animal,
                location: `${pet.contact.city}, ${pet.contact.state}`,
                description: pet.description,
                media: pet.media,
                breed,
                loading: false,
            })
            //If error, navigate to home route (could be improved with some signposting)
        }).catch(() => navigate("/"))
    }

    render() {
        const { name, animal, location, description, media, breed, loading, showModal } = this.state;

        if(loading) {
            return <h1>Loading...</h1>
        }

        return (    
            <div className="details">
                <Carousel media={ media } />
                <div className="details-inner">
                    <h1>{ name }</h1>
                    <h2>{ animal } - { breed } - { location }</h2>
                    <button onClick={ this.toggleModal }>Adopt { name }</button>
                    <p>{ description }</p>

                    {/* Conditionally render modal window */}
                    { showModal && 
                        <Modal>
                            <h1>Would you like to adopt { name }?</h1>
                            <div className="buttons">
                                <button onClick={ this.toggleModal }>Yes</button>
                                <button onClick={ this.toggleModal }>Definitely</button>
                            </div>
                        </Modal>
                    }
                </div>
            </div>
        )
    }
}

export default Details;