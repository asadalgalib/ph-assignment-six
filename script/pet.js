// remove bg
const removeBackground = () => {
    const buttonHandler = document.getElementsByClassName("category-button");
    for (const button of buttonHandler) {
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
    // add spinner
    const containerEmpty = document.getElementById('pet-card-parent')
    containerEmpty.classList.add("hidden");
    const loadSpinner = document.getElementById('spinner');
    loadSpinner.classList.remove("hidden")
    // set time out
    setTimeout(() => {
        fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
            .then(res => res.json())
            .then(data => {
                // remove bg
                removeBackground()
                const activeBg = document.getElementById(`id-${id}`)
                activeBg.classList.add("rounded-full", "bg-[#0E7A811A]", "border-[#0E7A81]")
                displayVedios(data.data)
                // remove spinner
                containerEmpty.classList.remove("hidden");
                loadSpinner.classList.add("hidden")
            })
            .catch(error => console.log(error));

    }, 2000);
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
function loadVedios() {
    // add spinner
    const containerEmpty = document.getElementById('pet-card-parent')
    containerEmpty.classList.add("hidden");
    const loadSpinner = document.getElementById('spinner');
    loadSpinner.classList.remove("hidden")
    // set time out
    setTimeout(() => {
        fetch("https://openapi.programming-hero.com/api/peddy/pets")
            .then(res => res.json())
            .then(data => {
                displayVedios(data.pets)
                // remove spinner
                containerEmpty.classList.remove("hidden");
                loadSpinner.classList.add("hidden")
            })
            .catch(error => console.log(error));

    }, 2000);
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
        <h2 class="text-3xl font-extrabold text-center">No Information Available</h2>
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
        card.classList = "rounded-lg border for-empty";
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
           <button id="dis-${vedio.petId}" onclick= "my_modal_6.showModal(), editModalCongrates(), disableButton('dis-${vedio.petId}')" class="btn bg-white text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Addopt</button>
           <button onclick="my_modal_5.showModal(), loadDetails('${vedio.petId}')" class="btn bg-white text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Details</button>
           </div>
        </div>
        `
        cardContainer.append(card);
    }))
}


// load pet image by id
const loadImage = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(res => res.json())
        .then(data => {
            showSelected(data);
        })
        .catch(error => console.log(error));
}

// show pet image
const showSelected = (data) => {
    const selectContainer = document.getElementById("selected-pet-cards");
    const card = document.createElement('div');
    // card.classList =""
    card.innerHTML = `
    <img class="w-full h-auto rounded-md"
      src= "${data.petData.image}"
      alt="Shoes" />
    `
    selectContainer.append(card);
}

// load details
const loadDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(res => res.json())
        .then(data => {
            showDetails(data);
        })
        .catch(error => console.log(error));
}

// show details 
const showDetails = (data) => {
    console.log(data.petData)
    const detailsContainer = document.getElementById("my_modal_5")
    detailsContainer.innerHTML = " ";
    const detailsCard = document.createElement('div');
    detailsCard.classList.add("flex", "flex-col", "justify-center", "items-center")
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
         <p class="flex items-center gap-2"><img class="w-5 h-5" src="./images/icons8-vaccine-64.png" alt="" srcset="">Vaccinated : ${data.petData.vaccinated_status ? data.petData.vaccinated_status : " N/A"}</p>
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
    <button class="btn px-16 mt-4 bg-[#0E7A811A] border-[#0E7A81] hover:bg-[#82e4eb1a]">Cancel</button>
    </form>
    </div>
    </div>
  </div>

    `
    detailsContainer.append(detailsCard);
}

// show congrates 
const editModalCongrates = () => {
    const congratesContainer = document.getElementById("my_modal_6")
    // console.log(congratesContainer)
    congratesContainer.innerHTML = `
    <div class="modal-box flex flex-col items-center justify-center">
    <img class="w-20 h-auto" src="./images/icons8-handshake-64.png"/>
    <h3 class="text-3xl font-extrabold text-center mt-4">Congrates!</h3>
    <p class="py-4 text-center">Adoption Process is Start For your Pet!</p>
    <h4 id="count-text" class="text-6xl font-bold text-center">3</h4>
    <div class="modal-action">
      
    </div>
  </div>
    `

    const closeModal = () => {
        const count = document.getElementById('count-text');
        let countValue = 3;
        // console.log(countValue) 
        const counDownInterval = setInterval(() => {
            countValue--;
            count.innerText = countValue;

            if (countValue == 0) {
                clearInterval(counDownInterval);
                my_modal_6.close();
            }
        }, 1000)
    }
    closeModal()

    // disBtn.setAttribute("disabled","")
}

// disable button
const disableButton = (id) => {
    // console.log(id)
    const disBtn = document.getElementById(`${id}`);
    disBtn.disabled = true;
}

// sort 
const sortBtn = () => {
    function loadSortVedios() {
        // add spinner
        const containerEmpty = document.getElementById('pet-card-parent')
        containerEmpty.classList.add("hidden");
        const loadSpinner = document.getElementById('spinner');
        loadSpinner.classList.remove("hidden")
        // set time out
        setTimeout(() => {
            fetch("https://openapi.programming-hero.com/api/peddy/pets")
                .then(res => res.json())
                .then(data => {
                    sortLodedData(data.pets)
                    // remove spinner
                    containerEmpty.classList.remove("hidden");
                    loadSpinner.classList.add("hidden")
                })
                .catch(error => console.log(error));

        }, 2000);
    }
    loadSortVedios()
}

// sort data 
const sortLodedData = (data) => {
    console.log('sorted', data)
    const sortedData = data.sort((a, b) => b.price - a.price)
    displayVedios(sortedData);
};