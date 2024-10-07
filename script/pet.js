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
async function loadCategoryVedios(id) {
   
    try {
        const uri2 = `https://openapi.programming-hero.com/api/peddy/category/${id}`;
        const res = await fetch(uri2);
        const data = await res.json();
        displayVedios(data.data)
    } catch (error) {
        console.error("error fetching data", error.message)
    }
}
// loadCategoryVedios("Dog");

// display category button
const displayCategories = (categories) => {
    const buttonContainer = document.getElementById('button-container');
    categories.forEach((petName) => {
        console.log(petName.category)
        const btnParent = document.createElement('div');
        btnParent.innerHTML = `
        <button id="id-${petName.category}" onclick="loadCategoryVedios('${petName.category}')" class=" border-2 w-full hover:bg-[#0E7A811A] hover:rounded-full hover:border-[#0E7A81] rounded-xl py-4 bg-white text-xl font-bold flex justify-center items-center gap-2"><img class="w-8 h-8" src="${petName.category_icon}" /> ${petName.category}</button>
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
    cardContainer.innerHTML = " ";
    
    if(vedios.length == 0){
        cardContainer.classList.remove("grid")
        cardContainer.innerHTML = `
        <div class="bg-[#13131308] rounded-xl flex flex-col items-center justify-center">
        <img class="w-80 h-auto" src="./images/3613895.webp" alt="">
        <h2 class="text-3xl font-extrabold">No Information Available</h2>
        <p class="max-w-2xl text-center mb-24 mt-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
        its layout. The point of using Lorem Ipsum is that it has a.</p>
        </div>
        `
    } else{
        cardContainer.classList.add("grid")
    }

    vedios.forEach((vedio => {
        console.log(vedio)
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
           <p class="flex items-center gap-2"><img class="w-5 h-5" src="./images/icons8-grid-50.png" alt="" srcset=""> Breed : ${vedio.breed ? vedio.breed  : " N/A"} </p>
           <p class="flex items-center gap-2"><img class="w-5 h-5" src="./images/icons8-calendar-50.png" alt="" srcset=""> Birth :  ${vedio.date_of_birth? vedio.date_of_birth : " N/A"} </p>
           <p class="flex items-center gap-2"><img class="w-5 h-5" src="./images/icons8-gender-50.png" alt="" srcset=""> Gender : ${vedio.gender ? vedio.gender  : " N/A"}</p>
           <p class="flex items-center gap-2"><img class="w-5 h-5" src="./images/icons8-dollar-24.png" alt="" srcset=""> Price : ${vedio.price ? vedio.price  : " N/A"} $</p>
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


