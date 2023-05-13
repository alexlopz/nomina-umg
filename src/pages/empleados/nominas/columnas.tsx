const columns = [
  {
    name: 'Id',
    selector: (row: { id: any }) => row.id,
    sortable: true,
  },
  {
    name: 'Apellido',
    selector: (row: { apellido: any }) => row.apellido,
    sortable: true,
  },
  {
    name: 'E-mail',
    selector: (row: { email: any }) => row.email,
    sortable: true,
  },
  {
    name: 'Contrasena',
    selector: (row: { contrasena: any }) => row.contrasena,
    sortable: true,
  },
  {
    name: 'Id Empleado',
    selector: (row: { id_empleado: any }) => row.id_empleado,
    sortable: true,
  },
];

export default columns;
