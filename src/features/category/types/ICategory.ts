export interface ICategory {
  name: string;
  id?: string;
  current_month_budget?: {
    amount: number;
  };
}
