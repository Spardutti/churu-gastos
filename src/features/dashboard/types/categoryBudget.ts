export interface ICategoryBudget {
  id: number;
  category: {
    id: number;
    name: string;
  };
  amount: number;
  month: number;
  year: number;
}
