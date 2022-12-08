export class Payment {
  id?: string;
  foreignid: string;
  createdon: Date;
  lastupdate: Date;
  method: string;
  cardno: string;
  amount: number;
  status: string;
}
