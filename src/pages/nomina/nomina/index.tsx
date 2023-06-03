// Packages
import { useEffect, useState } from 'react';
import { where } from 'firebase/firestore';

// Components
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from '@paljs/ui';
import Tabla from 'components/Tabla';
import Layout from 'Layouts';
import columns from './columnas';

// Definitions
import { IPlainObject } from 'definitions/IPlainObjects';

// Hooks
import { useFirestoreCollection } from 'hooks/useFirestoreCollection';
import { IDeduccionEmpleado } from 'definitions/IDeduccionEmpleado';
import { IEmpleado } from 'definitions/IEmpleado';
import { useFirestoreCollectionQuery } from 'hooks/useFirestoreCollectionQuery';
import { getPDF } from 'services/jsreport';
import { currentDateUtil } from 'utilities/currentDate';
import { queryFirebase } from 'services/firebaseService';

const defaultForm: IDeduccionEmpleado = {
  empleadoId: '',
  empleado: '',
  deduccion: '',
  deduccionId: '',
  deduccionPorcentaje: '',
};

const NominaGeneral: React.FC<IPlainObject> = () => {
  const [tablaColumnas, setTablaColumnas] = useState<any[]>([]);

  // Traer los registros de la coleccion 'empleados' para imprimirlos en
  const { data: dataEmpleados, loading: loadingEmpleados } = useFirestoreCollection('empleados');

  const { data: dataDeducciones, handleSubmit: handleSubmitDeducciones } =
    useFirestoreCollectionQuery('deducciones_empleados');

  const insertarBotones = async () => {
    const botones: any = {
      name: 'Actions',
      cell: (row: { id: string }) => (
        <>
          <Button status="Primary" onClick={() => generaBoleta(row)}>
            Generar Boleta
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

  const generaBoleta = async (empleado: any) => {
    console.log('data', empleado);

    const deducciones = await queryFirebase(where('empleadoId', '==', empleado.id), 'deducciones_empleados');
    const deduccionesPorcentajes = deducciones.map((deduccion: any) => deduccion.deduccionPorcentaje);
    const sumaDeduccionesPorcentajes: number = deduccionesPorcentajes.reduce(
      (acumulador: any, numero: any) => acumulador + numero,
      0,
    );

    const totalDeducciones = empleado.sueldo * (sumaDeduccionesPorcentajes / 100);

    console.log('deducciones', deducciones);
    console.log('deduccionesPorcentajes', deduccionesPorcentajes);
    console.log('sumaDeduccionesPorcentajes', sumaDeduccionesPorcentajes);
    console.log('totalDeducciones', totalDeducciones);

    const bonificaciones = await queryFirebase(where('empleadoId', '==', empleado.id), 'bonificaciones_empleados');

    console.log('bonificaciones', bonificaciones);

    // sacar total de horas extras
    const horas = await queryFirebase(where('empleadoId', '==', empleado.id), 'horas_extras');
    const horasEmpleado: number[] = horas.map((item: any) => +item.horas_trabajadas);
    const sumaHorasEmpleado: number = horasEmpleado.reduce((acumulador, numero) => acumulador + numero, 0);

    const template = {
      name: 'boleta',
      chrome: {
        landscape: true,
      },
    };

    const data = {
      empleado: `${empleado.nombres} ${empleado.apellidos}`,
      departamento: empleado.departamento,
      sueldo: empleado.sueldo,
      deducciones: totalDeducciones || 0,
      horas: sumaHorasEmpleado,
      bonificaciones: '',
    };

    getPDF({ template, data });
  };

  const generarDatosEmpleados = async () => {
    console.log('generarDatosEmpleados');
    if (dataEmpleados) {
      dataEmpleados.map((empleado: IEmpleado) => {
        console.log('empleado', `${empleado.nombres} - ${empleado.id}`);

        handleSubmitDeducciones(where('empleadoId', '==', empleado.id));
        console.log('dataDeducciones', dataDeducciones);
      });
    }
  };

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

  return (
    <Layout title={'Nomina general'}>
      <Row>
        <Col>
          <Container>
            <h1>Nomina general</h1>
            <Card status="Success">
              <CardHeader>Listado de nomina</CardHeader>
              <CardBody>
                <Button appearance={'outline'} status="Info" onClick={imprimir}>
                  Exportar nomina general pdf
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

export default NominaGeneral;
