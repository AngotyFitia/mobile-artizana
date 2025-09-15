import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.page.html',
  styleUrls: ['./details-produit.page.scss'],
  standalone: false
})
export class DetailsProduitPage implements OnInit {
  produit: any;
  idProduit: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.idProduit = this.route.snapshot.paramMap.get('id');
    if (this.idProduit) {
      this.chargerProduit(this.idProduit);
    }
  }

  chargerProduit(id: string) {
    this.http.get(`http://localhost:2222/api/mobile/produit/${id}`).subscribe({
      next: (data) => this.produit = data,
      error: (err) => console.error('Erreur chargement produit:', err)
    });
  }
}
