import Hero from '../UIKit/sections/funding/main/Fresh'
import Partners from '../UIKit/sections/funding/main/Partners'
import Stats from '../UIKit/sections/funding/main/Stats'
import ICF from '../UIKit/sections/funding/main/ICF'
import useSaleData from "../Web3Hooks/Presale/useSaleData";

export default function Home() {
  const saleData = useSaleData();

  return (
    <>
      <Hero />
      <Partners />
      <Stats saleData={saleData}/>
      <ICF saleData={saleData}/>
      <br/>
      <br/>
      <br/>
      <br/>
    </>
  )
}
