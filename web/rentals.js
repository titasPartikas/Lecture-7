window.onload = fetchRentalCars;

const rentalsContainer = document.querySelector("#rentals");

function addRentalCarCard(rentalCar) {
  const card = document.createElement("div");
  const firstName = document.createElement("p");
  const lastName = document.createElement("p");
  const gender = document.createElement("p");
  const carBrand = document.createElement("p");

  firstName.textContent = `Owners First Name: ${rentalCar.owner.firstName}`;
  lastName.textContent = `Owners Last Name: ${rentalCar.owner.lastName}`;
  gender.textContent = `Owners Genders: ${rentalCar.owner.gender}`;
  carBrand.textContent = `Car Brand: ${rentalCar.carBrand}`;
  card.classList.add("rental-card");
  card.append(firstName, lastName, gender, carBrand);

  rentalsContainer.appendChild(card);
}

const carBrandsFilter = document.querySelector("#carBrandsFilter");

carBrandsFilter.addEventListener("change", async () => {
  try {
    if (carBrandsFilter.value) {
      await fetchRentalCarsByCarBrand(carBrandsFilter.value);
    } else {
      await fetchRentalCars();
    }
  } catch (error) {
    console.error(error);
  }
});

async function fetchRentalCars() {
  try {
    await fetchRentalCarBrands();
    const response = await fetch("http://localhost:8080/rental-cars");
    const rentalCars = await response.json();
    rentalsContainer.replaceChildren();
    rentalCars.forEach((rentalCar) => addRentalCarCard(rentalCar));
  } catch (error) {
    console.error(error);
  }
}

async function fetchRentalCarsByCarBrand(carBrand) {
  const response = await fetch(`http://localhost:8080/rental-cars/${carBrand}`);
  const rentalCarsByBrand = await response.json();
  rentalsContainer.replaceChildren();
  rentalCarsByBrand.forEach((rentalCar) => addRentalCarCard(rentalCar));
}

async function fetchRentalCarBrands() {
  const response = await fetch("http://localhost:8080/car-brands");
  const rentalCarBrands = await response.json();
  carBrandsFilter.replaceChildren();
  populateCarBrandsFilter(rentalCarBrands);
}

function populateCarBrandsFilter(rentalCarBrands) {
  const defaultOption = createDefaultOption();
  carBrandsFilter.appendChild(defaultOption);

  rentalCarBrands.forEach((rentalCar) => {
    const option = createOption(rentalCar);
    carBrandsFilter.appendChild(option);
  });
}

function createOption(rentalCarBrand) {
  const option = document.createElement("option");
  option.value = rentalCarBrand;
  option.textContent = rentalCarBrand;

  return option;
}

function createDefaultOption() {
  const allOption = document.createElement("option");
  allOption.value = "";
  allOption.textContent = "All";

  return allOption;
}
