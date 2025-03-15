import React from 'react'
import {Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import { dataDocumentDR } from '@/app/types'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
    fontFamily: 'Helvetica'
  },
  logoContainer : {
    alignItems: 'flex-end',
    marginBottom: 10
  },
  logo: {
    width: 100,
    height: 100
  },
  title:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign : 'center',
    marginBottom: 20,
    backgroundColor: 'green',
    color: 'white',
    width: 400
  },
  section:{
    marginBottom: 10
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  value: {
    fontSize: 12,
    marginBottom: 5
  },
  instructions: {
    fontSize: 10,
    marginBottom: 15,
    marginTop: 15
  },
  footer:{
    fontSize: 12,
    marginTop: 20,
    textAlign: 'justify'
  },
  signatureContainer:{
    flexDirection : 'row',
    justifyContent: 'space-around',
    marginTop: 30
  },
  signature:{
    flex: 1,
    textAlign: 'center',
    gap: 20,
    width: 200
  }
})

const  RegistrationFormDR = ({dancerData, repData} : dataDocumentDR) => {
  return(
    <Document>
    <Page style={styles.page}>
      <View style={styles.logoContainer}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image src="https://i.imgur.com/7FEkFSu.png" style={styles.logo}  />
      </View>

      <Text style={styles.title}>
        Ficha de inscripción
      </Text>
      
      <View style={styles.section}>
        <Text style={styles.label}>
          Nombre y Apellido:
        </Text>
        <Text style={styles.value}>
        {`${dancerData.firstName} ${dancerData.lastName}`}
        </Text> 
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>
          Edad:
        </Text>
        <Text style={styles.value}>
          {dancerData.age}
        </Text> 
      </View>  
      <View style={styles.section}>
        <Text style={styles.label}>
          CI:  
        </Text>
        <Text style={styles.value}>
          {dancerData.cI}
        </Text>  
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>
          Enfermedades o Alergias :
        </Text>
        <Text style={styles.value}>
          {dancerData.allergies}
        </Text>  
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>
          Dirección :
        </Text>
        <Text style={styles.value}>
          {repData.Adress}
        </Text> 
      </View>
      <View style={styles.section}>
        <Text style={styles.value}>
        En caso de emergencia dirigirse a {`${repData.firstName} ${repData.lastName}`}. 
        TLF {repData.phone}.
        CI {repData.CI}
        </Text> 
      </View> 
      <View style={styles.section}>
      <Text style={styles.instructions}>
        A este formulario por favor anexar : Carpeta amarilla, copia de la cédula de identidad (alumno y representante), foto tipo carnet (alumno).
      </Text>
      </View>   
      <Text style={styles.value}>
        Nuestra academia Dancers Angels, maneja las siguientes técnicas: Ballet clásico y neoclásico, Danza contemporanea, Danza Lírica, Danza Urbana, preparación física y acrobática, flexibilidad y manejo de las emociones. En los horarios de Martes a Sábado de 8am a 12pm    
      </Text>  
      <Text style={styles.value}>
        La cancelación mensual se realiza entre los 15 y 20 de cada mes.
      </Text>  
      <View style={styles.signatureContainer}>
        <View style={styles.signature}>
           <Text>Dirección</Text>
           <Text>__________</Text>
        </View> 
        <View style={styles.signature}>
          <Text>Representante</Text>
          <Text>_____________</Text>
        </View>
      </View>
      <Text style={styles.footer}>
        Los datos adquiridos se trataran infórmaticamente con el consentimiento del tratado. Los cuales se mantendrán de forma estricta para el uso adecuado y
        con el fin que compete a la agrupación académica.
      </Text>
      <Text style={styles.footer}>
        Las técnicas o disciplinas de alto impacto que se manejen dentro de la academia, no se permitirá colocar en práctica fuera de nuestras instalaciones 
        sin antes recibir la autorización del Instructor(a). De lo contrario no nos hacemos responsables de incidentes fuera del horario académico. 
      </Text>    
    </Page>
    </Document>
  )
}

export default RegistrationFormDR;

