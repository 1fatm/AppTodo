document.addEventListener("DOMContentLoaded", function () {
    AfficherTâche();

    let boutonAjouter = document.getElementById("b1");
    boutonAjouter.addEventListener("click", function () {
        window.location.href = "index.html";
    });
});

function AfficherTâche() {
    let taskList = document.getElementById("task-list");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = "<p>Aucune tâche à afficher.</p>";
        return;
    }

    tasks.forEach((task) => {
        let taskCard = createTaskCard(task);
        taskList.appendChild(taskCard);
    });

    updateTaskStatistics();
}

function createTaskCard(task) {
    let taskCard = document.createElement("div");
    taskCard.className = "task-card";
    let statusBtnClass = getStatusButtonClass(task);

    taskCard.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <div class="task-title">${task.titre}</div>
                <span><strong>Date de début:</strong> ${task.dateDebut}</span>
                <span><strong>Date de fin:</strong> ${task.dateFin}</span>
                <span><strong>Statut:</strong> ${getTaskStatus(task)}</span> <!-- Affiche le statut -->
            </div>
            <div class="task-actions">
                 <button class="btn ${statusBtnClass} btn-sm" >${getTaskStatus(task)}</button> 
                <button class="btn btn-info btn-sm" onclick="ouvrirModifierTache('${task.titre}')"><i class="fas fa-pencil-alt"></i></button>

                <button class="btn btn-danger btn-sm" onclick="supprimerTache('${task.titre}')"><i class="fas fa-trash"></i></button>
                <button class="btn btn-primary btn-sm" onclick="voirDetails('${task.titre}')"><i class="fas fa-eye"></i></button>
               
            </div>
        </div>
        <hr>
    `;

    return taskCard;
}

function ouvrirModifierTache(titre) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let task = tasks.find((t) => t.titre === titre);

    if (task) {
        document.getElementById("editTaskTitle").value = task.titre;
        document.getElementById("editTaskDescription").value = task.description;
        document.getElementById("editTaskStartDate").value = task.dateDebut;
        document.getElementById("editTaskEndDate").value = task.dateFin;

        let taskStatus = getTaskStatus(task);
        let startDateField = document.getElementById("editTaskStartDate");
        let endDateField = document.getElementById("editTaskEndDate");

        let today = new Date().toISOString().split('T')[0]; 

        
        startDateField.setAttribute("min", today);
        endDateField.setAttribute("min", task.dateDebut);

        if (taskStatus === "À venir") {
            startDateField.removeAttribute("disabled");
            startDateField.setAttribute("min", today); 
            endDateField.removeAttribute("disabled");
            endDateField.setAttribute("min", today); 
        } else if (taskStatus === "En cours") {
            startDateField.setAttribute("disabled", "true");
            endDateField.removeAttribute("disabled");
            endDateField.setAttribute("min", today); 
        } else if (taskStatus === "Terminée") {
            startDateField.setAttribute("disabled", "true");
            endDateField.setAttribute("disabled", "true");
        }

        $('#editTaskModal').modal('show');
        let modal = document.getElementById("editTaskModal");
        modal.addEventListener("submit", function (event) {
            event.preventDefault(); 
            modifierTache(task);

            $('#editTaskModal').modal('hide');
        }, { once: true }); 
    }
}


function modifierTache(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let index = tasks.findIndex((t) => t.titre === task.titre);

    if (index !== -1) {
        let taskStatus = getTaskStatus(task);

        tasks[index].titre = document.getElementById("editTaskTitle").value;
        tasks[index].description = document.getElementById("editTaskDescription").value;

        if (taskStatus === "À venir") {
            tasks[index].dateDebut = document.getElementById("editTaskStartDate").value;
            tasks[index].dateFin = document.getElementById("editTaskEndDate").value;
        } else if (taskStatus === "En cours") {
            tasks[index].dateFin = document.getElementById("editTaskEndDate").value;
        }

        localStorage.setItem("tasks", JSON.stringify(tasks));
        AfficherTâche();
        $('#editTaskModal').modal('hide');
    }
}


function supprimerTache(titre) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.titre !== titre);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    AfficherTâche();
}

function voirDetails(titre) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let task = tasks.find((t) => t.titre === titre);

    if (task) {
        document.getElementById("taskDetailsContent").innerHTML = `
            <p><strong>Titre:</strong> ${task.titre}</p>
            <p><strong>Description:</strong> ${task.description}</p>
            <p><strong>Date de début:</strong> ${task.dateDebut}</p>
            <p><strong>Date de fin:</strong> ${task.dateFin}</p>
            <p><strong>Statut:</strong> ${getTaskStatus(task)}</p>
        `;

        $('#taskDetailsModal').modal('show');
    }
}

function getTaskStatus(task) {
    let today = new Date().toISOString().split('T')[0];
    if (task.dateDebut <= today && task.dateFin >= today) {
        return "En cours";
    } else if (task.dateFin < today) {
        return "Terminée";
    } else {
        return "À venir";
    }
}

function getStatusButtonClass(task) {
    switch (getTaskStatus(task)) {
        case "En cours":
            return "btn-warning";
        case "Terminée":
            return "btn-success";
        case "À venir":
            return "btn-info";
        default:
            return "btn-secondary";
    }
}

function updateTaskStatistics() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let totalTasks = tasks.length;
    let completedTasks = tasks.filter((task) => getTaskStatus(task) === "Terminée").length;
    let ongoingTasks = tasks.filter((task) => getTaskStatus(task) === "En cours").length;
    let upcomingTasks = tasks.filter((task) => getTaskStatus(task) === "À venir").length;

    document.getElementById("total-tasks").textContent = totalTasks;
    document.getElementById("completed-tasks").textContent = completedTasks;
    document.getElementById("ongoing-tasks").textContent = ongoingTasks;
    document.getElementById("upcoming-tasks").textContent = upcomingTasks;
}
