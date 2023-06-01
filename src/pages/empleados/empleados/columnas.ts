const columns = [
  {
    name: 'Empleado',
    selector: (row: { nombres: string; apellidos: string }) => `${row.nombres} ${row.apellidos}`,
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
