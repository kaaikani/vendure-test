import { addNavMenuItem } from '@vendure/admin-ui/core';

export default [
    addNavMenuItem({
        id: 'banner-ui',
        label: 'Banner Management',
        routerLink: ['/extensions/banner-management'],
        icon: 'image',
    }, 'customers', 'Customer groups'),
];
