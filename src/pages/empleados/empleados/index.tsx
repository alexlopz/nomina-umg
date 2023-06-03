// Packages
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Timestamp, where } from 'firebase/firestore';

// Components
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import Tabla from 'components/Tabla';
import Layout from 'Layouts';
import columns from './columnas';
import CustomSpinner from 'components/CustomSpinner';
import EmpleadosForm from 'components/Empleados/empleados';

// Definitions
import { IPlainObject } from 'definitions/IPlainObjects';
import { IEmpleado } from 'definitions/IEmpleado';

// Hooks
import { useFirestoreAddDocument } from 'hooks/useFirestoreAddDocument';
import { useFirestoreDeleteDocument } from 'hooks/useFirestoreDeleteDocument';
import { useFirestoreCollection } from 'hooks/useFirestoreCollection';
import { useFirestoreCollectionQuery } from 'hooks/useFirestoreCollectionQuery';
import useFirestoreUpdateDocument from 'hooks/useFirestoreUpdateDocument';
import { currentDateUtil } from 'utilities/currentDate';
import { getPDF } from 'services/jsreport';

const defaultForm: IEmpleado = {
  nombres: '',
  apellidos: '',
  dpi: undefined,
  correo: '',
  nit: '',
  nacimiento: '',
  genero: '',
  direccion: '',
  telefono: undefined,
  departamento: '',
  departamentoId: '',
  puesto: '',
  puestoId: '',
  jornada: '',
  sueldo: undefined,
  periodo_pago: '',
  fecha_ingreso: '',
  estado: '',
  banco_cuenta: '',
  tipo_cuenta: '',
  bancoId: '',
};

const Empleados: React.FC<IPlainObject> = () => {
  const [tablaColumnas, setTablaColumnas] = useState<any[]>([]);
  const [formulario, setFormulario] = useState<IEmpleado>(defaultForm);
  const [modoEdicion, setModoEdicion] = useState<boolean>(false);
  console.log('formulario', formulario);
  const router = useRouter();

  // Traer los registros de la coleccion 'empleados' para imprimirlos en
  const { data: dataEmpleados, loading: loadingEmpleados } = useFirestoreCollection('empleados');

  // Traer los registros de departemos, bancos y puestos para mostrarlos en el formulario
  const { data: dataDepartamentos, loading: loadingDepartamentos } = useFirestoreCollection('departamentos');
  const { data: dataBancos, loading: loadingBancos } = useFirestoreCollection('bancos');
  const { data: dataPuestos, handleSubmit: handleSubmitPuestos } = useFirestoreCollectionQuery('puestos');

  // Agregar Documento
  const {
    success: successAdd,
    loading: isLoadingAdd,
    handleSubmit: handleSubmitAddDocument,
  } = useFirestoreAddDocument('empleados', formulario);

  // Actualizar Documento
  const {
    success: successUpdate,
    loading: loadingUpdateEmpleados,
    handleSubmit: handleSubmitUpdateDocument,
  } = useFirestoreUpdateDocument('empleados', formulario);

  console.log('successUpdate', successUpdate);

  // Borrar Documento
  const { handleSubmit: handleSubmitDeleteDocument } = useFirestoreDeleteDocument('prestamos');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormulario({ ...formulario, [event.target.name]: event.target.value });
  };

  const handleSelectDepartamento = async (event: any) => {
    const departamento = event.label;
    const departamentoId = event.value;
    handleSubmitPuestos(where('departamentoId', '==', departamentoId));
    setFormulario({ ...formulario, departamento, departamentoId });
  };

  const handleSelectChange = (event: any) => {
    setFormulario({ ...formulario, [event.name]: event.value });
  };

  const handleSelectPuesto = (event: any) => {
    const puesto = event.label;
    const puestoId = event.value;
    setFormulario({ ...formulario, puesto, puestoId });
  };

  const handleFechaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fecha = new Date(event.target.value);
    setFormulario({ ...formulario, [event.target.name]: Timestamp.fromDate(fecha) });
  };

  const editarForm = (row: any) => {
    setModoEdicion(true);
    setFormulario(row);
  };

  const insertarBotones = async () => {
    const botones: any = {
      name: 'Actions',
      cell: (row: { id: string }) => (
        <>
          <Button status="Warning" onClick={() => editarForm(row)}>
            Editar
          </Button>
          {/* <Button status="Danger" onClick={() => handleSubmitDeleteDocument(row.id)}>
            Eliminar
          </Button> */}
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    };
    setTablaColumnas([...columns, botones]);
  };

  const handleSubmit = async (e: any) => {
    if (!modoEdicion) {
      handleSubmitAddDocument(e);
    } else {
      handleSubmitUpdateDocument(e);
    }
  };
  const resetForm = () => {
    setFormulario(defaultForm);
    setModoEdicion(false);
  };

  useEffect(() => {
    insertarBotones();
  }, []);

  useEffect(() => {
    if (successAdd || successUpdate) router.reload();
  }, [successAdd, successUpdate]);

  const imprimir = () => {
    const template = {
      name: 'listado',
      chrome: {
        landscape: true,
      },
    };

    const data = {
      titulo: 'Lista de Empleados',
      fecha: currentDateUtil(),
      empleados: dataEmpleados,
    };

    getPDF({ template, data });
  };

  return (
    <Layout title={'Horas Extras'}>
      <Row>
        <Col>
          <Container>
            <h1>Empleados</h1>
            <Card status="Primary">
              <CardHeader>Ingresar Empleado</CardHeader>
              <CardBody>
                {!loadingDepartamentos && !loadingBancos ? (
                  <EmpleadosForm
                    bancos={dataBancos}
                    departamentos={dataDepartamentos}
                    puestos={dataPuestos}
                    handleSelectDepartamento={handleSelectDepartamento}
                    handleSelectChange={handleSelectChange}
                    handleSelectPuesto={handleSelectPuesto}
                    handleChange={handleChange}
                    handleFechaChange={handleFechaChange}
                    handleSubmit={handleSubmit}
                    formulario={formulario}
                    loading={isLoadingAdd || loadingUpdateEmpleados}
                    modoEdicion={modoEdicion}
                    resetForm={resetForm}
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
              <CardHeader>Listado de Empleados</CardHeader>
              <CardBody>
                <Button appearance={'outline'} status="Info" onClick={imprimir}>
                  Exportar pdf
                </Button>
                <Tabla columns={tablaColumnas} data={dataEmpleados} loading={loadingEmpleados} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </Layout>
  );
};

export default Empleados;
