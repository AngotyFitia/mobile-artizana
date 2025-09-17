import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../services/commande';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.page.html',
  styleUrls: ['./facture.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class FacturePage implements OnInit {
  factures: any[] = [];
  user: any;
  // à remplacer dynamiquement avec session

  constructor(
    private commandeService: CommandeService,
    private toastController: ToastController,
    private authService: AuthService,

  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.chargerFactures();
      },
      error: () => {
        this.user = null;
      }
    });
  }
  

  chargerFactures() {
    this.commandeService.getFacturesParUtilisateur(this.user.idUtilisateur).subscribe({
      next: (data) => {
        this.factures = data;
        console.log('Factures:', this.factures);
      },
      error: async (err) => {
        console.error('Erreur lors du chargement des factures:', err);
        const toast = await this.toastController.create({
          message: 'Erreur lors du chargement des factures',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    });
  }

  payer(facture: any) {
    console.log('Payer la facture', facture);
    // Logique pour lancer le paiement, navigation, etc.
  }

  moisMalagasy = [
    'Janoary', 'Febroary', 'Marsa', 'Aprily', 'Mey', 'Jona',
    'Jolay', 'Aogositra', 'Septambra', 'Oktobra', 'Novambra', 'Desambra'
  ];
  
  formatDateMalagasy(dateString: string): string {
    const date = new Date(dateString);
    const jour = date.getDate();
    const mois = this.moisMalagasy[date.getMonth()];
    const annee = date.getFullYear();
    return `${jour} ${mois} ${annee}`;
  }
  
}
