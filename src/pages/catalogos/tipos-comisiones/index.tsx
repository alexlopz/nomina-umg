import { Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import ComisionForm from 'components/Catalogos/Comisiones';
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
    nombre: 'Venta de Verano',
    descripcion: 'Lorem ipsum',
  },
  {
    id: 2,
    nombre: 'Afiliado',
    descripcion: 'Lorem ipsum',
  },
];

const TiposComisiones = () => {
  return (
    <Layout title={'Deducciones'}>
      <Row>
        <Col>
          <Container>
            <h1>Tipo de Comisiones</h1>
            <Card status="Primary">
              <CardHeader>Ingresar comision</CardHeader>
              <CardBody>
                <ComisionForm />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>

      <Row>
        <Col>
          <Container>
            <Card status="Success">
              <CardHeader>Listado de comisiones</CardHeader>
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

export default TiposComisiones;
