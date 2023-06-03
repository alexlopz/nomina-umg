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
    name: 'Nombre deduccions',
    selector: (row: { deduccion: any }) => row.deduccion,
    sortable: true,
  },
  {
    name: 'Porcentaje',
    selector: (row: { deduccionPorcentaje: any }) => row.deduccionPorcentaje,
    sortable: true,
  },
];

export default columns;
