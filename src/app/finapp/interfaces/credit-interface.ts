import {RateInterface} from './rate-interface';
import {GraceInterface} from './grace-interface';
import {QuotaPeriod} from '../enum/quota-period-enum';

export interface CreditInterface {
  orderId: number;
  initialPayment: number;
  compensatoryRate: RateInterface;
  moratoriumRate: RateInterface;
  disbursementDate: string;
  numQuotas: number;
  paymentPeriod: QuotaPeriod;
  grace: GraceInterface;
}
