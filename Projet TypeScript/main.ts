import * as readline from 'readline';
import { Personne } from './Personne';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function demanderInformations(callback: (nouvellePersonne: Personne) => void) {
    rl.question('Entrez votre nom : ', (nom) => {
        rl.question('Entrez votre prénom : ', (prenom) => {
            rl.question('Entrez votre mot de passe : ', (motdepasse) => {
                rl.question('Entrez votre poste : ', (poste) => {
                    const email = `${prenom.toLowerCase()}.${nom.toLowerCase()}@inclusiveit.sn`;
                    const nouvellePersonne = new Personne(nom, prenom, motdepasse, poste, email);
                    callback(nouvellePersonne);
                });
            });
        });
    });
}

function main() {
    const personnes: Personne[] = [];

    function demanderEtAjouterPersonne() {
        demanderInformations((nouvellePersonne) => {
            personnes.push(nouvellePersonne);

            rl.question('Voulez-vous ajouter une autre personne ? (oui/non) ', (reponse) => {
                if (reponse.toLowerCase() === 'oui') {
                    demanderEtAjouterPersonne();
                } else {
                    console.log('Liste des personnes :');
                    personnes.forEach((personne) => {
                        console.log(`Nom : ${personne.getNom()}`);
                        console.log(`Prénom : ${personne.getPrenom()}`);
                        console.log(`Poste : ${personne.getPoste()}`);
                        console.log(`Email : ${personne.getMail()}`);
                        console.log('------------------');
                    });
                    rl.close();
                }
            });
        });
    }

    demanderEtAjouterPersonne();
}

main();
