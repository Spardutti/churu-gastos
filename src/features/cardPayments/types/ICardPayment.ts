export interface ICardPayment {
  id?: string;
  description: string;
  total_amount: number;
  initial_payment_date: Date;
  monthly_payment_amount: number;
  payments_made: number;
  number_of_payments: number;
  end_payment_date: Date;
  next_payment_date: Date;
  card_id: string;
}
