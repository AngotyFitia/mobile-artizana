import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  artisan = {
    nom: 'Raja Andry',
    metier: 'Menuisier',
    ville: 'Antananarivo',
    experience: 5,
    description: 'Spécialisé dans la fabrication de meubles sur mesure.',
    photo: 'assets/Image/Angoty.jpeg'
  };


  constructor() { }

  ngOnInit() {
  }

}
