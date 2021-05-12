import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { UpdateFormPageRoutingModule } from './update-form-routing.module';

import { UpdateFormPage } from './update-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdateFormPageRoutingModule
  ],
  declarations: [UpdateFormPage]
})
export class UpdateFormPageModule {}
