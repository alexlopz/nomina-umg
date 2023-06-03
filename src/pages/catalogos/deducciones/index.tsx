import { Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import DeduccionesForm from 'components/Catalogos/Deducciones';
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
    name: 'Porcentaje',
    selector: (row: { porcentaje: any }) => row.porcentaje,
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
    nombre: 'IGSS',
    porcentaje: '4.83',
    descripcion: 'Seguro Social',
  },
  {
    id: 2,
    nombre: 'IRTRA',
    porcentaje: '2',
    descripcion: 'Seguro de recreacion',
  },
  {
    id: 3,
    nombre: 'INTECAP',
    porcentaje: '1',
    descripcion: 'Seguro de capacitacion',
  },
];

const Deducciones = () => {
  return (
    <Layout title={'Deducciones'}>
      <Row>
        <Col>
          <Container>
            <h1>Deducciones</h1>
            <Card status="Primary">
              <CardHeader>Ingresar deducciones</CardHeader>
              <CardBody>
                <DeduccionesForm />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>

      <Row>
        <Col>
          <Container>
            <Card status="Success">
              <CardHeader>Listado de deducciones</CardHeader>
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

export default Deducciones;
