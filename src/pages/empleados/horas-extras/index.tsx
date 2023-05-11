// Packages
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Timestamp } from '@firebase/firestore';

// Components
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import HorasExtrasForm from 'components/Empleados/horas';
import columns from './columns';
import Tabla from 'components/Tabla';
import Layout from 'Layouts';
import CustomSpinner from 'components/CustomSpinner';

// Definitions
import { IPlainObject } from 'definitions/IPlainObjects';
import { IHoraExtra } from 'definitions/IHoraExtra';

// Hooks
import { useFirestoreAddDocument } from 'hooks/useFirestoreAddDocument';
import { useFirestoreCollection } from 'hooks/useFirestoreCollection';
import { useFirestoreDeleteDocument } from 'hooks/useFirestoreDeleteDocument';

const HorasExtras: React.FC<IPlainObject> = () => {
  const [tablaColumnas, setTablaColumnas] = useState<any[]>([]);
  const [formulario, setFormulario] = useState<IHoraExtra>();

  // Traer listado de horas extras
  const { data: dataHorasExtras, loading: loadingHorasExtras } = useFirestoreCollection('horas_extras');

  // Traer listado de empleados
  const { data: dataEmpleados, loading: loadingEmpleados } = useFirestoreCollection('empleados');

  // Guardar documento
  const {
    success: successAdd,
    loading: isLoadingAdd,
    handleSubmit: handleSubmitAddDocument,
  } = useFirestoreAddDocument('horas_extras', formulario);

  // Borrar Documento
  const { loading: isLoadingDelete, handleSubmit: handleSubmitDeleteDocument } =
    useFirestoreDeleteDocument('horas_extras');

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormulario({ ...formulario, [event.target.name]: event.target.value });
  };

  const handleSelectChange = (event: any) => {
    const empleado = event.label;
    setFormulario({ ...formulario, empleado: empleado });
  };

  const handleFechaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fecha = new Date(event.target.value);
    setFormulario({ ...formulario, fecha: Timestamp.fromDate(fecha) });
  };

  const insertarBotones = async () => {
    const botones: any = {
      name: 'Actions',
      cell: (row: { id: string }) => (
        <Button status="Danger" onClick={() => handleSubmitDeleteDocument(row.id)}>
          Eliminar
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    };
    columns.push(botones);
    setTablaColumnas(columns);
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
            <h1>Horas Extras</h1>
            <Card status="Primary">
              <CardHeader>Ingresar Horas Extras</CardHeader>
              <CardBody>
                {!loadingEmpleados ? (
                  <HorasExtrasForm
                    empleados={dataEmpleados}
                    handleSubmit={handleSubmitAddDocument}
                    handleChange={handleChange}
                    handleFechaChange={handleFechaChange}
                    handleSelectChange={handleSelectChange}
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
              <CardHeader>Listado Horas Extras</CardHeader>
              <CardBody>
                <Tabla columns={tablaColumnas} data={dataHorasExtras} loading={loadingHorasExtras} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </Layout>
  );
};

export default HorasExtras;
