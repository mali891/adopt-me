import React from 'react';
import { Link } from '@reach/router';

class Pet extends React.Component {
    render() {
        const { name, animal, breed, media, location, id } = this.props;
        let photos = [];

        if(media && media.photos && media.photos.photo) {
            photos = media.photos.photo.filter(photo => photo["@size"] === 'pn');
        }

        //If there is no associated image for the pet, use a placeholder
        const hero = photos[0] ? photos[0].value : 'http://placecorgi.com/300/300';

        return (
            //Display details of the pet
            //Link through to a new page which will display the details of the animal
            <Link to={`/details/${id}`} className="pet">
                <div className="image-container">
                    <img src={ hero } alt={ `${name} image` }/>
                </div>
                <div className="info">
                    <h1>{ name }</h1>
                    <h2>{ animal } - { breed } - { location }</h2>
                </div>
            </Link>
        )
    }
}

export default Pet;