
import { 
  PDFDownloadLink, 
  Page, 
  Text, 
  View, 
  Document, 
  StyleSheet,
  Image
} from '@react-pdf/renderer'

import {ButtonPdf, DownloadPdf } from './styles'

export interface NewBudgetsProps  {
    title?: string;
    name?: string;
    address?: string;
    tel?: string;
    email?: string;
    report?: string;
    description?: string;
    contract?: string;
    totalValueItems?: string;
    discount?: string;
    totalWithDiscount?: string;
    items: [{
        name?: string;
        price?: number;
        quantity?: number;
        total?: number;
    }]
}

type BudgetsProps = {
  filePdf: NewBudgetsProps
}

import { defaultTheme } from '../../../styles/themes';
import { FaRegFilePdf } from 'react-icons/fa'
import { dateFormatter, moneyFormatter } from '../../../utils/Formatted';

export function Pdf( { filePdf } : BudgetsProps ) {
  
  const marcenaria = {
    img: 'https://lh3.googleusercontent.com/p/AF1QipPPqrAdcUlx1mCQgqJTABNNEUNRP2SFgUFRy-dy=s680-w680-h510',
    name: 'Lar Bonito Móveis Marcenaria',
    address: 'Ipueiras Ce',
    tel: '(88) 99372-3747',
    email: 'larbonitomoveis@outlook.com',
    cpfOrcnpj: '046.410.323-19'
  }

  
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page} >

      <View style={styles.header} >
        <Text style={styles.headerh1}>{filePdf.title}</Text>
        <Text style={styles.headerSpan}>
          Criado em {dateFormatter.format(Date.now())}
        </Text>
        <Image style={styles.headerImg} src={marcenaria.img}  />
      </View>

      <View style={styles.infoBudget} >
          <View style={styles.infoBudgetDiv}>
            <Text style={styles.infoBudgetSpan}>DE</Text>
            <Text style={styles.infoBudgetP}>{marcenaria.name}</Text>
            <Text style={styles.infoBudgetP}>{marcenaria.address}</Text>
            <Text style={styles.infoBudgetP}>{marcenaria.tel}</Text>
            <Text style={styles.infoBudgetP}>{marcenaria.email}</Text>
            <Text style={styles.infoBudgetP}>{marcenaria.cpfOrcnpj}</Text>
          </View>
          <View style={styles.infoBudgetDiv}>
            <Text style={styles.infoBudgetSpan}>para</Text>
            <Text style={styles.infoBudgetP}>{filePdf.name}</Text>
            <Text style={styles.infoBudgetP}>{filePdf.address}</Text>
            <Text style={styles.infoBudgetP}>{filePdf.tel}</Text>
            <Text style={styles.infoBudgetP}>{filePdf.email}</Text>
          </View>
      </View>

      {/* RELATORIO */}
      <View style={styles.report}>
        <Text style={styles.reportH1}>Relatório Inicial</Text>
        <Text style={styles.reportP}>{filePdf.report}</Text>
      </View>

      {/* DESCRIÇÃO */}
      <View style={styles.description}>
        <Text style={styles.descriptionH1}>Descrição das Atividades</Text>
        <Text style={styles.descriptionP}>
          {filePdf.description}
        </Text>
      </View>

      <View>
        <Text style={styles.pricesH1}>Preços</Text>
        
        <View >
          {filePdf.items.map((item, index) => (
            <View style={styles.contentItems} key={index}>
              
                <View style={styles.infoItemsDiv}>
                  <Text style={styles.infoItemSpan}>Item</Text>
                  <Text style={styles.infoItemsP}>{item.name}</Text>
                </View>

                <View style={styles.infoItemsDiv}>
                  <Text style={styles.infoItemSpan}>Tipo</Text>
                  <Text style={styles.infoItemsP} >Unidade</Text>
                </View>

                <View style={styles.infoItemsDiv}>
                  <Text style={styles.infoItemSpan}>Qtde..</Text>
                  <Text style={styles.infoItemsP}> {item.quantity}</Text>
                </View>

                <View style={styles.infoItemsDiv} >
                  <Text style={styles.infoItemSpan}>Unit.</Text>
                  {item.price ? <Text style={styles.infoItemsP} >{moneyFormatter(item.price.toString())}</Text> : null}
                </View>

                <View style={[styles.infoItemsDiv, styles.infoItemsDiv5]}>
                  <Text style={styles.infoItemSpan}>Subtotal</Text>
                  {item.total ? <Text style={styles.infoItemsP} >{moneyFormatter(item.total.toString())}</Text> : null}
                </View>

              </View>
          ))}
        </View>
        <View style={styles.infoTotalItems}>
          <View>
            <Text>Subtotal: {filePdf.totalValueItems}</Text>
          </View>
          {filePdf.discount === 'R$ ,' ? (
            <View>
              <Text></Text>
            </View>
          ) : (
            <View>
              <Text>Desconto: {filePdf.discount}</Text>
            </View>
          )}
          <View>
            <Text style={{fontWeight: 'bold'}}>Total: {filePdf.totalWithDiscount}</Text>
          </View>
        </View>
      </View>
          
      <View style={styles.contract}>
        <Text style={styles.contractH1}>Condições de Contrato</Text>
        <Text style={styles.contractP}>
          {filePdf.contract}
        </Text>
      </View>
      
      <View style={styles.assinatura}/>

      </Page>
    </Document>
  )


  return (
    <PDFDownloadLink document={<MyDocument />} fileName={filePdf.title}>
    {({ loading }) =>
      loading ? (
        'Carregando PDF...'
      ) : (
        <ButtonPdf>
            <DownloadPdf>
                <span>baixar pdf</span>
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
    justifyContent: 'flex-start',
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
    minHeight: '120px',
    position: 'relative',
  },
  headerh1: {
    fontSize: '20px',
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
  },
  infoBudget: {
    marginTop: '100px',
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
  assinatura: {
    width: '80%',
    height: '0.5px',
    backgroundColor: '#000000',
    marginLeft: '10%',
    marginBottom: '20px'
  },
})