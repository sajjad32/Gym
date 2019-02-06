export class User {
  id: number;
  name: string;
  phoneNo: string;
  details: string;
  shelfNo: string;
  flag: boolean;
}

export class Payment {
  date: string;
  price: number;
  method: string;
}

export class Present {
  date: string;
  enterTime: string;
  outTime: string;
}
