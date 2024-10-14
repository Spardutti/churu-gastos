const routes = {
  HOME: () => '/',
  DASHBOARD: () => '/dashboard',
  SIGNUP: () => '/signup',
  LOGIN: () => '/login',
  PROFILE: () => '/profile',
  INSIGHTS: () => '/insights',
  CATEGORY: ({ categoryID = ':categoryID' }: { categoryID: string }) => `/category/${categoryID}`,
  EXTRAS: () => '/extras',
  CARDS: () => '/cards',
  ACCOUNTS: () => '/accounts',
  ACCOUNT_DETAILS: ({ accountId = ':accountId' }: { accountId: string }) => `/accounts/${accountId}`,
};
export default routes;
