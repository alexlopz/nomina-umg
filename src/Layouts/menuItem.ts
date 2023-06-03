import { MenuItemType } from '@paljs/ui/types';

const items: MenuItemType[] = [
  {
    title: 'Home Page',
    icon: { name: 'home' },
    link: { href: '/dashboard' },
  },
  {
    title: 'Catalogos',
    icon: { name: 'arrowhead-right-outline' },
    children: [
      {
        title: 'Deducciones',
        link: { href: '/catalogos/deducciones' },
      },
      {
        title: 'Tipos de Comisiones',
        link: { href: '/catalogos/tipos-comisiones' },
      },
      {
        title: 'Puestos',
        link: { href: '/catalogos/puestos' },
      },
      {
        title: 'Marcaje',
        link: { href: '/catalogos/marcaje' },
      },
      {
        title: 'Departamento',
        link: { href: '/catalogos/departamento' },
      },
      {
        title: 'Pago',
        link: { href: '/catalogos/pago' },
      },
    ],
  },
  {
    title: 'Empleados',
    icon: { name: 'arrowhead-right-outline' },
    children: [
      {
        title: 'Ver Empleados',
        link: { href: '/empleados/empleados' },
      },
      {
        title: 'Horas Extras',
        link: { href: '/empleados/horas-extras' },
      },
      {
        title: 'Deducciones',
        link: { href: '/empleados/deducciones' },
      },
      {
        title: 'Bonificaciones',
        link: { href: '/empleados/bonificaciones' },
      },
      {
        title: 'Prestamos',
        link: { href: '/empleados/prestamos' },
      },
      {
        title: 'Usuario',
        link: { href: '/empleados/usuario' },
      },
    ],
  },
  {
    title: 'Nomina',
    icon: { name: 'arrowhead-right-outline' },
    children: [
      {
        title: 'Nomina general',
        link: { href: '/nomina/nomina' },
      },
      {
        title: 'Nomina empleado',
        link: { href: '/nomina/empleado' },
      },
    ],
  },
  {
    title: 'Autenticacion',
    icon: { name: 'lock-outline' },
    children: [
      {
        title: 'Login',
        link: { href: '/auth/login' },
      },
    ],
  },
];

export default items;
