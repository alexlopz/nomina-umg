// Packages
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Timestamp, where } from 'firebase/firestore';

// Components
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import Tabla from 'components/Tabla';
import Layout from 'Layouts';
import columns from './columnas';
import CustomSpinner from 'components/CustomSpinner';
import EmpleadosForm from 'components/Empleados/empleados';

// Definitions
import { IPlainObject } from 'definitions/IPlainObjects';
import { IEmpleado } from 'definitions/IEmpleado';

// Hooks
import { useFirestoreAddDocument } from 'hooks/useFirestoreAddDocument';
import { useFirestoreDeleteDocument } from 'hooks/useFirestoreDeleteDocument';
import { useFirestoreCollection } from 'hooks/useFirestoreCollection';
import { useFirestoreCollectionQuery } from 'hooks/useFirestoreCollectionQuery';

const Empleados: React.FC<IPlainObject> = () => {
  const [tablaColumnas, setTablaColumnas] = useState<any[]>([]);
  const [formulario, setFormulario] = useState<IEmpleado>();
  console.log('formulario', formulario);
  const router = useRouter();

  // Traer los registros de la coleccion 'empleados' para imprimirlos en
  const { data: dataPrestamos, loading: loadingPrestamos } = useFirestoreCollection('empleados');

  // Traer los registros de departemos, bancos y puestos para mostrarlos en el formulario
  const { data: dataDepartamentos, loading: loadingDepartamentos } = useFirestoreCollection('departamentos');
  const { data: dataBancos, loading: loadingBancos } = useFirestoreCollection('bancos');
  const { data: dataPuestos, handleSubmit: handleSubmitPuestos } = useFirestoreCollectionQuery('puestos');

  // Agregar Documento
  const {
    success: successAdd,
    loading: isLoadingAdd,
    handleSubmit: handleSubmitAddDocument,
  } = useFirestoreAddDocument('empleados', formulario);

  // Borrar Documento
  const { handleSubmit: handleSubmitDeleteDocument } = useFirestoreDeleteDocument('prestamos');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormulario({ ...formulario, [event.target.name]: event.target.value });
  };

  const handleSelectDepartamento = async (event: any) => {
    const departamento = event.label;
    const departamentoId = event.value;
    handleSubmitPuestos(where('departamentoId', '==', departamentoId));
    setFormulario({ ...formulario, departamento, departamentoId });
  };

  const handleSelectChange = (event: any) => {
    setFormulario({ ...formulario, [event.name]: event.value });
  };

  const handleFechaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fecha = new Date(event.target.value);
    setFormulario({ ...formulario, [event.target.name]: Timestamp.fromDate(fecha) });
  };

  const insertarBotones = async () => {
    const botones: any = {
      name: 'Actions',
      cell: (row: { id: string }) => (
        <Button status="Danger" onClick={() => handleSubmitDeleteDocument(row.id)}>
          Eliminar
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    };
    setTablaColumnas([...columns, botones]);
  };

  useEffect(() => {
    insertarBotones();
  }, []);

  useEffect(() => {
    if (successAdd) router.reload();
  }, [successAdd]);

  return (
    <Layout title={'Horas Extras'}>
      <Row>
        <Col>
          <Container>
            <h1>Empleados</h1>
            <Card status="Primary">
              <CardHeader>Ingresar Empleado</CardHeader>
              <CardBody>
                {!loadingDepartamentos && !loadingBancos ? (
                  <EmpleadosForm
                    bancos={dataBancos}
                    departamentos={dataDepartamentos}
                    puestos={dataPuestos}
                    handleSelectDepartamento={handleSelectDepartamento}
                    handleSelectChange={handleSelectChange}
                    handleChange={handleChange}
                    handleFechaChange={handleFechaChange}
                    handleSubmit={handleSubmitAddDocument}
                    loading={isLoadingAdd}
                  />
                ) : (
                  <CustomSpinner status="Primary" size="Large" padding />
                )}
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container>
            <Card status="Success">
              <CardHeader>Listado de Empleados</CardHeader>
              <CardBody>
                <Tabla columns={tablaColumnas} data={dataPrestamos} loading={loadingPrestamos} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </Layout>
  );
};

export default Empleados;
