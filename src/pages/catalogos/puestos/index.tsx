import { Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import PuestosForm from 'components/Catalogos/Puestos';
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
    name: 'Departamento',
    selector: (row: { departamento: any }) => row.departamento,
    sortable: true,
  },
];

const data = [
  {
    id: 1,
    nombre: 'Juan Perez',
    descripcion: 'Contabilidad',
    departamento: '001',
  },
  {
    id: 2,
    nombre: 'Carlos Morales',
    descripcion: 'Seguridad',
    departamento: '002',
  },
  {
    id: 3,
    nombre: 'Dylan Martinez',
    descripcion: 'Gerente Financiero',
    departamento: '010',
  },
];

const Puestos = () => {
  return (
    <Layout title={'Puestos'}>
      <Row>
        <Col>
          <Container>
            <h1>Puesto</h1>
            <Card status="Primary">
              <CardHeader>Ingresar Puesto</CardHeader>
              <CardBody>
                <PuestosForm />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>

      <Row>
        <Col>
          <Container>
            <Card status="Success">
              <CardHeader>Listado de Puesto</CardHeader>
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

export default Puestos;
