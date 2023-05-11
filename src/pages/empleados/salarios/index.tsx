import { Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import SalariosForm from 'components/Salarios';
import Tabla from 'components/Tabla';
import Layout from 'Layouts';

const columns = [
  {
    name: 'Id',
    selector: (row: { id: any }) => row.id,
    sortable: true,
  },
  {
    name: 'Fecha',
    selector: (row: { fecha: any }) => row.fecha,
    sortable: true,
  },
  {
    name: 'Descripcion',
    selector: (row: { descripcion: any }) => row.descripcion,
    sortable: true,
  },
  {
    name: 'Salario',
    selector: (row: { salario: any }) => row.salario,
    sortable: true,
  },
];

const data = [
  {
    id: 1,
    fecha: '03/20/2023',
    descripcion: 'mensual',
    salario: 1000,
  },
];

const Salarios = () => {
  return (
    <Layout title={'Salarios'}>
      <Row>
        <Col>
          <Container>
            <h1>Salarios</h1>
            <Card status="Primary">
              <CardHeader>Ingrese los Salarios</CardHeader>
              <CardBody>
                <SalariosForm />
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
                <Tabla columns={columns} data={data} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </Layout>
  );
};

export default Salarios;
