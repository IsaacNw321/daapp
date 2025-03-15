import React from 'react'
import {Document, Page, Text, View, Image, StyleSheet} from '@react-pdf/renderer'
import { DocumentConfirmedP } from '@/app/types'
const styles = StyleSheet.create({
  page:{
    flexDirection: 'column',
    padding: 20,
    fontFamily: 'Helvetica'
  },
  logoContainer : {
    alignItems: 'center',
    marginBottom: 10
  },
  logo : {
    width : 100,
    height : 100
  },
  title:{
    display: 'flex',
    alignItems : 'center',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: 'green',
    color: 'white',
  },
  section : {
    marginBottom: 10
  },
  value: {
    fontSize: 12,
    marginBottom: 5
  }
})

const ConfirmedPayment = ({data} : DocumentConfirmedP) =>{
  
  return(
    <Document>
      <Page style={styles.page}>
        <View style={styles.logoContainer}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image src="https://i.imgur.com/7FEkFSu.png" style={styles.logo} />
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>
            Comprobante de pago
          </Text> 
        </View>  
        
        <View style={styles.section}>
          <Text style={styles.value}>
            Pago realizado del mes de {data.mes + ' '} 
            Correspondiente a {`${data.firstName} ${data.lastName}`}
          </Text>
        </View>  
      </Page>  
    </Document>  
  )
}

export default ConfirmedPayment;