import {Component, OnInit} from '@angular/core';
import {DialogAddStoreComponent} from '../../components/dialog-add-store/dialog-add-store.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import {FileUploadModule} from 'primeng/fileupload';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {Ripple} from 'primeng/ripple';

import {UploadImageComponent} from '../../components/upload-image/upload-image.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-perfil-store-page',
  standalone: true,
  imports: [
    DialogAddStoreComponent,
    InputSwitchModule,
    FileUploadModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    Ripple,
    UploadImageComponent,
    NgIf
  ],
  templateUrl: './perfil-store-page.component.html',
  styleUrl: './perfil-store-page.component.css'
})
export class PerfilStorePageComponent implements OnInit {
  countries: any[] = [];
  hasStore: boolean = false;

  ngOnInit() {
    this.countries = [
      {name: 'Peru', code: 'PE'},
      {name: 'Australia', code: 'AU'},
      {name: 'Brazil', code: 'BR'},
      {name: 'China', code: 'CN'},
      {name: 'Egypt', code: 'EG'},
      {name: 'France', code: 'FR'},
      {name: 'Germany', code: 'DE'},
      {name: 'India', code: 'IN'},
      {name: 'Japan', code: 'JP'},
      {name: 'Spain', code: 'ES'},
      {name: 'United States', code: 'US'}
    ];
  }
}
