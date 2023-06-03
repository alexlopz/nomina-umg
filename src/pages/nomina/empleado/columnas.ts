const columns = [
  {
    name: 'ID empleado',
    selector: (row: { id: string }) => row.id,
    sortable: true,
  },
  {
    name: 'Empleado',
    selector: (row: { nombres: string; apellidos: string }) => `${row.nombres} ${row.apellidos}`,
    sortable: true,
  },
  {
    name: 'Departamento',
    selector: (row: { departamento: any }) => row.departamento,
    sortable: true,
  },
  {
    name: 'Sueldo Base',
    selector: (row: { sueldo: any }) => row.sueldo,
    sortable: true,
  },
];

export default columns;
