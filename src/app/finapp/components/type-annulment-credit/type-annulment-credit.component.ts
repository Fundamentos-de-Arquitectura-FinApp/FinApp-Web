import {Component, inject, OnInit} from '@angular/core';
import {DividerModule} from 'primeng/divider';
import {FieldsetModule} from 'primeng/fieldset';
import {ChipsModule} from 'primeng/chips';
import {PaginatorModule} from 'primeng/paginator';
import {CalendarModule} from 'primeng/calendar';
import {QuotaPeriod} from '../../enum/quota-period-enum';
import {CreditsService} from '../../services/credits.service';
import {ClientsService} from '../../services/clients.service';
import {CreditInterface} from '../../interfaces/credit-interface';
import {RateInterface} from '../../interfaces/rate-interface';
import {GraceInterface} from '../../interfaces/grace-interface';

@Component({
  selector: 'app-type-annulment-credit',
  standalone: true,
  imports: [
    DividerModule,
    FieldsetModule,
    ChipsModule,
    PaginatorModule,
    CalendarModule
  ],
  templateUrl: './type-annulment-credit.component.html',
  styleUrl: './type-annulment-credit.component.css'
})
export class TypeAnnulmentCreditComponent implements OnInit {

  creditService:CreditsService = inject(CreditsService);
  clientService:ClientsService = inject(ClientsService);
  orderId: number | undefined;
  initialPayment: number | undefined;
  compensatoryRate: RateInterface | undefined;
  moratoriumRate: RateInterface | undefined;
  disbursementDate: string | undefined;
  numQuotas: number | undefined;
  paymentPeriod: QuotaPeriod | undefined;
  grace: GraceInterface | undefined;
  credit: CreditInterface | null = null;

  accountId: number | null = null;
  quotaPeriod: { label: string; value: QuotaPeriod }[] = [];
  rateTypes: { label: string; value: string }[] = [];
  capitalizationPeriods: { label: string; value: string }[] = [];
  paymentPeriods: { label: string; value: string }[] = [];
  graceTypes: { label: string; value: string }[] = [];

  selectedQuotaPeriod: QuotaPeriod | null = null;
  selectedRateType: string | null = null;
  selectedCapitalizationPeriod: string | null = null;
  selectedPaymentPeriod: string | null = null;
  selectedGraceType: string | null = null;

  ngOnInit() {

    this.clientService.accountId$.subscribe((accountId) => {
      this.accountId = accountId;
    });

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
      {label: 'EFECTIVA', value: 'EFFECTIVE'},
      {label: 'NOMINAL', value: 'NOMINAL'}
    ];

    this.capitalizationPeriods = [
      {label: 'DIARIO', value: 'DAILY'},
      {label: 'QUINCENAL', value: 'WEEKLY'},
      {label: 'MENSUAL', value: 'MONTHLY'},
      {label: 'BIMESTRAL', value: 'BIMONTHLY'},
      {label: 'TRIMESTRAL', value: 'TRIMONTHLY'},
      {label: 'CUATRIMESTRAL', value: 'QUARTERLY'},
      {label: 'SEMESTRAL', value: 'SEMIANNUALLY'},
      {label: 'ANUAL', value: 'ANNUALLY'}
    ];

    this.paymentPeriods = [
      {label: 'DIARIO', value: 'DAILY'},
      {label: 'QUINCENAL', value: 'WEEKLY'},
      {label: 'MENSUAL', value: 'MONTHLY'},
      {label: 'BIMESTRAL', value: 'BIMONTHLY'},
      {label: 'TRIMESTRAL', value: 'TRIMONTHLY'},
      {label: 'CUATRIMESTRAL', value: 'QUARTERLY'},
      {label: 'SEMESTRAL', value: 'SEMIANNUALLY'},
      {label: 'ANUAL', value: 'ANNUALLY'}
    ];

    this.graceTypes = [
      {label: 'TOTAL', value: 'TOTAL'},
      {label: 'PARCIAL', value: 'PARTIAL'}
    ];
  }


  createQuotaCredit(){
    this.creditService.createQuotaCredit(this.accountId!,this.credit!).subscribe(

    )
  }

}
