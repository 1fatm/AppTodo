"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Personne = void 0;
class Personne {
    constructor(nom, prenénom, motdepasse, poste, mails) {
        this.nom = nom;
        this.prenom = prenénom;
        this.motdepasse = motdepasse;
        this.poste = poste;
        this.mail = mails;
    }
    getNom() {
        return this.nom;
    }
    getPrenom() {
        return this.prenom;
    }
    getMotdepasse() {
        return this.motdepasse;
    }
    getPoste() {
        return this.poste;
    }
    getMail() {
        return this.mail;
    }
    setNom(nom) {
        this.nom = nom;
    }
    setPrenom(prenom) {
        this.prenom = prenom;
    }
    setMotdepasse(motdepasse) {
        this.motdepasse = motdepasse;
    }
    setPoste(poste) {
        this.poste = poste;
    }
    setMail(mail) {
        this.mail = mail;
    }
}
exports.Personne = Personne;
//# sourceMappingURL=Personne.js.map