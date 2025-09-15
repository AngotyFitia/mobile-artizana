import { Categorie } from "./categorie.spec";

export interface Societe {
  idSociete: number;
  nom: string;
}

export interface PhotoProduit {
  photoBase64: string;
}
export interface PrixProduit{
  prix: number;
  date: Date;
}

export interface Produit {
  idProduit: number;
  intitule: string;
  etat: number;
  categorie: Categorie;
  societe: Societe;
  photosProduit: PhotoProduit[];
  prixProduit: PrixProduit;
}
