import React from 'react';

class Carousel extends React.Component {
    state = {
        photos: [],
        active: 0
    }

    static getDerivedStateFromProps({ media }) {
        let photos = []
        
        if(media && media.photos && media.photos.photo) {
            photos = media.photos.photo.filter(photo => photo['@size'] === 'pn')
        }
        
        return { photos };
    }

    //Set which image is active, convert to a number if it's a string
    handleIndexClick = e => this.setState({ active: +e.target.dataset.index })

    render() {
        const { photos, active } = this.state;

        return (
            <div className="carousel">
                <img src={ photos[active].value } alt="primary animal"/>
                <div className="carousel-smaller">
                    {/* render list of photos available */}
                    { photos.map((photo, index) => (
                        /* eslint-disable-next-line */
                        <img 
                            key={ photo.value } 
                            src={ photo.value } 
                            className={ index === active ? 'active' : '' } 
                            alt="animal thumbnail"
                            data-index={ index }
                            onClick={ this.handleIndexClick }
                        />
                    )) }
                </div>
            </div>
        )
    }
}

export default Carousel;