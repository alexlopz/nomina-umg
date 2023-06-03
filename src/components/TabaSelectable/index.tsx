import { IPlainObject } from 'definitions/IPlainObjects';
import DataTable from 'react-data-table-component';

const TablaSelectable: React.FC<IPlainObject> = ({
  columns,
  data,
  onSelectedRowsChange,
  toggleCleared,
  contextActions,
}) => {
  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        pagination
        selectableRows
        onSelectedRowsChange={onSelectedRowsChange}
        clearSelectedRows={toggleCleared}
        contextActions={contextActions}
      />
    </>
  );
};
export default TablaSelectable;
