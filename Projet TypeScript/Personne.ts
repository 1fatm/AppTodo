
 export class Personne
{
    private nom: string;
    private prenom: string;
    private motdepasse : string;
    private poste : string;
    private mail : string;

    constructor(nom: string, prenénom: string, motdepasse: string, poste:string ,mails:string)
    {
        this.nom = nom;
        this.prenom = prenénom;
        this.motdepasse = motdepasse;
        this.poste = poste;
        this.mail = mails;
    }
    getNom()
    {
        return this.nom;
    }
    getPrenom()
    {
        return this.prenom;
    }
    getMotdepasse()
    {
        return this.motdepasse;
    }
    getPoste()
    {
        return this.poste;

    }
    getMail()
    {
        return this.mail;
    }
    setNom(nom: string)
    {
        this.nom = nom;
    }
    setPrenom(prenom: string)
    {
        this.prenom = prenom;
    }
    setMotdepasse(motdepasse: string)
    {
        this.motdepasse = motdepasse;
    }
    setPoste(poste: string)
    {
        this.poste = poste;
    }
    setMail(mail: string)
    {
        this.mail = mail;
    }

    
}


