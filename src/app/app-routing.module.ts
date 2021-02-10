import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
 
  {
    //La pagina de detalles esta bien pero lo recomendable si vas a una pagina de detalles seria pasar un id para que pueda cargar la información 
    //En mi caso, muevo la página de home a esta página y la llamo index y asi pasar el index del pokemon para que luego podamos recuperar la información de esa página.
    path: 'home/:index',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule) //aqui le digo que en index me presente los detalles de cada pokemon y que me permita obtener el nombre y la imagen que aqui se alojan.
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
