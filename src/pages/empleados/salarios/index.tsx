import { Button, Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import SalariosForm from 'components/Salarios';
import Tabla from 'components/Tabla';
import { useFirestoreCollection } from 'hooks/useFirestoreCollection';
import { useFirestoreDeleteDocument } from 'hooks/useFirestoreDeleteDocument';
import Layout from 'Layouts';
import { useEffect, useState } from 'react';
import columns from './columnas';

const Salarios = () => {
  const [tablaColumnas, setTablaColumnas] = useState<any[]>([]);
  // Traer listado de salarios
  const { data: dataSalarios, loading: loadingSalarios } = useFirestoreCollection('salarios');
  console.log(dataSalarios);
  // eliminar de salarios
  const { loading: isLoadingDelete, handleSubmit: handleSubmitDeleteDocument } = useFirestoreDeleteDocument('salarios');
  // Traer listado de empleados
  const { data: dataEmpleados, loading: loadingEmpleados } = useFirestoreCollection('empleados');

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

  return (
    <Layout title={'Salarios'}>
      <Row>
        <Col>
          <Container>
            <h1>Salarios</h1>
            <Card status="Primary">
              <CardHeader>Ingrese los Salarios</CardHeader>
              <CardBody>
                <SalariosForm empleados={dataEmpleados} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>

      <Row>
        <Col>
          <Container>
            <Card status="Primary">
              <CardHeader>Lista de Salarios</CardHeader>
              <CardBody>
                <Tabla columns={tablaColumnas} data={dataSalarios} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </Layout>
  );
};

export default Salarios;
