import { Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import PagoForm from 'components/Catalogos/Pago';
import Tabla from 'components/Tabla';
import Layout from 'Layouts';

const columns = [
  {
    name: 'Id',
    selector: (row: { id: any }) => row.id,
    sortable: true,
  },
  {
    name: 'Moneda',
    selector: (row: { moneda: any }) => row.moneda,
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
    moneda: 'Quetzales GTQ',
    nombre: 'Juan Perez',
    descripcion: 'Pago de Servicios Prestados Marzo',
  },
  {
    id: 2,
    moneda: 'Quetzales GTQ',
    nombre: 'Carlos Morales',
    descripcion: 'Pago de Servicios Prestados Marzo',
  },
  {
    id: 3,
    moneda: 'Dolares USD',
    nombre: 'JDylan Martinez',
    descripcion: 'Pago de Servicios Prestados Marzo',
  },
];

const mn = [
  { value: 'Q', label: 'Quetzales GTQ' },
  { value: '$', label: 'Dolares USD' },
];

const Pago = () => {
  const miFuncion = () => {
    console.log('hola mundo');
  };
  return (
    <Layout title={'Horas Extras'}>
      <Row>
        <Col>
          <Container>
            <h1>Tipo de Pago</h1>
            <Card status="Primary">
              <CardHeader>Ingresar el Tipo de Pago</CardHeader>
              <CardBody>
                <PagoForm handleSubmit={miFuncion} mn={mn} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>

      <Row>
        <Col>
          <Container>
            <Card status="Primary">
              <CardHeader>Listado de Tipo de Pago</CardHeader>
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

export default Pago;
