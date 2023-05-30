import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import TipoAusenciaForm from 'components/tipoausencia';
import Tabla from 'components/Tabla';
import Layout from 'Layouts';
import columns from './columnas';
import { useFirestoreCollection } from 'hooks/useFirestoreCollection';
import { useFirestoreAddDocument } from 'hooks/useFirestoreAddDocument';
import router from 'next/router';
import CustomSpinner from 'components/CustomSpinner';
import { ITipoAusencia } from 'definitions/ITipoAusencia';
import { useFirestoreDeleteDocument } from 'hooks/useFirestoreDeleteDocument';
import { IPlainObject } from 'definitions/IPlainObjects';

const TipoAusencia: React.FC<IPlainObject> = () => {
  const [tablaColumnas, setTablaColumnas] = useState<any[]>([]);
  const { data: dataTipoAusencias, loading: loadingTipoAusencias } = useFirestoreCollection('tipoAusencias');
  console.log(dataTipoAusencias);

  const [formulario, setFormulario] = useState<ITipoAusencia>();

  const { data: dataEmpleados, loading: loadingEmpleados } = useFirestoreCollection('empleados');

  const { loading: isLoadingDelete, handleSubmit: handleSubmitDeleteDocument } =
    useFirestoreDeleteDocument('tipoAusencias');

  const {
    success: successAdd,
    loading: isLoadingAdd,
    handleSubmit: handleSubmitAddDocument,
  } = useFirestoreAddDocument('tipoAusencias', formulario);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormulario({ ...formulario, [event.target.name]: event.target.value });
  };

  const handleSelectChange = (event: any) => {
    const empleado = event.label;
    setFormulario({ ...formulario, empleado: empleado });
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
    <Layout title={'Tipo de Ausencias'}>
      <Row>
        <Col>
          <Container>
            <h1>Tipo de Ausencias</h1>
            <Card status="Primary">
              <CardHeader>Ingresar Tipo de Ausencias</CardHeader>
              <CardBody>
                {!loadingEmpleados ? (
                  <TipoAusenciaForm
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
            <Card status="Success">
              <CardHeader>Listado de Tipo de Ausencias</CardHeader>
              <CardBody>
                <Tabla columns={tablaColumnas} data={dataTipoAusencias} loading={loadingTipoAusencias} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </Layout>
  );
};

export default TipoAusencia;
