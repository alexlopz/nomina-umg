import { Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import MarcajeForm from 'components/Catalogos/Marcaje';
import Tabla from 'components/Tabla';
import Layout from 'Layouts';

const columns = [
  {
    name: 'Id',
    selector: (row: { id: any }) => row.id,
    sortable: true,
  },
  {
    name: 'Id Empleado',
    selector: (row: { empleado: any }) => row.empleado,
    sortable: true,
  },
  {
    name: 'Fecha/Hora Entrada',
    selector: (row: { horae: any }) => row.horae,
    sortable: true,
  },
  {
    name: 'Fecha/Hora Salida',
    selector: (row: { horas: any }) => row.horas,
    sortable: true,
  },
];

const data = [
  {
    id: 1,
    empleado: '1',
    horae: '24/03/2023 06:00',
    horas: '24/03/2023 17:00',
  },
  {
    id: 2,
    empleado: '2',
    horae: '24/03/2023 06:00',
    horas: '24/03/2023 17:00',
  },
  {
    id: 3,
    empleado: '3',
    horae: '24/03/2023 06:00',
    horas: '24/03/2023 17:00',
  },
];

const Marcaje = () => {
  return (
    <Layout title={'Marcaje'}>
      <Row>
        <Col>
          <Container>
            <h1>Marcaje</h1>
            <Card status="Primary">
              <CardHeader>Ingresar Marcaje</CardHeader>
              <CardBody>
                <MarcajeForm />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>

      <Row>
        <Col>
          <Container>
            <Card status="Success">
              <CardHeader>Listado de marcaje</CardHeader>
              <CardBody>
                <Tabla columns={columns} data={data} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </Layout>
  );
};

export default Marcaje;
