import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFormPageRoutingModule } from './modal-form-routing.module';

import { ModalFormPage } from './modal-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModalFormPageRoutingModule
  ],
  declarations: [ModalFormPage]
})
export class ModalFormPageModule {}
