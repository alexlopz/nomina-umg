import { Button, Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import NominasForm from 'components/Nominas';
import Tabla from 'components/Tabla';
import { useFirestoreDeleteDocument } from 'hooks/useFirestoreDeleteDocument';
import Layout from 'Layouts';
import { useState } from 'react';
import columns from './columnas';

const data = [
  {
    id: 1,
    apellido: 'Monzon',
    email: 'monzon@gmail,com',
    contrasena: 123456,
    id_empleado: 10101,
  },
];

const Nominas = () => {
  const [tablaColumnas, setTablaColumnas] = useState<any[]>([]);

  const { loading: isLoadingDelete, handleSubmit: handleSubmitDeleteDocument } = useFirestoreDeleteDocument('nomina');

  const insertarBotones = async () => {
    const botones: any = {
      name: 'Actions',
      cell: (row: { id: string }) => (
        <Button status="Danger" onClick={() => handleSubmitDeleteDocument(row.id)}>
          Eliminar
        </Button>
      ),
      ignoreRowClick: true,
      _allowOverflow: true,
      get allowOverflow() {
        return this._allowOverflow;
      },
      set allowOverflow(value) {
        this._allowOverflow = value;
      },
      button: true,
    };
    columns.push(botones);
    setTablaColumnas(columns);
  };
  return (
    <Layout title={'Nominas'}>
      <Row>
        <Col>
          <Container>
            <h1>Nominas</h1>
            <Card status="Primary">
              <CardHeader>Ingrese Nomina</CardHeader>
              <CardBody>
                <NominasForm />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>

      <Row>
        <Col>
          <Container>
            <Card status="Primary">
              <CardHeader>Lista de Nominas</CardHeader>
              <CardBody>
                <Tabla columns={tablaColumnas} data={data} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </Layout>
  );
};

export default Nominas;
