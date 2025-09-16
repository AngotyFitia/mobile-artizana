import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommandeService } from '../../services/commande'; 

@Component({
  selector: 'app-details-produit',
  standalone: true,
  templateUrl: './details-produit.page.html',
  styleUrls: ['./details-produit.page.scss'],
  imports: [ CommonModule, FormsModule, IonicModule]
})
export class DetailsProduitPage implements OnInit {
  produit: any;
  idProduit: string | null = null;
  images: any[] = [];
  selectedIndex = 0;
  quantite: number = 1;

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient,
    private commandeService: CommandeService
  ) {}

  ngOnInit() {
    this.idProduit = this.route.snapshot.paramMap.get('id');
    if (this.idProduit) {
      this.chargerProduit(this.idProduit);
    }
  }

  chargerProduit(id: string) {
    this.http.get(`http://localhost:2222/api/mobile/produit/${id}`).subscribe({
      next: (data: any) => {
        this.produit = data;
        this.images = data.photosProduit || [];
        this.selectedIndex = 0;
      },
      error: (err) => console.error('Erreur chargement produit:', err)
    });
  }

  selectImage(index: number) {
    this.selectedIndex = index;
  }

  prevImage() {
    if (this.selectedIndex > 0) this.selectedIndex--;
  }

  nextImage() {
    if (this.selectedIndex < this.images.length - 1) this.selectedIndex++;
  }

  commanderProduit() {
    if (!this.produit || this.quantite < 1) {
      alert('Quantité invalide ou produit indisponible.');
      return;
    }

    const data = {
      idSociete: this.produit.societe.idSociete,
      idUtilisateur: 3, // à remplacer dynamiquement si besoin
      idProduit: this.produit.idProduit,
      quantite: this.quantite,
      prix: this.produit.prixProduit.prix
    };

    this.commandeService.passerCommande(data).subscribe({
      next: (res) => {
        console.log('Commande réussie ', res);
        alert('Commande enregistrée avec succès');
        this.quantite = 1;
      },
      error: (err) => {
        console.error('Erreur commande', err);
        alert('Erreur lors de la commande ');
      }
    });
  }
}
