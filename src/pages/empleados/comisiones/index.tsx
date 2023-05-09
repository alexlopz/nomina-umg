import { Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import ComisionesForm from 'components/Empleados/comisiones';
import Tabla from 'components/Tabla';
import Layout from 'Layouts';

const columns = [
  {
    name: 'Id',
    selector: (row: { id: any }) => row.id,
    sortable: true,
  },
  {
    name: 'Tipo Comision',
    selector: (row: { tipocomision: any }) => row.tipocomision,
    sortable: true,
  },
  {
    name: 'Total a Pagar',
    selector: (row: { totalapagar: any }) => row.totalapagar,
    sortable: true,
  },
  {
    name: 'Periodo',
    selector: (row: { periodo: any }) => row.periodo,
    sortable: true,
  },
];

const data = [
  {
    id: 1,
    tipocomision: 'moneraria',
    totalapagar: 1000,
    periodo: 'enero',
  },
];

const Comisiones = () => {
  return (
    <Layout title={'Comisiones'}>
      <h1>Comisiones</h1>
      <Row>
        <Col>
          <Container>
            <Card status="Primary">
              <CardHeader>Ingrese Comisiones</CardHeader>
              <CardBody>
                <ComisionesForm />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>

      <Row>
        <Col>
          <Container>
            <Card status="Primary">
              <CardHeader>Lista de Comisiones </CardHeader>
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

export default Comisiones;
