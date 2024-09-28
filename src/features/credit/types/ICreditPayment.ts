export interface ICreditPayment {
  id?: string;
  description: string;
  monthly_payment_amount: number;
  payments_made: number;
  number_of_payments: number;
  next_payment_date: Date;
  is_active: boolean;
  is_payment_complete: boolean;
}
