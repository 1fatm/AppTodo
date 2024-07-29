"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const Personne_1 = require("./Personne");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function demanderInformations() {
    return new Promise((resolve) => {
        rl.question('Entrez votre nom : ', (nom) => {
            rl.question('Entrez votre prénom : ', (prenom) => {
                rl.question('Entrez votre mot de passe : ', (motdepasse) => {
                    rl.question('Entrez votre poste : ', (poste) => {
                        const email = `${prenom.toLowerCase()}.${nom.toLowerCase()}@inclusiveit.sn`;
                        const nouvellePersonne = new Personne_1.Personne(nom, prenom, motdepasse, poste, email);
                        resolve(nouvellePersonne);
                    });
                });
            });
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const personnes = [];
        let continuer = true;
        while (continuer) {
            const nouvellePersonne = yield demanderInformations();
            personnes.push(nouvellePersonne);
            yield new Promise((resolve) => {
                rl.question('Voulez-vous ajouter une autre personne ? (oui/non) ', (reponse) => {
                    if (reponse.toLowerCase() !== 'oui') {
                        console.log('Liste des personnes :');
                        personnes.forEach((personne) => {
                            console.log(`Nom : ${personne.getNom()}`);
                            console.log(`Prénom : ${personne.getPrenom()}`);
                            console.log(`Poste : ${personne.getPoste()}`);
                            console.log(`Email : ${personne.getMail()}`);
                            console.log('------------------');
                        });
                        continuer = false;
                        rl.close();
                    }
                    resolve();
                });
            });
        }
    });
}
main();
//# sourceMappingURL=main.js.map