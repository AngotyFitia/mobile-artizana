import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = 'http://localhost:2222/api/mobile/commande-form'; 

  constructor(private http: HttpClient) {}

  passerCommande(data: {
    idSociete: number,
    idUtilisateur: number,
    idProduit: number,
    quantite: number,
    prix: number
  }): Observable<any> {
    const body = new HttpParams()
      .set('idSociete', data.idSociete)
      .set('idUtilisateur', data.idUtilisateur)
      .set('idProduit', data.idProduit)
      .set('quantite', data.quantite)
      .set('prix', data.prix);

    return this.http.post(this.apiUrl, body.toString(), {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    });
  }

  getFacturesParUtilisateur(id: number): Observable<any> {
    const url = `http://localhost:2222/api/mobile/liste-facture/${id}`;
    return this.http.get(url);
  }
  
}
