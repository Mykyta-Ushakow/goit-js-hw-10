import axios from "axios";

const API_KEY = "live_ir6hmUkawTytTWAKR3E5VFvSKHBInYzGqucbGp8tgqpefbEZ9FudjSBKq40tKqew";

const API_PATH = "https://api.thecatapi.com/v1";
const API_BREEDS = "/breeds";
const API_IMAGS = "/images/search";

axios.defaults.headers.common["x-api-key"] = API_KEY;

export function fetchBreeds() {

    return axios({
        method: "get",
        url: `${API_PATH}${API_BREEDS}`,
    });

};


export function fetchCatByBreed(breedId) {
    
    return axios({
        method: "get",
        url: `${API_PATH}${API_IMAGS}?breed_ids=${breedId}`
    })
};
