import {Component, OnInit} from '@angular/core';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {RoleEnum} from '../../../auth/emun/role-enum';
import {TypeCreditEnum} from '../../enum/type-credit';
import {TypeAnnulmentCreditComponent} from '../../components/type-annulment-credit/type-annulment-credit.component';
import {
  TypeValueFutureCreditComponent
} from '../../components/type-value-future-credit/type-value-future-credit.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-select-type-credit',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    TypeAnnulmentCreditComponent,
    TypeValueFutureCreditComponent,
    NgIf
  ],
  templateUrl: './select-type-credit.component.html',
  styleUrl: './select-type-credit.component.css'
})
export class SelectTypeCreditComponent implements OnInit {
  typeCredit: { label: string; value: TypeCreditEnum }[] = [];
  selectedTypeCredit: TypeCreditEnum | null = null;
  typeCreditEnum = TypeCreditEnum;

  ngOnInit() {
    this.typeCredit = [
      {label: 'Estilo de Valor Futuro', value: TypeCreditEnum.valueFuture},
      {label: 'Estilo de Anualidades', value: TypeCreditEnum.annulment}
    ];
  }
}
