const btnShowForm = document.querySelector(".showForm");
const displayCreatTask = document.querySelector(".DisplaycreatTask");
const displayTask = document.querySelector(`.displayTask`);
const inputTaskName = document.getElementById("taskName");
const description = document.getElementById("description");
const priority = document.getElementById("priority");
const displayError = document.querySelector(`.textError`);
const urgent = document.querySelector(".PriorotyPrimary");
const priorityNormal = document.querySelector(".PriorotyNormal");
const prioritySecondary = document.querySelector(".PriorotySecondary");

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
displayTask.addEventListener("click", deletTask);

function delErrorStyle() {
  inputTaskName.style.border = "none";
  description.style.border = "none";
}

function handleSubmit(e) {
  e.preventDefault();
  let validity = false;
  validity = checkValidity(inputTaskName.value, description.value);

  if (validity) {
    displayCreatTask.style.display = "none";
    displayTask.style.display = "block";
    btnShowForm.textContent = "Créer une nouvelle tâche";
    toggle = false;
    CreatTask(inputTaskName.value, description.value, priority.value);
  } else {
    return;
  }
}

function checkValidity(nameValue, descriptionValue) {
  if (nameValue == "") {
    displayError.innerHTML = `<p class="error"> veuillez remplir tous les champs ! </p>`;
    inputTaskName.style.border = " solid 1px red";
    setTimeout(() => (displayError.textContent = ""), 2500);
    return false;
  } else if (descriptionValue == "") {
    displayError.innerHTML = `<p class="error"> veuillez remplir tous les champs ! </p>`;
    description.style.border = " solid 1px red";
    setTimeout(() => (displayError.textContent = ""), 2500);
    return false;
  } else {
    inputTaskName.style.border = "none";
    description.style.border = "none";
    return true;
  }
}

function CreatTask(nameValue, descriptionValue, priorityValue) {
  const task = new Task(nameValue, descriptionValue, priorityValue);
  task.addTask(task);
  inputTaskName.value = "";
  description.value = "";
}

function deletTask(e) {
  const taskDeleted = new Task();
  taskDeleted.deletedTask(e.target);
}

class Task {
  constructor(nameTask, discrib, prior) {
    this.nameTask = nameTask;
    this.discrib = discrib;
    this.prior = prior;
  }
  addTask(task) {
    const finalTask = document.createElement("div");
    finalTask.classList.add("cardTask");
    finalTask.innerHTML = `<p class="headerTask">${this.nameTask}</p>
                            <p class="bodyTask"> ${this.discrib}</p>
                             <button class="footerTask">Terminer</button>
                             <button class ="deleted footerTask">Supprimer</button>`;

    if (this.prior == "Absolue") {
      urgent.appendChild(finalTask);
      return;
    } else if (this.prior == "Normal") {
      priorityNormal.appendChild(finalTask);
      finalTask.style.boxShadow = "0px 5px 15px #2E3244";
      return;
    } else if (this.prior == "Secondaire") {
      prioritySecondary.appendChild(finalTask);
      finalTask.style.boxShadow = "0px 5px 15px #c5c6c6";
      return;
    }
  }
  deletedTask(target) {
    if (target.classList.contains("deleted")) {
      target.parentElement.remove();
    }
  }
}
