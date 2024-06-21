document.addEventListener("DOMContentLoaded", function () {
  const addTaskModal = new bootstrap.Modal(document.getElementById("addTaskModal"));
  const taskForm = document.getElementById("task-form");
  const successMessage = document.getElementById("success-message");
  const titreInput = document.getElementById("titre");
  const descriptionInput = document.getElementById("description");
  const dateDebutInput = document.getElementById("dateDebut");
  const dateFinInput = document.getElementById("dateFin");
  const titreErreur = document.getElementById("titre-erreur");
  const descriptionErreur = document.getElementById("description-erreur");
  const dateDebutErreur = document.getElementById("date-debut-erreur");
  const dateFinErreur = document.getElementById("date-fin-erreur");
  const annuler = document.getElementById("annuler");


  annuler.addEventListener("click", function() {
    window.location.href = "pageDeredirection.html";
  });

  
  const today = new Date().toISOString().split('T')[0];
  dateDebutInput.setAttribute("min", today);
  dateFinInput.setAttribute("min", today);

  addTaskModal.show();

  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    titreErreur.innerHTML = "";
    descriptionErreur.innerHTML = "";
    dateDebutErreur.innerHTML = "";
    dateFinErreur.innerHTML = "";

    let isValid = true;

    if (!titreInput.value) {
      titreErreur.innerHTML = "Veuillez entrer un titre";
      isValid = false;
    }
    if (!descriptionInput.value) {
      descriptionErreur.innerHTML = "Veuillez entrer une description";
      isValid = false;
    }
    if (!dateDebutInput.value) {
      dateDebutErreur.innerHTML = "Veuillez entrer une date de début";
      isValid = false;
    }
    if (!dateFinInput.value) {
      dateFinErreur.innerHTML = "Veuillez entrer une date de fin";
      isValid = false;
    }
    if (dateDebutInput.value === dateFinInput.value) {
      dateFinErreur.innerHTML = "La date de fin doit être supérieure à la date de début";
      isValid = false;
    }
    if (
      dateFinInput.value &&
      dateDebutInput.value &&
      new Date(dateFinInput.value) <= new Date(dateDebutInput.value)
    ) {
      dateFinErreur.innerHTML = "La date de fin doit être supérieure à la date de début";
      isValid = false;
    }

    if (isValid) {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      let newTask = {
        titre: titreInput.value,
        description: descriptionInput.value,
        dateDebut: dateDebutInput.value,
        dateFin: dateFinInput.value,
        status: "En cours",
      };
      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      successMessage.style.display = "block";
      setTimeout(function () {
        successMessage.style.display = "none";
      }, 3000);
      window.location.href = "pageDeredirection.html";
      taskForm.reset();
      addTaskModal.hide();
    }
  });

  dateDebutInput.addEventListener("change", function () {
    dateFinInput.setAttribute("min", dateDebutInput.value);
  });
});
