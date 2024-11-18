import {ItemInterface} from './item-interface';

export interface OrderInterface {
  clientId: number,
  items: ItemInterface[],
}
