import { Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import AusenciasForm from 'components/Ausencias';
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
];

const data = [
  {
    id: 1,
    nombre: 'Alex',
    descripcion: 'Accidente',
  },
  {
    id: 2,
    nombre: 'Marlon',
    descripcion: 'Enfermedad',
  },
  {
    id: 3,
    nombre: 'Nestor',
    descripcion: 'Suspencion',
  },
];

const Ausencias = () => {
  return (
    <Layout title={'Tipo de Ausencias'}>
      <h1>Tipo de Ausencias</h1>
      <Row>
        <Col>
          <Container>
            <Card status="Primary">
              <CardHeader>Ingrese Tipo de Ausencia</CardHeader>
              <CardBody>
                <AusenciasForm />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>

      <Row>
        <Col>
          <Container>
            <Card status="Success">
              <CardHeader>Listado de Tipos de Ausencia</CardHeader>
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

export default Ausencias;
