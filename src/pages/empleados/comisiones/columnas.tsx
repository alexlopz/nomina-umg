const columns = [
  {
    name: 'Id',
    selector: (row: { id: any }) => row.id,
    sortable: true,
  },
  {
    name: 'Tipo de Comision',
    selector: (row: { tipo_comision: any }) => row.tipo_comision,
    sortable: true,
  },
  {
    name: 'Total a Pagar',
    selector: (row: { total_a_pagar: any }) => row.total_a_pagar,
    sortable: true,
  },
  {
    name: 'Periodo',
    selector: (row: { periodo: any }) => row.periodo,
    sortable: true,
  },
];

export default columns;
