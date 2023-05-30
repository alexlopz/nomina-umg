import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import SalariosForm from 'components/Salarios';
import Tabla from 'components/Tabla';
import { Isalarios } from 'definitions/Isalarios';
import { useFirestoreAddDocument } from 'hooks/useFirestoreAddDocument';
import { useFirestoreCollection } from 'hooks/useFirestoreCollection';
import { useFirestoreDeleteDocument } from 'hooks/useFirestoreDeleteDocument';
import Layout from 'Layouts';
import columns from './columnas';
import router, { useRouter } from 'next/router';
import { Timestamp } from '@firebase/firestore';
import CustomSpinner from 'components/CustomSpinner';

const Salarios = () => {
  const [tablaColumnas, setTablaColumnas] = useState<any[]>([]);
  const [formulario, setFormulario] = useState<Isalarios>();

  // Traer listado de salarios
  const { data: dataSalarios, loading: loadingSalarios } = useFirestoreCollection('salarios');
  console.log(dataSalarios);

  // Guardar documento
  const {
    success: successAdd,
    loading: isLoadingAdd,
    handleSubmit: handleSubmitAddDocument,
  } = useFirestoreAddDocument('salarios', formulario);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormulario({ ...formulario, [event.target.name]: event.target.value });
  };

  // Eliminar de salarios
  const { loading: isLoadingDelete, handleSubmit: handleSubmitDeleteDocument } = useFirestoreDeleteDocument('salarios');

  // Traer listado de empleados
  const { data: dataEmpleados, loading: loadingEmpleados } = useFirestoreCollection('empleados');

  const router = useRouter();

  const handleSelectChange = (event: any) => {
    const salario = event.label;
    setFormulario({ ...formulario, salario: salario });
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
    <Layout title={'Salarios'}>
      <Row>
        <Col>
          <Container>
            <h1>Salarios</h1>
            <Card status="Primary">
              <CardHeader>Ingrese los Salarios</CardHeader>
              <CardBody>
                {!loadingEmpleados ? (
                  <SalariosForm
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
            <Card status="Primary">
              <CardHeader>Lista de Salarios</CardHeader>
              <CardBody>
                <Tabla columns={tablaColumnas} data={dataSalarios} loading={loadingSalarios} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </Layout>
  );
};

export default Salarios;
