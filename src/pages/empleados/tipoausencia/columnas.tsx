const columns = [
  {
    name: 'Id Empleado',
    selector: (row: { empleado: any }) => row.empleado,
    sortable: true,
  },
  {
    name: 'Tipo Ausencia',
    selector: (row: { tipoAusencia: any }) => row.tipoAusencia,
    sortable: true,
  },
  {
    name: 'Descripcion',
    selector: (row: { descripcion: any }) => row.descripcion,
    sortable: true,
  },
];

export default columns;
