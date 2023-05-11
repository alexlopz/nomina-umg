import { Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import TipoAusenciaForm from 'components/tipoausencia';
import Tabla from 'components/Tabla';
import Layout from 'Layouts';

const columns = [
  {
    name: 'Id Empleado',
    selector: (row: { idEmpleado: any }) => row.idEmpleado,
    sortable: true,
  },
  {
    name: 'Tipo Ausencia',
    selector: (row: { tipoAusencia: any }) => row.tipoAusencia,
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
    idEmpleado: 10101,
    tipoAusencia: 'Maternidad',
    descripcion: '9 meses por tener Bebe',
  },
];

const TipoAusencia = () => {
  return (
    <Layout title={'Tipo de Ausencias'}>
      <Row>
        <Col>
          <Container>
            <h1>Tipo de Ausencias</h1>
            <Card status="Primary">
              <CardHeader>Ingresar Tipo de Ausencias</CardHeader>
              <CardBody>
                <TipoAusenciaForm />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>

      <Row>
        <Col>
          <Container>
            <Card status="Success">
              <CardHeader>Listado de Tipo de Ausencias</CardHeader>
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
export default TipoAusencia;
