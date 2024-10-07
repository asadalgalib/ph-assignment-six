// remove bg
const removeBackground = () => {
    const buttonHandler = document.getElementsByClassName("category-button");
    for( const button of buttonHandler){
        button.classList.remove("rounded-full", "bg-[#0E7A811A]", "border-[#0E7A81]")
    }
}

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
const loadCategoryVedios = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then( res => res.json())
    .then( data => {
        // remove bg
        removeBackground()
        const activeBg = document.getElementById(`id-${id}`)
        activeBg.classList.add("rounded-full", "bg-[#0E7A811A]", "border-[#0E7A81]")
        displayVedios(data.data)
    })
    .catch(error => console.log(error));
}
// loadCategoryVedios("Dog");

// display category button
const displayCategories = (categories) => {
    const buttonContainer = document.getElementById('button-container');
    categories.forEach((petName) => {
        // console.log(petName.category)
        const btnParent = document.createElement('div');
        btnParent.innerHTML = `
        <button id="id-${petName.category}" onclick="loadCategoryVedios('${petName.category}')" class="category-button border-2 w-full rounded-xl py-4 text-xl bg-white hover:border-[#0E7A81] font-bold flex justify-center items-center gap-2"><img class="w-8 h-8" src="${petName.category_icon}" /> ${petName.category}</button>
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

    if (vedios.length == 0) {
        cardContainer.classList.remove("grid")
        cardContainer.innerHTML = `
        <div class="bg-[#13131308] rounded-xl flex flex-col items-center justify-center p-24">
        <img class="" src="./images/error.webp" alt="">
        <h2 class="text-3xl font-extrabold">No Information Available</h2>
        <p class="max-w-2xl text-center  mt-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
        its layout. The point of using Lorem Ipsum is that it has a.</p>
        </div>
        `
    } else {
        cardContainer.classList.add("grid")
    }

    vedios.forEach((vedio => {
        // console.log(vedio.petId)
        const card = document.createElement('div')
        card.classList = "rounded-lg border";
        card.innerHTML = `
        <figure class="p-4">
            <img
            class="w-full rounded-md"
            src="${vedio.image}"
            alt="Shoes"
            class="rounded-xs" />
        </figure>
        <div class="grid grid-cols-1 gap-4 items-center p-4">
           <div class="space-y-2">
           <h3 class="text-xl font-extrabold">${vedio.pet_name}</h3>
           <p class="flex items-center gap-2"><img class="w-5 h-5" src="./images/icons8-grid-50.png" alt="" srcset=""> Breed : ${vedio.breed ? vedio.breed : " N/A"} </p>
           <p class="flex items-center gap-2"><img class="w-5 h-5" src="./images/icons8-calendar-50.png" alt="" srcset=""> Birth :  ${vedio.date_of_birth ? vedio.date_of_birth : " N/A"} </p>
           <p class="flex items-center gap-2"><img class="w-5 h-5" src="./images/icons8-gender-50.png" alt="" srcset=""> Gender : ${vedio.gender ? vedio.gender : " N/A"}</p>
           <p class="flex items-center gap-2"><img class="w-5 h-5" src="./images/icons8-dollar-24.png" alt="" srcset=""> Price : ${vedio.price ? vedio.price : " N/A"} $</p>
           </div>
           <hr>
           <div class="flex flex-wrap items-center justify-around gap-2 text-base">
           <button onclick= "loadImage('${vedio.petId}')" class="btn bg-white text-[#0E7A81] hover:bg-[#0E7A81]"><img class="w-5 h-5" src="./images/icons8-like-64.png" alt=""></button>
           <button onclick= "" class="btn bg-white text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Addopt</button>
           <button onclick="my_modal_5.showModal(), loadDetails('${vedio.petId}')" class="btn bg-white text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Details</button>
           </div>
        </div>
        `
        cardContainer.append(card);
    }))
}


// load pet image by id
const loadImage = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then( res => res.json())
    .then( data => {
        showSelected(data);
    })
    .catch(error => console.log(error));
}

// show pet image
const showSelected = (data) => {
    const selectContainer = document.getElementById("selected-pet-cards");
    const card = document.createElement('div');
    // card.classList ="w-full"
    card.innerHTML = `
    <img class="w-full h-auto rounded-md"
      src= "${data.petData.image}"
      alt="Shoes" />
    `
    selectContainer.append(card);
}
    
// load details
const loadDetails = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then( res => res.json())
    .then( data => {
        showDetails(data);
    })
    .catch(error => console.log(error));
}

// show details 
const showDetails = (data) =>{
    const detailsContainer = document.getElementById("my_modal_5")
    detailsContainer.innerHTML = " ";

    console.log(data.petData)
    const detailsCard = document.createElement('div');
    detailsCard.classList.add("flex","flex-col", "justify-center", "items-center")
    detailsCard.innerHTML = `
    
  <div class="modal-box">
    <div id="details-modal">
    <div>
    <img class="w-full md:w-[700px] h-full" src = "${data.petData.image}" />
     <h2 class="text-xl font-extrabold mt-5">${data.petData.pet_name}</h2>
    </div>
    </div>
    <div class="modal-action grid grid-cols-1">
    <div class="flex gap-5">
    <div class="w-[50%]">
        <p class="flex items-center gap-2"><img class="w-5 h-5" src="./images/icons8-grid-50.png" alt="" srcset=""> Breed : ${data.petData.breed ? data.petData.breed : " N/A"} </p>
           <p class="flex items-center gap-2"><img class="w-5 h-5" src="./images/icons8-calendar-50.png" alt="" srcset=""> Birth :  ${data.petData.date_of_birth ? data.petData.date_of_birth : " N/A"} </p>
    </div>   
    <div class="">
           <p class="flex items-center gap-2"><img class="w-5 h-5" src="./images/icons8-gender-50.png" alt="" srcset=""> Gender : ${data.petData.gender ? data.petData.gender : " N/A"}</p>
           <p class="flex items-center gap-2"><img class="w-5 h-5" src="./images/icons8-dollar-24.png" alt="" srcset=""> Price : ${data.petData.price ? data.petData.price : " N/A"} $</p>
    </div>       
    </div>
    <br>
    <h3 class="font-bold">Details Information :</h3>
           <p>${data.petData.pet_details}</p>
    <div class="flex items-center justify-center">
    <form method="dialog">
    <button class="btn px-16 mt-4 bg-[#0E7A811A] border-[#0E7A81] hover:bg-[#82e4eb1a]">Close</button>
    </form>
    </div>
    </div>
  </div>

    `
    detailsContainer.append(detailsCard);
}
