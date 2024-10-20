 
export interface IAccountBudgetExpense {
  id: number
  date: string
  description: string
  name: string
  amount: string
  categoryId: number
  isRecursive: boolean
  createdAt: string
  updatedAt: string
  type: string
}