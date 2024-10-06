// console.log('conected')


// load categories 
async function loadCategories() {
    try {
        const uri = "https://openapi.programming-hero.com/api/peddy/categories";
        const res = await fetch(uri);
        const data = await res.json();
        displayCategories(data.categories)
    } catch (error) {
        console.error("error fetching data", error.message)
    }
}
loadCategories();



// load vedios by category
const loadCategoryVedios = async(id) => {
    const uri = `https://openapi.programming-hero.com/api/peddy/category/dog`;
    const res = await fetch(uri);
    const data = await res.json();
    console.log(data)
}


// display category button
const displayCategories = (categories) => {
    const buttonContainer = document.getElementById('button-container');
    categories.forEach((petName) => {
        console.log(petName)
        const btnParent = document.createElement('div');
        btnParent.innerHTML = `
        <button id="id-${petName.category}" onclick="loadCategoryVedios(${petName.category});" class=" border-2 px-24 hover:bg-[#0E7A811A] hover:rounded-full hover:border-[#0E7A81] rounded-xl py-6 bg-white text-xl font-bold flex justify-center items-center gap-2"><img class="w-10 h-10" src="${petName.category_icon}" /> ${petName.category}</button>
        `
        buttonContainer.append(btnParent)
    });
};

// load vedio
async function loadVedios() {
    try {
        const uri1 = "https://openapi.programming-hero.com/api/peddy/pets";
        const res = await fetch(uri1);
        const data = await res.json();
        displayVedios(data.pets)
    } catch (error) {
        console.error("error fetching data", error.message)
    }
}
loadVedios()

// display vedio

const displayVedios = (vedios) => {
    const cardContainer = document.getElementById("petcards");
    // if else

    vedios.forEach((vedio => {
        // console.log(vedio)

        const card = document.createElement('div')
        card.classList = "rounded-lg border";
        card.innerHTML = `
        <figure class="p-4">
            <img
            class="w-full rounded-sm"
            src="${vedio.image}"
            alt="Shoes"
            class="rounded-xs" />
        </figure>
        <div class="grid grid-cols-1 gap-4 items-center p-4">
           <div class="space-y-2">
           <h3 class="text-xl font-extrabold">${vedio.pet_name}</h3>
           <p class="flex items-center gap-2"><img class="w-5 h-5" src="./images/icons8-grid-50.png" alt="" srcset=""> Breed : ${vedio.breed}</p>
           <p class="flex items-center gap-2"><img class="w-5 h-5" src="./images/icons8-calendar-50.png" alt="" srcset=""> Birth :  ${vedio?.date_of_birth} </p>
           <p class="flex items-center gap-2"><img class="w-5 h-5" src="./images/icons8-gender-50.png" alt="" srcset=""> Gender : ${vedio.gender}</p>
           <p class="flex items-center gap-2"><img class="w-5 h-5" src="./images/icons8-dollar-24.png" alt="" srcset=""> Price :${vedio.price} $</p>
           </div>
           <div class="flex flex-wrap items-center justify-around gap-2 text-base">
           <button class="btn bg-white text-[#0E7A81] hover:bg-[#0E7A81]"><img class="w-5 h-5" src="./images/icons8-like-64.png" alt=""></button>
           <button class="btn bg-white text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Addopt</button>
           <button class="btn bg-white text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Details</button>
           </div>
        </div>
        `
        cardContainer.append(card);
    }))
}


