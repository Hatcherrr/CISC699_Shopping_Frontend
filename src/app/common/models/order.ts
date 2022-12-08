export class Order {
  id?: string;
  foreignid: string;
  porductid: string;
  createdon: Date;
  lastupdate: Date;
  paymentid: string;
  amount: number;
  address: string;
  status: string;
}
