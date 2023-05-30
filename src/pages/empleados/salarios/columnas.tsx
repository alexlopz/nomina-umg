const columns = [
  {
    name: 'Id',
    selector: (row: { id: any }) => row.id,
    sortable: true,
  },
  {
    name: 'Fecha',
    selector: (row: { fecha: any }) => row.fecha.toDate().toISOString(),
    sortable: true,
  },
  {
    name: 'Descripcion',
    selector: (row: { descripcion: any }) => row.descripcion,
    sortable: true,
  },
  {
    name: 'Salario',
    selector: (row: { salario: any }) => row.salario,
    sortable: true,
  },
];

export default columns;
