import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'profil',
        loadChildren: () => import('./components/profil/profil.module').then(m => m.ProfilPageModule)
      },
      {
        path: 'accueil',
        loadChildren: () => import('./components/accueil/accueil.module').then(m => m.AccueilPageModule)
      },
      {
        path: 'details-produits/:id',
        loadComponent: () => import('./components/details-produit/details-produit.page').then(m => m.DetailsProduitPage)
      },
      {
        path: '', 
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      }
      
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
