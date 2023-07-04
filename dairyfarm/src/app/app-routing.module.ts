import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CausesComponent } from './causes/causes.component';
import { DiseasesComponent } from './diseases/diseases.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path:'',redirectTo:'/home',pathMatch:'full'
  },
  {
    path:'home',component:HomeComponent
  },
  {
    path:'causes',component:CausesComponent
  },{
    path:'diseases',component:DiseasesComponent
  },{
    path:'about',component:AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
