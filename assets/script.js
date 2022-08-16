const btnShowForm = document.querySelector(".showForm");
const displayCreatTask = document.querySelector(".DisplaycreatTask");
const displayTask = document.querySelector(`.displayTask`);
const inputTaskName = document.getElementById("taskName");
const description = document.getElementById("description");
const priority = document.getElementById("priority");
const displayError = document.querySelector(`.textError`);

let toggle = false;

btnShowForm.addEventListener(`click`, showForm);

function showForm(e) {
  e.stopPropagation();
  toggle = !toggle;

  if (toggle) {
    displayCreatTask.style.display = "flex";
    displayTask.style.display = "none";
    btnShowForm.textContent = `Annuler`;
  } else {
    displayCreatTask.style.display = "none";
    displayTask.style.display = "block";
    btnShowForm.textContent = `Créer une nouvelle tâche`;
  }
}

displayCreatTask.addEventListener(`submit`, handleSubmit);
inputTaskName.addEventListener(`input`, delErrorStyle);
description.addEventListener(`input`, delErrorStyle);

function handleSubmit(e) {
  e.preventDefault();
  let validity = false;
  validity = checkValidity(inputTaskName.value, description.value);

  if (validity) {
    inputTaskName.value = "";
    description.value = "";
    displayCreatTask.style.display = "none";
    displayTask.style.display = "block";
    btnShowForm.textContent = "Créer une nouvelle tâche";
    toggle = false;

    // displayCreatTask();
  }
}

function checkValidity(nameValue, descriptionValue) {
  if (nameValue == "") {
    displayError.innerHTML = `<p class="error"> veuillez remplir tous les champs ! </p>`;
    inputTaskName.style.border = " solid 1px red";
    setTimeout(() => displayError.remove(), 2500);
    return false;
  } else if (descriptionValue == "") {
    displayError.innerHTML = `<p class="error"> veuillez remplir tous les champs ! </p>`;
    description.style.border = " solid 1px red";
    setTimeout(() => displayError.remove(), 2500);
    return false;
  } else {
    inputTaskName.style.border = "none";
    description.style.border = "none";
    return true;
  }
}

function delErrorStyle() {
  inputTaskName.style.border = "none";
  description.style.border = "none";
}
