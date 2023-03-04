import Hero from '../UIKit/sections/root/main/Hero'
import Core from '../UIKit/sections/root/main/Core'
import SEO from '../components/SEO'
import Header from '../UIKit/layout/Header';
import axios from 'axios'

export default function Home() {

  return (
    <>
      <SEO />
      <Header />
      <Hero/>
      <Core />
    </>
  )
}
