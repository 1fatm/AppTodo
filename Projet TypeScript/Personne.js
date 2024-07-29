var Personne = /** @class */ (function () {
    function Personne(nom, prenénom, motdepasse, poste, mails) {
        this.nom = nom;
        this.prenom = prenénom;
        this.motdepasse = motdepasse;
        this.poste = poste;
        this.mail = mails;
    }
    Personne.prototype.getNom = function () {
        return this.nom;
    };
    Personne.prototype.getPrenom = function () {
        return this.prenom;
    };
    Personne.prototype.getMotdepasse = function () {
        return this.motdepasse;
    };
    Personne.prototype.getPoste = function () {
        return this.poste;
    };
    Personne.prototype.getMail = function () {
        return this.mail;
    };
    Personne.prototype.setNom = function (nom) {
        this.nom = nom;
    };
    Personne.prototype.setPrenom = function (prenom) {
        this.prenom = prenom;
    };
    Personne.prototype.setMotdepasse = function (motdepasse) {
        this.motdepasse = motdepasse;
    };
    Personne.prototype.setPoste = function (poste) {
        this.poste = poste;
    };
    Personne.prototype.setMail = function (mail) {
        this.mail = mail;
    };
    return Personne;
    

}());
