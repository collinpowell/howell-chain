import Hero from '../UIKit/sections/staking/main/Fresh'
import Card from '../UIKit/sections/staking/main/ICF'
import Partners from '../UIKit/sections/funding/main/Partners'
import useStakeData from "../Web3Hooks/Staking/useStakeData";
import SEO from '../components/SEO'
import { Container, Heading } from 'theme-ui';
import Header from '../UIKit/layout/Header';
export default function Home() {
  const stakeData = useStakeData();
  return (
    <>
      <SEO title='Howrea | BNB Staking Pool' description='Stake SHRF and earn BNB 5% APR 🤩' />
      <Header />
      <Hero />
      <br></br>
      <br></br>
      <Card saleData={stakeData} />
      <br></br>
      <br></br>
      <Partners />
      <br />
      <br />
      <br />
      <br />
    </>
  )
}
