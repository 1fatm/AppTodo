import * as readline from 'readline';
import { Personne } from './Personne';

// Créer une interface pour lire les entrées de l'utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fonction pour demander à l'utilisateur ses informations
function demanderInformations(): Promise<Personne> {
    return new Promise((resolve) => {
        rl.question('Entrez votre nom : ', (Nom) => {
            rl.question('Entrez votre prénom : ', (Prenom) => {
                rl.question('Entrez votre mot de passe : ', (motdepasse) => {
                    rl.question('Entrez votre poste : ', (Poste) => {
                        rl.question('Entrez votre email : ', (mail) => {
                            const nouvellePersonne = new Personne(Nom, Prenom, motdepasse, Poste, mail);
                            resolve(nouvellePersonne);
                            rl.close();
                        });
                    });
                });
            });
        });
    });
}

// Fonction principale asynchrone pour démarre
async function main() {
    const personnes: Personne[] = [];

    
    const nouvellePersonne = await demanderInformations();
    
    
    personnes.push(nouvellePersonne);

    console.log('Liste des personnes :');
    personnes.forEach((personne) => {
        console.log(`Nom : ${personne.getNom()}`);
        console.log(`Prénom : ${personne.getPrenom()}`);
        console.log(`Poste : ${personne.getPoste()}`);
        console.log(`Email : ${personne.getMail()}`);
        console.log('------------------');
    });
}


main();
