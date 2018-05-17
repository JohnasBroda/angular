import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from 'app/app.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
