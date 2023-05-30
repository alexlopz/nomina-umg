import { Button, Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import ComisionesForm from 'components/Comisiones';
import CustomSpinner from 'components/CustomSpinner';
import Tabla from 'components/Tabla';
import { Icomisiones } from 'definitions/Icomisiones';
import { useFirestoreAddDocument } from 'hooks/useFirestoreAddDocument';
import { useFirestoreCollection } from 'hooks/useFirestoreCollection';
import { useFirestoreDeleteDocument } from 'hooks/useFirestoreDeleteDocument';
import Layout from 'Layouts';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import columns from './columnas';

const Comisiones = () => {
  const [tablaColumnas, setTablaColumnas] = useState<any[]>([]);
  const [formulario, setFormulario] = useState<Icomisiones>();

  // Traer listado de salarios
  const { data: dataComisiones, loading: loadingComisiones } = useFirestoreCollection('comisiones');
  console.log(dataComisiones);

  // Guardar documento
  const {
    success: successAdd,
    loading: isLoadingAdd,
    handleSubmit: handleSubmitAddDocument,
  } = useFirestoreAddDocument('comisiones', formulario);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormulario({ ...formulario, [event.target.name]: event.target.value });
  };

  // Eliminar de salarios
  const { loading: isLoadingDelete, handleSubmit: handleSubmitDeleteDocument } =
    useFirestoreDeleteDocument('comisiones');

  // Traer listado de empleados
  const { data: dataEmpleados, loading: loadingEmpleados } = useFirestoreCollection('empleados');

  const router = useRouter();

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
    columns.push(botones);
    setTablaColumnas(columns);
  };

  useEffect(() => {
    insertarBotones();
  }, []);

  useEffect(() => {
    if (successAdd) router.reload();
  }, [successAdd]);

  return (
    <Layout title={'Comisiones'}>
      <div>
        <Row>
          <Col>
            <Container>
              <h1>Comisiones</h1>
              <Card status="Primary">
                <CardHeader>Ingrese los Comisiones</CardHeader>
                <CardBody>
                  {!loadingEmpleados ? (
                    <ComisionesForm
                      empleados={dataEmpleados}
                      handleSubmit={handleSubmitAddDocument}
                      handleChange={handleChange}
                      handleFechaChange={handleChange}
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
              <Card status="Primary">
                <CardHeader>Lista de Comisiones</CardHeader>
                <CardBody>
                  <Tabla columns={tablaColumnas} data={dataComisiones} loading={loadingComisiones} />
                </CardBody>
              </Card>
            </Container>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Comisiones;
