
        function AfficherTâche() {
            let taskList = document.getElementById("task-list");
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

            if (tasks.length === 0) {
                taskList.innerHTML = "<p>Aucune tâche à afficher.</p>";
                return;
            }
            tasks.forEach(task => {
                let taskCard = document.createElement("div");
                taskCard.className = "task-card";
                let statusBtnClass;
                switch (getTaskStatus(task)) {
                    case "En cours":
                        statusBtnClass = "en-cours";
                        break;
                    case "Terminée":
                        statusBtnClass = "terminée";
                        break;
                    case "À venir":
                        statusBtnClass = "à-venir";
                        break;
                    default:
                        statusBtnClass = "";
                }

                taskCard.innerHTML = `
                    <div class="task-card">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <div class="task-title">${task.titre}</div>
                                <span><strong>Date de début:</strong> ${task.dateDebut}</span>
                                <span><strong>Date de fin:</strong> ${task.dateFin}</span>
                            </div>
                            <div class="task-actions">
                                <button class="status-btn ${statusBtnClass}">${getTaskStatus(task)}</button>
                                <button class="btn btn-info btn-sm" onclick="ouvrirModifierTache('${task.titre}')"><i class="fas fa-pencil-alt"></i></button>
                                <button class="btn btn-danger btn-sm" onclick="supprimerTache('${task.titre}')"><i class="fas fa-trash"></i></button>
                                <button class="btn btn-primary btn-sm" onclick="voirDetails('${task.titre}')"><i class="fas fa-eye"></i></button>
                            </div>
                        </div>
                    </div>
                `;

                taskList.appendChild(taskCard);
            });

            updateTaskStatistics();
        }
        function updateTaskStatistics() {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            let totalTasks = tasks.length;
            let completedTasks = tasks.filter(task => task.status === "Terminée").length;
            let ongoingTasks = tasks.filter(task => task.status === "En cours").length;
            let upcomingTasks = tasks.filter(task => getTaskStatus(task) === "À venir").length;
        
            document.getElementById("total-tasks").textContent = totalTasks;
            document.getElementById("completed-tasks").textContent = completedTasks;
            document.getElementById("ongoing-tasks").textContent = ongoingTasks;
            document.getElementById("upcoming-tasks").textContent = upcomingTasks;
        }
        

        function ouvrirModifierTache(titre) {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            let task = tasks.find(t => t.titre === titre);

            if (task) {
                document.getElementById("editTaskTitle").value = task.titre;
                document.getElementById("editTaskDescription").value = task.description;
                document.getElementById("editTaskStartDate").value = task.dateDebut;
                document.getElementById("editTaskEndDate").value = task.dateFin;


                document.getElementById("editTaskForm").onsubmit = function(event) {
                    event.preventDefault();
                    modifierTache(task);
                
                };
            }
        }

        function modifierTache(task) {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

            task.titre = document.getElementById("editTaskTitle").value;
            task.description = document.getElementById("editTaskDescription").value;
            task.dateDebut = document.getElementById("editTaskStartDate").value;
            task.dateFin = document.getElementById("editTaskEndDate").value;
          

            localStorage.setItem("tasks", JSON.stringify(tasks));
            AfficherTâche();
        }

        function supprimerTache(titre) {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks = tasks.filter(task => task.titre !== titre);

            localStorage.setItem("tasks", JSON.stringify(tasks));
            AfficherTâche();
        }

        function voirDetails(titre) {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            let task = tasks.find(t => t.titre === titre);

            if (task) {
                document.getElementById("taskDetailsContent").innerText = `
                    Titre: ${task.titre}
                    Description: ${task.description}
                    Date de début: ${task.dateDebut}
                    Date de fin: ${task.dateFin}
                    Statut: ${task.status}
                `;

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
        
        document.addEventListener("DOMContentLoaded", AfficherTâche);
