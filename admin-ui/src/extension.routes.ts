export const extensionRoutes = [  {
    path: 'extensions/manual-customer-channel',
    loadChildren: () => import('./extensions/manual-customer-channel-ui/routes'),
  },
  {
    path: 'extensions/manualadmincustomerchannel',
    loadChildren: () => import('./extensions/manual-admin/routes'),
  },
  {
    path: 'extensions/banner-management',
    loadChildren: () => import('./extensions/banner-management-ui/routes'),
  },
  {
    path: 'extensions/banner',
    loadChildren: () => import('./extensions/cms-banner/routes'),
  }];
