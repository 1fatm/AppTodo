
        let taskForm = document.getElementById("task-form");
        let titre = document.getElementById("titre");
        let description = document.getElementById("description");
        let dateDebut = document.getElementById("dateDebut");
        let dateFin = document.getElementById("dateFin");
        let titreErreur = document.getElementById("titre-erreur");
        let descriptionErreur = document.getElementById("description-erreur");
        let dateDebutErreur = document.getElementById("date-debut-erreur");
        let dateFinErreur = document.getElementById("date-fin-erreur");
        let successMessage = document.getElementById("success-message");

        let aujourdHui = new Date().toISOString().split('T')[0];
        dateDebut.setAttribute("min", aujourdHui);
        dateFin.setAttribute("min", aujourdHui);

        document.getElementById("b1").addEventListener("click", function() {
            window.location.href = "pageDeredirection.html";
        });

        taskForm.addEventListener("submit", function(event) {
            event.preventDefault();

            titreErreur.innerHTML = "";
            descriptionErreur.innerHTML = "";
            dateDebutErreur.innerHTML = "";
            dateFinErreur.innerHTML = "";

            let isValid = true;

            if (!titre.value) {
                titreErreur.innerHTML = "Veuillez entrer un titre";
                isValid = false;
            }
            if (!description.value) {
                descriptionErreur.innerHTML = "Veuillez entrer une description";
                isValid = false;
            }
            if (!dateDebut.value) {
                dateDebutErreur.innerHTML = "Veuillez entrer une date de début";
                isValid = false;
            }
            if (!dateFin.value) {
                dateFinErreur.innerHTML = "Veuillez entrer une date de fin";
                isValid = false;
            }
            if (dateDebut.value == dateFin.value) {
                dateFinErreur.innerHTML = "La date de fin doit être supérieure à la date de début";
                isValid = false;
            }
            if (dateFin.value && dateDebut.value && dateFin.value < dateDebut.value) {
                dateFinErreur.innerHTML = "La date de fin doit être supérieure à la date de début";
                isValid = false;
            }

            if (isValid) {
                let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                let newTask = {
                    titre: titre.value,
                    description: description.value,
                    dateDebut: dateDebut.value,
                    dateFin: dateFin.value,
                    status: "En cours"
                };
                tasks.push(newTask);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                successMessage.style.display = "block";
                setTimeout(function() {
                    successMessage.style.display = "none";
                }, 3000);
                taskForm.reset();
            }
        });
        
