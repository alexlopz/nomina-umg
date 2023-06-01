// Packages
import { useEffect, useState } from 'react';

// Components
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import PrestamosForm from 'components/Empleados/prestamos';
import Tabla from 'components/Tabla';
import Layout from 'Layouts';
import columns from './columnas';
import CustomSpinner from 'components/CustomSpinner';

// Definitions
import { IPrestamo } from 'definitions/IPrestamo';
import { IPlainObject } from 'definitions/IPlainObjects';

// Hooks
import { useFirestoreAddDocument } from 'hooks/useFirestoreAddDocument';
import { useFirestoreDeleteDocument } from 'hooks/useFirestoreDeleteDocument';
import { useFirestoreCollection } from 'hooks/useFirestoreCollection';
import { useRouter } from 'next/router';

const Prestamos: React.FC<IPlainObject> = () => {
  const [tablaColumnas, setTablaColumnas] = useState<any[]>([]);
  const [formulario, setFormulario] = useState<IPrestamo>();
  console.log('formulario', formulario);
  const router = useRouter();

  // Traer los registros de la coleccion 'prestamos' para imprimirlos en
  const { data: dataPrestamos, loading: loadingPrestamos } = useFirestoreCollection('prestamos');

  // Traer los registros de empleados y bancos para mostrarlos en el formulario
  const { data: dataEmpleados, loading: loadingEmpleados } = useFirestoreCollection('empleados');
  const { data: dataBancos, loading: loadingBancos } = useFirestoreCollection('bancos');

  // Agregar Documento
  const {
    success: successAdd,
    loading: isLoadingAdd,
    handleSubmit: handleSubmitAddDocument,
  } = useFirestoreAddDocument('prestamos', formulario);
  // Borrar Documento
  const { loading: isLoadingDelete, handleSubmit: handleSubmitDeleteDocument } =
    useFirestoreDeleteDocument('prestamos');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormulario({ ...formulario, [event.target.name]: event.target.value });
  };

  const handleSelectChangeEmpleado = (event: any) => {
    const empleado = event.label;
    setFormulario({ ...formulario, empleado: empleado });
  };

  const handleSelectChangeBanco = (event: any) => {
    const banco = event.label;
    setFormulario({ ...formulario, banco: banco });
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
            <h1>Prestamos</h1>
            <Card status="Primary">
              <CardHeader>Ingresar Prestamos</CardHeader>
              <CardBody>
                {!loadingEmpleados && !loadingBancos ? (
                  <PrestamosForm
                    bancos={dataBancos}
                    empleados={dataEmpleados}
                    handleSelectChangeEmpleado={handleSelectChangeEmpleado}
                    handleSelectChangeBanco={handleSelectChangeBanco}
                    handleChange={handleChange}
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
              <CardHeader>Listado de Prestamos</CardHeader>
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

export default Prestamos;
