export interface Seats {
  row: string;
  seat: number;
}


export interface Flight {
  date: string; 
  departure: string; 
  destination: string; 
  hour: string;
}

export interface Order extends Flight{
  seats: Seats[];
}