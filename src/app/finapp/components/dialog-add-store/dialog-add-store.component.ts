import {Component} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {PrimeTemplate} from "primeng/api";
import {Ripple} from "primeng/ripple";
import {FileUploadModule} from 'primeng/fileupload';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {UploadImageComponent} from '../../../shared/components/upload-image/upload-image.component';

@Component({
  selector: 'app-dialog-add-store',
  standalone: true,
  imports: [
    ButtonDirective,
    DialogModule,
    InputTextModule,
    PrimeTemplate,
    Ripple,
    FileUploadModule,
    FormsModule,
    NgIf,
    UploadImageComponent,
  ],
  templateUrl: './dialog-add-store.component.html',
  styleUrl: './dialog-add-store.component.css'
})
export class DialogAddStoreComponent {
  visibleFormStore: boolean = false;
}
