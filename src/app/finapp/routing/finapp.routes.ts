import {HomePageComponent} from '../pages/home-page/home-page.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ClientPageComponent} from '../pages/client-page/client-page.component';
import {PerfilStorePageComponent} from '../pages/perfil-store-page/perfil-store-page.component';
import {ReportPageComponent} from '../pages/report-page/report-page.component';
import {NotificationPageComponent} from '../pages/notification-page/notification-page.component';
import {CreditPageComponent} from '../pages/credit-page/credit-page.component';
import {ProductPageComponent} from '../pages/product-page/product-page.component';
import {FinappPageComponent} from '../pages/finapp-page/finapp-page.component';
import {AddClientPageComponent} from '../pages/add-client-page/add-client-page.component';
import {AddProductPageComponent} from '../pages/add-product-page/add-product-page.component';

const routes: Routes = [
  {
    path: '',
    component: FinappPageComponent,
    children: [
      {path: 'home', component: HomePageComponent},
      {path: 'clients', component: ClientPageComponent},
      {path: 'products', component: ProductPageComponent},
      {path: 'add-client', component: AddClientPageComponent},
      {path: 'add-product', component: AddProductPageComponent},
      {path: 'store-profile', component: PerfilStorePageComponent},
      {path: 'reports', component: ReportPageComponent},
      {path: 'notifications', component: NotificationPageComponent},
      {path: 'credits', component: CreditPageComponent},
      {path: 'products', component: ProductPageComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinAppRoutingModule {
}
