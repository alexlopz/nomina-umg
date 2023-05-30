import { Button, Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import CustomSpinner from 'components/CustomSpinner';
import NominasForm from 'components/Nominas';
import Tabla from 'components/Tabla';
import { Inominas } from 'definitions/Inominas';
import { useFirestoreAddDocument } from 'hooks/useFirestoreAddDocument';
import { useFirestoreCollection } from 'hooks/useFirestoreCollection';
import { useFirestoreDeleteDocument } from 'hooks/useFirestoreDeleteDocument';
import Layout from 'Layouts';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import columns from './columnas';

const Nominas = () => {
  const [tablaColumnas, setTablaColumnas] = useState<any[]>([]);
  const [formulario, setFormulario] = useState<Inominas>();

  // Traer listado de nominas
  const { data: dataNominas, loading: loadingNominas } = useFirestoreCollection('nominas');
  console.log(dataNominas);

  // Guardar documento
  const {
    success: successAdd,
    loading: isLoadingAdd,
    handleSubmit: handleSubmitAddDocument,
  } = useFirestoreAddDocument('nominas', formulario);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormulario({ ...formulario, [event.target.name]: event.target.value });
  };

  // Eliminar de nomina
  const { loading: isLoadingDelete, handleSubmit: handleSubmitDeleteDocument } = useFirestoreDeleteDocument('nominas');

  // Traer listado de empleados
  const { data: dataEmpleados, loading: loadingEmpleados } = useFirestoreCollection('empleados');

  const router = useRouter();

  const handleSelectChange = (event: any) => {
    const nominas = event.label;
    setFormulario({ ...formulario, apellido: nominas });
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
    <Layout title={'Nominas'}>
      <Row>
        <Col>
          <Container>
            <h1>Nominas</h1>
            <Card status="Primary">
              <CardHeader>Ingrese Nomina</CardHeader>
              <CardBody>
                {!loadingEmpleados ? (
                  <NominasForm
                    empleados={dataEmpleados}
                    handleSubmit={handleSubmitAddDocument}
                    handleChange={handleChange}
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
            <Card status="Primary">
              <CardHeader>Lista de Nominas</CardHeader>
              <CardBody>
                <Tabla columns={tablaColumnas} data={dataNominas} loading={loadingNominas} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </Layout>
  );
};

export default Nominas;
