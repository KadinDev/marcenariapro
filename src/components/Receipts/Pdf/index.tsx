import { useContext } from 'react'

import { 
  PDFDownloadLink, 
  Page, 
  Text, 
  View, 
  Document, 
  StyleSheet,
  //Image
} from '@react-pdf/renderer'

import {ButtonPdf, DownloadPdf } from './styles'

type ReceiptsProps = {
  title?: string;
  valorPago?: number;
  valorTotal?: number;
  methodPay?: string;
  date?: string;
  name?: string;
  address?: string;
  tel?: string;
  email?: string;
}

import { defaultTheme } from '../../../styles/themes';
import { FaRegFilePdf } from 'react-icons/fa'
import { moneyFormatter, dateFormatter } from '../../../utils/Formatted';
import { AuthContext } from '../../../contexts/auth'

export function Pdf( {
  title,
  valorPago,
  valorTotal,
  methodPay,
  date,
  name,
  address,
  tel,
  email
} : ReceiptsProps ) {
  
  const {user} = useContext(AuthContext)


  const dataAtual = date ? new Date(date) : new Date()
  // Subtrair 1 dia (86400000 milissegundos representam 1 dia)
  const umDiaEmMilissegundos = 86400000;
  const dataAnterior = new Date(dataAtual.getTime() + umDiaEmMilissegundos);

  // Formatando a nova data para exibição
  const dataFormatada = dateFormatter.format(dataAnterior);

  const MyDocument = () => (
    
    <Document>
      <Page size="A4" style={styles.page} >

      <View style={styles.header} >
        <Text style={styles.headerh1}>{title}</Text>
        {/* 
        <Image style={styles.headerImg} src={user?.avatarUrl}  />
        */}
      </View>

      <View style={styles.infoBudget} >
          <View style={styles.infoBudgetDiv}>
            <Text style={styles.infoBudgetSpan}>DE</Text>
            <Text style={styles.infoBudgetP}>{user?.name}</Text>
            <Text style={styles.infoBudgetP}>{user?.address}</Text>
            <Text style={styles.infoBudgetP}>{user?.contact}</Text>
            <Text style={styles.infoBudgetP}>{user?.cnpjOrcpf}</Text>
          </View>
          <View style={styles.infoBudgetDiv}>
            <Text style={styles.infoBudgetSpan}>para</Text>
            <Text style={styles.infoBudgetP}>{name}</Text>
            <Text style={styles.infoBudgetP}>{address}</Text>
            <Text style={styles.infoBudgetP}>{tel}</Text>
            <Text style={styles.infoBudgetP}>{email}</Text>
          </View>
      </View>

      
      <View style={styles.line}/>

      <View style={styles.viewInfo} >
        <Text style={styles.contentInfo}>
          Recebi(emos) de {name}, a importância de {moneyFormatter(valorPago?.toString() || '0')} de um total de {moneyFormatter(valorTotal?.toString() || '0')} na data do dia {dataFormatada}. Para maior clareza firmo(amos) o presente recibo para que produza os seus efeitos.
        </Text>

        <Text style={styles.methodPay}> Pagamento realizado via {methodPay}. </Text>
      </View>


      <View style={styles.assinatura}/>
      <Text style={styles.date}> {dataFormatada}. </Text>

      </Page>
    </Document>
  )


  return (
    <PDFDownloadLink document={<MyDocument />} fileName='recibo.pdf'>
    {({ loading }) =>
      loading ? (
        'Carregando PDF...'
      ) : (
        <ButtonPdf>
            <DownloadPdf>
                <span>baixar recibo</span>
                <FaRegFilePdf size={20} color={defaultTheme.sidebar} />
            </DownloadPdf>
        </ButtonPdf>
      )
    }
    </PDFDownloadLink>
  )
}


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    minHeight: '100px',
    position: 'relative',
  },
  headerh1: {
    fontSize: '18px',
    textAlign: 'justify',
  },
  headerSpan: {
    color: '#999999',
    fontWeight: 'bold',
    marginTop: '10px',
    fontSize: '10px',
  },
  headerImg: {
    height: '100px',
    width: '170px',
    borderWidth: '4px',
    borderColor: '#FFFFFF',
    marginTop: '10px',
    position: 'absolute',
    bottom: -50,
    borderRadius: '5px',
    objectFit: 'cover'
  },
  infoBudget: {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoBudgetDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '50%',
  },
  infoBudgetSpan: {
    color: '#999999',
    textTransform: 'uppercase',
    fontSize: '10px'
  },
  infoBudgetStrong: {
    marginBottom: '10px',
  },
  infoBudgetP: {
    color: '#000000',
    fontSize: '12px',
  },
  report: {
    marginTop: '40px',
  },
  reportH1: {
    fontSize: '20px'
  },
  reportP: {
    color: '#000000',
    textAlign: 'justify',
    marginTop: '10px',
    fontSize: '12px',
  },
  description: {
    marginTop: '40px',
    marginBottom: '20px',
  },
  descriptionH1: {
    fontSize: '20px'
  },
  descriptionP: {
    color: '#000000',
    textAlign: 'justify',
    marginTop: '10px',
    fontSize: '12px',
  },
  prices: {
    marginTop: '40px',
  },
  pricesH1: {
    fontSize: '20px',
    marginBottom: '10px'
  },
  pricesP: {
    color: '#000000',
    fontSize: '12px',
  },
  contentItems: {
    marginBottom: '10px',
    width: '100%',
    borderBottomWidth: '1px',
    borderColor: '#999999',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  infoItemsDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1
  },
  infoItemSpan: {
    fontWeight: 'bold',
    color: '#B22222',
    fontSize: '10px'
  },
  infoItemsP: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: '12px',
  },
  infoItemsDiv5: {
    borderRightWidth: '0px',
  },
  infoTotalItems: {
    borderBottomWidth: '1px',
    borderBottomColor: '#999999',
    height: '40px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    fontSize: '12px'
  },
  contract: {
    marginTop: '40px',
    marginBottom: '60px',
  },
  contractH1: {
    fontSize: '20px',
  },
  contractP: {
    marginTop: '10px',
    color: '#000000',
    fontSize: '12px'
  },
  line: {
    width: '100%',
    height: '0.5px',
    backgroundColor: '#9999999e',
    marginTop: '20px',
    marginBottom: '20px',
  },
  viewInfo: {
    width: '90%',
    marginLeft: '5%',
  },
  contentInfo: {
    color: '#000000',
    fontSize: '12px',
    textAlign: 'justify',
  },
  methodPay: {
    color: '#000000',
    fontSize: '12px',
    marginTop: '20px',
    marginBottom: '40px',
  },
  assinatura: {
    width: '80%',
    height: '0.5px',
    backgroundColor: '#000000',
    marginLeft: '10%',
    marginBottom: '20px'
  },
  date: {
    textAlign: 'center',
    color: '#9999999e',
    fontSize: '12px'
  }
})