export interface ICategoryBudget {
  id: number;
  category: {
    id: number;
    name: string;
  };
  budget: number;
  month: number;
  year: number;
}
