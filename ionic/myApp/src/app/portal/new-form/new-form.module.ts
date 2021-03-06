import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewFormPage } from './new-form.page';
import { PopoverComponent } from "../../common/popover/popover.component";
import { SecurityComponent} from "../../common/security/security.component";
import {OpenModalComponent} from "../../common/open-modal/open-modal.component";
const routes: Routes = [
  {
    path: '',
    component: NewFormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewFormPage,PopoverComponent,SecurityComponent,OpenModalComponent],
  entryComponents:[PopoverComponent,SecurityComponent,OpenModalComponent]
})
export class NewFormPageModule {}
