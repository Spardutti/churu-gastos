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
};
export default routes;
