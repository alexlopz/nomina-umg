import { Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import UsuarioForm from 'components/Empleados/Usuario';
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
    name: 'Apellido',
    selector: (row: { apellido: any }) => row.apellido,
    sortable: true,
  },
  {
    name: 'Email',
    selector: (row: { email: any }) => row.email,
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
    nombre: 'Juan',
    apellido: 'Perez',
    email: 'jperez@gmail.com',
    id_empleado: '1',
  },
  {
    id: 2,
    nombre: 'Carlos',
    apellido: 'Morales',
    email: 'cmorales@gmail.com',
    id_empleado: '2',
  },
  {
    id: 3,
    nombre: 'Dylan',
    apellido: 'Martinez',
    email: 'dmartinez@gmail.com',
    id_empleado: '3',
  },
];

const Usuario = () => {
  const miFuncion = () => {
    console.log('hola mundo');
  };
  return (
    <Layout title={'Usuario'}>
      <Row>
        <Col>
          <Container>
            <h1>Usuario</h1>
            <Card status="Primary">
              <CardHeader>Ingresar Datos de Usuario</CardHeader>
              <CardBody>
                <UsuarioForm handleSubmit={miFuncion} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>

      <Row>
        <Col>
          <Container>
            <Card status="Primary">
              <CardHeader>Listado de Usuarios</CardHeader>
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

export default Usuario;
