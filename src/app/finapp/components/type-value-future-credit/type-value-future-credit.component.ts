import {Component, OnInit} from '@angular/core';
import {FieldsetModule} from 'primeng/fieldset';
import {InputNumberModule} from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {QuotaPeriod} from '../../enum/quota-period-enum';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-type-value-future-credit',
  standalone: true,
  imports: [
    FieldsetModule,
    InputNumberModule,
    CalendarModule,
    DropdownModule,
    FormsModule
  ],
  templateUrl: './type-value-future-credit.component.html',
  styleUrl: './type-value-future-credit.component.css'
})
export class TypeValueFutureCreditComponent implements OnInit{
  quotaPeriod: { label: string; value: QuotaPeriod }[] = [];
  rateTypes: { label: string; value: string }[] = [];
  capitalizationPeriods: { label: string; value: string }[] = [];

  selectedQuotaPeriod: QuotaPeriod | null = null;
  selectedRateType: string | null = null;
  selectedCapitalizationPeriod: string | null = null;
  ngOnInit() {
    this.quotaPeriod = [
      {label: 'DIARIO', value: QuotaPeriod.diary},
      {label: 'QUINCENAL', value: QuotaPeriod.fifteenly},
      {label: 'MENSUAL', value: QuotaPeriod.monthly},
      {label: 'BIMESTRAL', value: QuotaPeriod.bimonthly},
      {label: 'TRIMESTRAL', value: QuotaPeriod.trimonthly},
      {label: 'CUATRIMESTRAL', value: QuotaPeriod.quarterly},
      {label: 'SEMESTRAL', value: QuotaPeriod.semiquarterly},
      {label: 'ANUAL', value: QuotaPeriod.anual}
    ];
    this.rateTypes = [
      {label: 'EFECTIVA', value: 'effective'},
      {label: 'NOMINAL', value: 'nominal'}
    ];

    this.capitalizationPeriods = [
      {label: 'DIARIO', value: 'diary'},
      {label: 'QUINCENAL', value: 'fifteenly'},
      {label: 'MENSUAL', value: 'monthly'},
      {label: 'BIMESTRAL', value: 'bimonthly'},
      {label: 'TRIMESTRAL', value: 'trimonthly'},
      {label: 'CUATRIMESTRAL', value: 'quarterly'},
      {label: 'SEMESTRAL', value: 'semiquarterly'},
      {label: 'ANUAL', value: 'annual'}
    ];
  }
}
