// Packages
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Components
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import Tabla from 'components/Tabla';
import Layout from 'Layouts';
import columns from './columnas';
import CustomSpinner from 'components/CustomSpinner';

// Definitions
import { IPlainObject } from 'definitions/IPlainObjects';

// Hooks
import { useFirestoreAddDocument } from 'hooks/useFirestoreAddDocument';
import { useFirestoreDeleteDocument } from 'hooks/useFirestoreDeleteDocument';
import { useFirestoreCollection } from 'hooks/useFirestoreCollection';
import BonificacionesEmpleadoForm from 'components/Empleados/bonificaciones';
import { IBonificacionEmpleado } from 'definitions/IBonificacionEmpleado';

const defaultForm: IBonificacionEmpleado = {
  empleadoId: '',
  empleado: '',
  bonificacion: '',
  bonificacionId: '',
  monto: undefined,
};

const Bonificaciones: React.FC<IPlainObject> = () => {
  const [tablaColumnas, setTablaColumnas] = useState<any[]>([]);
  const [formulario, setFormulario] = useState<IBonificacionEmpleado>(defaultForm);
  console.log('formulario', formulario);
  const router = useRouter();

  // Traer los registros de la coleccion 'empleados' para imprimirlos en
  const { data: dataEmpleados, loading: loadingEmpleados } = useFirestoreCollection('empleados');

  // Traer los registros de deducciones para mostrarlos en el formulario
  const { data: dataBonificaciones, loading: loadingBonificaciones } = useFirestoreCollection('bonificaciones');

  // Traer los registros de deducciones_empleados para mostrarlos en el formulario
  const { data: dataDeduccionesEmpleados, loading: loadingDeduccionesEmpleados } =
    useFirestoreCollection('bonificaciones_empleados');

  // Agregar Documento
  const {
    success: successAdd,
    loading: isLoadingAdd,
    handleSubmit: handleSubmitAddDocument,
  } = useFirestoreAddDocument('bonificaciones_empleados', formulario);

  // Borrar Documento
  const { handleSubmit: handleSubmitDeleteDocument } = useFirestoreDeleteDocument('bonificaciones_empleados');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormulario({ ...formulario, [event.target.name]: event.target.value });
  };

  const handleSelectChange = (event: any) => {
    const empleado = event.label;
    const empleadoId = event.value;
    setFormulario({ ...formulario, empleado, empleadoId });
  };

  const handleSelectChangeBonificaciones = async (event: any) => {
    const bonificacion = event.label;
    const bonificacionId = event.value;
    setFormulario({ ...formulario, bonificacion, bonificacionId });
  };

  const insertarBotones = async () => {
    const botones: any = {
      name: 'Actions',
      cell: (row: { id: string }) => (
        <>
          {/* <Button status="Warning" onClick={() => editarForm(row)}>
            Editar
          </Button> */}
          <Button status="Danger" onClick={() => handleSubmitDeleteDocument(row.id)}>
            Eliminar
          </Button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    };
    setTablaColumnas([...columns, botones]);
  };

  useEffect(() => {
    insertarBotones();
  }, []);

  useEffect(() => {
    if (successAdd) router.reload();
  }, [successAdd]);

  return (
    <Layout title={'Horas Extras'}>
      <Row>
        <Col>
          <Container>
            <h1>Bonificaciones Empleado</h1>
            <Card size="Small" status="Primary">
              <CardHeader>Ingresar Bonificacion</CardHeader>
              <CardBody>
                {!loadingEmpleados && !loadingBonificaciones ? (
                  <BonificacionesEmpleadoForm
                    handleSubmit={handleSubmitAddDocument}
                    handleChange={handleChange}
                    empleados={dataEmpleados}
                    catalogoBonificaciones={dataBonificaciones}
                    handleSelectChange={handleSelectChange}
                    handleSelectChangeBonificaciones={handleSelectChangeBonificaciones}
                    loading={isLoadingAdd}
                  />
                ) : (
                  <CustomSpinner status="Primary" size="Large" padding />
                )}
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container>
            <Card status="Success">
              <CardHeader>Listado de Bonificaciones por empleado</CardHeader>
              <CardBody>
                <Tabla columns={tablaColumnas} data={dataDeduccionesEmpleados} loading={loadingDeduccionesEmpleados} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </Layout>
  );
};

export default Bonificaciones;
