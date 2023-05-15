const submitBtn = document.querySelector("#submit");
const firstNameInput = document.querySelector("#firstName");
const lastNameInput = document.querySelector("#lastName");
const genderDropdown = document.querySelector("#gender");
const carBrandInput = document.querySelector("#carBrand");

submitBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const payload = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    gender: genderDropdown.value,
    carBrand: carBrandInput.value,
  };

  try {
    await fetch("http://localhost:8080/register-car", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    clearInputs();
  } catch (error) {
    console.error(error);
  }
});

function clearInputs() {
  firstNameInput.value = "";
  lastNameInput.value = "";
  genderDropdown.value = "male";
  carBrandInput.value = "";
}
