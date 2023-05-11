import { Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import NominasForm from 'components/Nominas';
import Tabla from 'components/Tabla';
import Layout from 'Layouts';

const columns = [
  {
    name: 'Id',
    selector: (row: { id: any }) => row.id,
    sortable: true,
  },
  {
    name: 'Apellido',
    selector: (row: { apellido: any }) => row.apellido,
    sortable: true,
  },
  {
    name: 'E-mail',
    selector: (row: { email: any }) => row.email,
    sortable: true,
  },
  {
    name: 'Contrasena',
    selector: (row: { contrasena: any }) => row.contrasena,
    sortable: true,
  },
  {
    name: 'Id Empleado',
    selector: (row: { id_empleado: any }) => row.id_empleado,
    sortable: true,
  },
];

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
                <Tabla columns={columns} data={data} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </Layout>
  );
};

export default Nominas;
