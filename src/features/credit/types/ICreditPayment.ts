export interface ICreditPayment {
  id?: string;
  description: string;
  monthlyPaymentAmount: number;
  paymentsMade: number;
  numberOfPayments: number;
  nextPaymentDate: Date;
  isActive: boolean;
  isPaymentComplete: boolean;
}
