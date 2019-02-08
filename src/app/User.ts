export class User {
  id: number;
  name: string;
  phoneNo: number;
  details: string;
  shelfNo: string;
  registerDate?: string;
  image?: string;
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

export class Exercise {
  date: string;
  details: string;
}
