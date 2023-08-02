import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MessageErrorDirective } from './directives/message-error.directive';



@NgModule({
  declarations: [
    NotFoundComponent,
    MessageErrorDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MessageErrorDirective,
  ]
})
export class SharedModule { }
