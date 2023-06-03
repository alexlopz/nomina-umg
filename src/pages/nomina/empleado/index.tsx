// Packages
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { where } from 'firebase/firestore';

// Components
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import Layout from 'Layouts';
import columns from './columnas';

// Definitions
import { IPlainObject } from 'definitions/IPlainObjects';

// Hooks
import { useFirestoreDeleteDocument } from 'hooks/useFirestoreDeleteDocument';
import { useFirestoreCollection } from 'hooks/useFirestoreCollection';
import { IDeduccionEmpleado } from 'definitions/IDeduccionEmpleado';
import { IEmpleado } from 'definitions/IEmpleado';
import { useFirestoreCollectionQuery } from 'hooks/useFirestoreCollectionQuery';
import { getPDF } from 'services/jsreport';
import { currentDateUtil } from 'utilities/currentDate';
import NominaEmpleadoForm from 'components/Empleados/nomina';

const defaultForm: IDeduccionEmpleado = {
  empleadoId: '',
  empleado: '',
  deduccion: '',
  deduccionId: '',
  deduccionPorcentaje: '',
};

const NominaEmpleado: React.FC<IPlainObject> = () => {
  const [tablaColumnas, setTablaColumnas] = useState<any[]>([]);
  const [dataNomina, setDataNomina] = useState<any[]>([]);
  const [formulario, setFormulario] = useState<IDeduccionEmpleado>(defaultForm);
  const router = useRouter();

  // Traer los registros de la coleccion 'empleados' para imprimirlos en
  const { data: dataEmpleados, loading: loadingEmpleados } = useFirestoreCollection('empleados');

  const { data: dataDeducciones, handleSubmit: handleSubmitDeducciones } =
    useFirestoreCollectionQuery('deducciones_empleados');

  // Borrar Documento
  const { handleSubmit: handleSubmitDeleteDocument } = useFirestoreDeleteDocument('deducciones_empleados');

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
    setTablaColumnas([...columns]);
  }, []);

  const generarDatosEmpleados = async () => {
    // const valores: any = [];
    console.log('generarDatosEmpleados');

    if (dataEmpleados) {
      dataEmpleados.map((empleado: IEmpleado) => {
        console.log('empleado', `${empleado.nombres} - ${empleado.id}`);

        handleSubmitDeducciones(where('empleadoId', '==', empleado.id));
        console.log('dataDeducciones', dataDeducciones);
      });
    }

    // empleados.map((empleado: IEmpleado) => {
    //   const value = {
    //     label: `${empleado.nombres} ${empleado.apellidos}`,
    //     value: empleado.id,
    //     name: 'empleado',
    //   };
    //   valores.push(value);
    //   setDataEmpleados(valores);
    // });
  };
  console.log('dataDeducciones out', dataDeducciones);

  useEffect(() => {
    if (dataEmpleados) {
      generarDatosEmpleados();
    }
  }, [dataEmpleados]);

  const imprimir = () => {
    const template = {
      name: 'nomina',
      chrome: {
        landscape: true,
      },
    };

    const data = {
      titulo: 'Nomina General',
      fecha: currentDateUtil(),
      empleados: dataEmpleados,
    };

    getPDF({ template, data });
  };

  const generarBoleta = () => {
    // setDataNomina()
  };

  return (
    <Layout title={'Nomina general'}>
      <Row>
        <Col>
          <Container>
            <h1>Generar boleta empleado</h1>
            <Card size="Large" status="Success">
              <CardHeader>Listado de nomina</CardHeader>
              <CardBody>
                <NominaEmpleadoForm empleados={dataEmpleados} handleSubmit={generarBoleta} />
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </Layout>
  );
};

export default NominaEmpleado;
