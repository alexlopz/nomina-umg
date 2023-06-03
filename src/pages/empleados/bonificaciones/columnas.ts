const columns = [
  {
    name: 'Referencia',
    selector: (row: { id: string }) => row.id,
    sortable: true,
  },
  {
    name: 'Nombre Empleado',
    selector: (row: { empleado: string }) => row.empleado,
    sortable: true,
  },
  {
    name: 'Nombre Bonificacion',
    selector: (row: { bonificacion: any }) => row.bonificacion,
    sortable: true,
  },
  {
    name: 'Monto',
    selector: (row: { monto: any }) => row.monto,
    sortable: true,
  },
];

export default columns;
