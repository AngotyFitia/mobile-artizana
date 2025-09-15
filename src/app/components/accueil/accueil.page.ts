import { Component, OnInit } from '@angular/core';
import { Produit } from '../../services/produit.spec';
import { ProduitService } from '../../services/produit';
import { Categorie } from '../../services/categorie.spec';
import { CategorieService } from '../../services/categorie';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
  standalone: false
})
export class AccueilPage implements OnInit {

  produits: Produit[] = [];
  produitsFiltres: Produit[] = [];

  categories: Categorie[] = [];
  filtreActif: number | 'all' = 'all';

  afficherFiltres: boolean = false;

  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.chargerProduits();
    this.chargerCategories();
    this.afficherTexteBienvenue();
    this.lancerAnimationSousTexte();
  }

  toggleFiltres() {
    this.afficherFiltres = !this.afficherFiltres;
  }

  chargerProduits(): void {
    this.produitService.getProduits().subscribe((data: Produit[]) => {
      this.produits = data;
      this.produitsFiltres = data;
      console.log(this.produitsFiltres);
    });
  }

  chargerCategories(): void {
    this.categorieService.getCategories().subscribe((data: Categorie[]) => {
      this.categories = data;
    });
  }

  filtrerProduits(idCategorie: number | 'all'): void {
    this.filtreActif = idCategorie;
    this.produitsFiltres = (idCategorie === 'all')
      ? this.produits
      : this.produits.filter(p => p.categorie.idCategorie === idCategorie);
  }

  afficherTexteBienvenue(): void {
    const texte = "Tonga soa eto amin'ny Artizana!";
    const element = document.getElementById("welcome-text");

    let index = 0;

    const interval = setInterval(() => {
      if (element) {
        element.textContent += texte[index];
      }
      index++;
      if (index >= texte.length) {
        clearInterval(interval);
        this.lancerAnimationSousTexte();
      }
    }, 100);
  }

  lancerAnimationSousTexte(): void {
    setTimeout(() => {
      const subtext = document.getElementById("welcome-subtext");
      if (subtext) {
        subtext.classList.add("animate-slide-in");
      }
    }, 1500);
  }
}
