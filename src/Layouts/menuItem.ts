import { MenuItemType } from '@paljs/ui/types';

const items: MenuItemType[] = [
  {
    title: 'Home Page',
    icon: { name: 'home' },
    link: { href: '/dashboard' },
  },
  {
    title: 'Deducciones',
    icon: { name: 'arrowhead-right-outline' },
    children: [
      {
        title: 'Tipo de Ausencias',
        link: { href: '/deducciones/ausencias' },
      },
    ],
  },
  {
    title: 'Empleados',
    icon: { name: 'arrowhead-right-outline' },
    children: [
      {
        title: 'Salarios',
        link: { href: '/empleados/salarios' },
      },
      {
        title: 'Comisiones',
        link: { href: '/empleados/comisiones' },
      },
      {
        title: 'Nominas',
        icon: { name: 'monitor-outline' },
        link: { href: '/empleados/nominas' },
      },
    ],
  },

  {
    title: 'Test',
    icon: { name: 'clipboard-outline' },
    children: [
      {
        title: 'Login',
        link: { href: '/auth/login' },
      },
    ],
  },
];

export default items;
