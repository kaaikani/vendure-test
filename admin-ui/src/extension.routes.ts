export const extensionRoutes = [  {
    path: 'extensions/manual-customer-channel',
    loadChildren: () => import('./extensions/manual-customer-channel-ui/routes'),
  },
  {
    path: 'extensions/manual-1',
    loadChildren: () => import('./extensions/assign-customer/routes'),
  }];
