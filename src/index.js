import SlimSelect from 'slim-select';

import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const refs = {
    breedSelect: document.querySelector(".breed-select"),
    loaderEl: document.querySelector(".loader"),
    catInfoEl: document.querySelector(".cat-info"),
};

const { breedSelect, loaderEl, catInfoEl } = refs;

addEventListener("load", onLoad);

function onLoad() {   

    fetchBreeds()
        .then(resp => {
            breedSelect.insertAdjacentHTML("afterbegin",
            `
            <option value="" disabled selected hidden>
            🐱Choose Your Cat🐱
            </option>
            `);
            breedSelect.insertAdjacentHTML("beforeend", fillOptions(resp.data));
            breedSelect.classList.remove("hidden");

            // new SlimSelect({
            // select: document.querySelector('.breed-select')
            // });
        })
        .catch(err => {
            loaderEl.classList.add("hidden");

            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', {
                timeout: 60000,
                fontSize: '28px',
                width: "450px"
            });
        })
        .finally(() => {
            loaderEl.classList.add("hidden");
        });
};

function fillOptions(cats) {
    return cats.map(cat => `<option value="${cat.id}">
    ${cat.name}
    </option>`
    )
        .join("");
};

breedSelect.addEventListener("input", onInput);

function onInput({currentTarget }) {

    loaderEl.classList.remove("hidden");
    catInfoEl.classList.add("hidden");


    fetchCatByBreed(currentTarget.value)
        .then(resp => {
            catInfoEl.innerHTML = displayInfo(resp.data[0]);
            catInfoEl.classList.remove("hidden");
        })
        .catch(err => {
            loaderEl.classList.add("hidden");
            catInfoEl.classList.add("hidden");

            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', {
                timeout: 60000,
                fontSize: '28px',
                width: "450px"
            });
        })
        .finally(() => {
            loaderEl.classList.add("hidden");
        });
}

function displayInfo(cat) {
    
    return `
    <img src = ${cat.url} class="cat_img">
    <div class="cat_text">
        <h2 class="cat_name">${cat.breeds[0].name}</h2>
        <h3 class="cat_temp">${cat.breeds[0].temperament}</h3>
        <p class="cat_desc">${cat.breeds[0].description}</p>
    </div>
    `
};
