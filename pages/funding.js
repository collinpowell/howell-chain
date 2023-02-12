import Hero from '../UIKit/sections/funding/main/Fresh'
import Partners from '../UIKit/sections/funding/main/Partners'
import Stats from '../UIKit/sections/funding/main/Stats'
import ICF from '../UIKit/sections/funding/main/ICF'
import useSaleData from "../Web3Hooks/Presale/useSaleData";
import SEO from '../components/SEO'
import { FundAllocation, ValuePreposition } from "../UIKit/assets/Visuals";
import { Container, Heading } from 'theme-ui';
import Header from '../UIKit/layout/Header';

export default function Home() {
  const saleData = useSaleData();

  return (
    <>
      <SEO title='Howrea | Funding' description='Public ICO coming up, $1,000,000'/>
      <Header />
      <Hero />
      <Partners />
      <Stats saleData={saleData} />
      <ICF saleData={saleData} />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Container sx={{
        textAlign: 'center',
        svg:{
          width:['95%',null,null,'100%','fit-content'],
          height:'fit-content'
        }
      }}>
        <Heading>
          <span>Value Preposition</span>
        </Heading>
        <br></br>
        <br></br>
        <br></br>
        <ValuePreposition />
      </Container>
      <br></br>   
      <br></br>
      <br></br>
      <br></br>
      <Container sx={{
        textAlign: 'center',
        svg:{
          width:['95%',null,null,'100%','fit-content'],
          height:'fit-content'
        }
      }}>
        <Heading>
          <span>Fund Allocation</span>
        </Heading>
        <br></br>
        <br></br>
        <br></br>
        <FundAllocation />
      </Container>
      <br />
      <br />
      <br />
      <br />
    </>
  )
}
