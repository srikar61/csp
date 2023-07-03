import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CausesComponent } from './causes/causes.component';

const routes: Routes = [
  // {
  //   path:'',redirectTo:'/home',pathMatch:'full'
  // },
  {
    path:'home',component:HomeComponent
  },
  {
    path:'causes',component:CausesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
