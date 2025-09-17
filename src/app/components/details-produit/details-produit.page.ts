import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommandeService } from '../../services/commande';
import { AuthService } from '../../services/auth';
import { ToastController } from '@ionic/angular'; 
import { Router } from '@angular/router';



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
  user: any;

  async presentToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color
    });
    await toast.present();
  }
  
  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient,
    private commandeService: CommandeService,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.idProduit = this.route.snapshot.paramMap.get('id');
    if (this.idProduit) {
      this.chargerProduit(this.idProduit);
    }
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: () => {
        this.user = null;
      }
    });
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
      this.presentToast('Quantité invalide ou produit indisponible', 'danger');
      return;
    }
    if (!this.user) {
      this.presentToast('Utilisateur non connecté.', 'danger');
      this.router.navigateByUrl('/home/accueil');
      return;
    }
  
  
    const data = {
      idSociete: this.produit.societe.idSociete,
      idUtilisateur: this.user.idUtilisateur, 
      idProduit: this.produit.idProduit,
      quantite: this.quantite,
      prix: this.produit.prixProduit.prix
    };
  
    this.commandeService.passerCommande(data).subscribe({
      next: (res) => {
        this.presentToast('Commande enregistrée avec succès', 'success');
        this.quantite = 1;
        window.location.reload();
      },
      error: (err) => {
        let messageErreur = 'Erreur lors de la commande';
        if (err.error) {
          if (typeof err.error === 'string') {
            messageErreur = err.error; 
          } else if (err.error.message) {
            messageErreur = err.error.message; 
          }
        }
  
        this.presentToast(messageErreur, 'danger');
      }
    });
  }
  
}
