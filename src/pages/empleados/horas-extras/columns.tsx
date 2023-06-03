const columns = [
  {
    name: 'Id',
    selector: (row: { id: string }) => row.id,
    sortable: true,
  },
  {
    name: 'Empleado',
    selector: (row: { empleado: string }) => row.empleado,
    sortable: true,
  },
  {
    name: 'Fecha',
    selector: (row: { fecha: any }) => row.fecha.toDate().toISOString(),
    sortable: true,
  },
  {
    name: 'Descripcion',
    selector: (row: { descripcion: string }) => row.descripcion,
    sortable: true,
  },
];

export default columns;
