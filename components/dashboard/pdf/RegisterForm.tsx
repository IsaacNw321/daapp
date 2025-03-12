import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
    fontFamily: 'Helvetica',
  },
  logoContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: "green",
    color: "white",
    width: "400px"
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  value: {
    fontSize: 12,
    marginBottom: 5,
  },
  instructions: {
    fontSize: 10,
    marginTop: 15,
    marginBottom: 15,
  },
  footer: {
    fontSize: 12,
    marginTop: 20,
    textAlign: 'justify',
  },
  signatureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  signature: {
    flex: 1,
    textAlign: 'center',
    gap: '20px',
    width: "200px"
  },
});

const RegistrationForm = ({ userData, firstName, lastName }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.logoContainer}>
          <Image src="https://i.imgur.com/7FEkFSu.png" style={styles.logo} />
        </View>

        <Text style={styles.title}>Ficha de Inscripción</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Nombre y Apellido:</Text>
          <Text style={styles.value}>{`${firstName} ${lastName}`}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Edad:</Text>
          <Text style={styles.value}>{userData.age}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>C.I:</Text>
          <Text style={styles.value}>{userData.CI}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Enfermedades o Alergias:</Text>
          <Text style={styles.value}>{userData.allergies || 'Ninguna'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Dirección:</Text>
          <Text style={styles.value}>{userData.Adress}</Text>
        </View>


        <Text style={styles.instructions}>
          A este formulario por favor anexar: Carpeta amarilla, copia de la cédula (alumno, representante), foto carnet (alumno).
        </Text>

        <Text style={styles.value}>
          Nuestra Academia Dancers Angels, maneja las siguientes técnicas: Ballet clásico y neoclásico, Danza Contemporánea, Danza Lírica, Danza Urbana, Preparación física y acrobática, Flexibilidad y Manejo de las emociones. En los horarios de Martes a Sábado, de 8:00 am a 12:00 pm.
        </Text>

        <Text style={styles.value}>
          La cancelación mensual se realiza entre los 15 y 20 de cada mes.
        </Text>

        <View style={styles.signatureContainer}>
          <View style={styles.signature}>
            <Text>Dirección</Text>
            <Text>______________________</Text>
          </View>
          <View style={styles.signature}>
            <Text>Sub-dirección</Text>
            <Text>______________________</Text>
          </View>
          <View style={styles.signature}>
            <Text>Bailarin(a)</Text>
            <Text>______________________</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Los datos adquiridos se trataran informáticamente con el consentimiento del tratado. Los cuales se mantendrán de forma estricta para el uso adecuado y con el fin que compete a la agrupación académica.
        </Text>

        <Text style={styles.footer}>
          Las técnicas o disciplinas de alto impacto que se manejen dentro de la academia, no se permitirá colocar en práctica fuera de nuestras instalaciones sin antes recibir la autorización del Instructor(a). De lo contrario no nos hacemos responsables de incidentes fuera del horario académico.
        </Text>
      </Page>
    </Document>
  );
};

export default RegistrationForm;