import { Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import DepartamentoForm from 'components/Catalogos/Departamento';
import Tabla from 'components/Tabla';
import Layout from 'Layouts';

const columns = [
  {
    name: 'Id',
    selector: (row: { id: any }) => row.id,
    sortable: true,
  },
  {
    name: 'Nombre',
    selector: (row: { nombre: any }) => row.nombre,
    sortable: true,
  },
  {
    name: 'Descripcion',
    selector: (row: { descripcion: any }) => row.descripcion,
    sortable: true,
  },
  {
    name: 'Jefe',
    selector: (row: { jefe: any }) => row.jefe,
    sortable: true,
  },
];

const data = [
  {
    id: 1,
    nombre: 'Juan Perez',
    descripcion: 'Contabilidad',
    jefe: '010',
  },
  {
    id: 2,
    nombre: 'Carlos Morales',
    descripcion: 'Seguridad',
    jefe: '011',
  },
];

const Departamento = () => {
  return (
    <Layout title={'Departamento'}>
      <Row>
        <Col>
          <Container>
            <h1>Departamento</h1>
            <Card status="Primary">
              <CardHeader>Ingresar Departamento</CardHeader>
              <CardBody>
                <DepartamentoForm />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>

      <Row>
        <Col>
          <Container>
            <Card status="Success">
              <CardHeader>Listado Departamento</CardHeader>
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

export default Departamento;
