import React from 'react';

//Create new context for shared state, set shape of data
const SearchContext = React.createContext({
    location: "Seattle, WA",
    animal: "",
    breed: "",
    breeds: [],
    handleLocationChange() {},
    handleAnimalChange() {},
    handleBreedChange() {},
    getBreeds() {}
})

//Export provider and consumer (provider as the data parent, consumer as the data child)
export const Provider = SearchContext.Provider;
export const Consumer = SearchContext.Consumer;