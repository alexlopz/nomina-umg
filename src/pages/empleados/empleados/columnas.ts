import { formatDate } from 'utilities/formatDate';

const columns = [
  {
    name: 'Nombres',
    selector: (row: { nombres: string }) => row.nombres,
    sortable: true,
  },
  {
    name: 'Apellidos',
    selector: (row: { apellidos: string }) => row.apellidos,
    sortable: true,
  },
  {
    name: 'Dpi',
    selector: (row: { dpi: any }) => row.dpi,
    sortable: true,
  },
  {
    name: 'Puesto',
    selector: (row: { puesto: any }) => row.puesto,
    sortable: true,
  },
  {
    name: 'Departamento',
    selector: (row: { departamento: any }) => row.departamento,
    sortable: true,
  },
  {
    name: 'Fecha Ingreso',
    selector: (row: { fecha_ingreso: any }) => formatDate(row.fecha_ingreso.toDate().toISOString()),
    sortable: true,
  },
  {
    name: 'Estado',
    selector: (row: { estado: any }) => row.estado,
    sortable: true,
  },
];

export default columns;
