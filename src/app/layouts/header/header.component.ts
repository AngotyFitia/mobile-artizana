import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent implements OnInit {
  user: any;
  isPopoverOpen = false;
  popoverEvent: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: () => {
        this.user = null;
      }
    });
  }

  openUserPopover(ev: Event) {
    this.popoverEvent = ev;
    this.isPopoverOpen = true;
  }

  async logout() {
    this.isPopoverOpen = false;

    this.authService.logout().subscribe({
      next: async () => {
        this.user = null;
        const toast = await this.toastController.create({
          message: 'Déconnexion réussie',
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        await toast.present();

        this.router.navigateByUrl('/login');
      },
      error: async () => {
        const toast = await this.toastController.create({
          message: 'Erreur lors de la déconnexion',
          duration: 2000,
          color: 'danger',
          position: 'top'
        });
        await toast.present();
      }
    });
  }

  goToProfil() {
    this.isPopoverOpen = false;
    this.router.navigateByUrl('/home/profil'); // Change la route selon ton app
  }
}
