import CustomSpinner from 'components/CustomSpinner';
import { IPlainObject } from 'definitions/IPlainObjects';
import DataTable from 'react-data-table-component';

const Tabla: React.FC<IPlainObject> = ({ columns, data, loading }) => {
  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        progressComponent={<CustomSpinner status="Primary" size="Medium" padding />}
      />
    </>
  );
};
export default Tabla;
