const columns = [
  {
    name: 'Id',
    selector: (row: { id: any }) => row.id,
    sortable: true,
  },
  {
    name: 'Nombre',
    selector: (row: { nombre: any }) => row.nombre,
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
    selector: (row: { contraseña: any }) => row.contraseña,
    sortable: true,
  },
];

export default columns;
