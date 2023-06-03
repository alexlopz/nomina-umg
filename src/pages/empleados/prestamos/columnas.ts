const columns = [
  {
    name: 'Referencia',
    selector: (row: { id: any }) => row.id,
    sortable: true,
  },
  {
    name: 'Empleado',
    selector: (row: { empleado: any }) => row.empleado,
    sortable: true,
  },
  {
    name: 'Banco',
    selector: (row: { banco: any }) => row.banco,
    sortable: true,
  },
  {
    name: 'Cuenta',
    selector: (row: { cuenta: any }) => row.cuenta,
    sortable: true,
  },
  {
    name: 'Cuotas',
    selector: (row: { cuota: any }) => row.cuota,
    sortable: true,
  },
  {
    name: 'Monto',
    selector: (row: { monto: any }) => row.monto,
    sortable: true,
  },
];

export default columns;
