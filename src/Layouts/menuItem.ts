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
        title: 'Horas Extras',
        link: { href: '/empleados/horas-extras' },
      },
      {
        title: 'Prestamos',
        link: { href: '/empleados/prestamos' },
      },
      {
        title: 'Usuario',
        link: { href: '/empleados/usuario' },
      },
      {
        title: 'Nominas',
        link: { href: '/empleados/nominas' },
      },
      {
        title: 'Salarios',
        link: { href: '/empleados/salarios' },
      },
      {
        title: 'Comisiones',
        link: { href: '/empleados/comisiones' },
      },
      {
        title: 'Tipo Ausencia',
        link: { href: '/empleados/tipoausencia' },
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
