import Hero from '../UIKit/sections/root/main/Hero'
import Fresh from '../UIKit/sections/root/main/Fresh'
import Core from '../UIKit/sections/root/main/Core'
import Glide from '../UIKit/sections/root/main/Glide'
import Learn from '../UIKit/sections/root/main/Learn'
import Blogs from '../UIKit/sections/root/main/Blogs'
import SEO from '../components/SEO'
import Header from '../UIKit/layout/Header';

export default function Home() {
  return (
    <>
      <SEO />
      <Header />
      <Hero />
      <Fresh />
      <Core />
      <Glide />
      <Learn />
      <Blogs />
    </>
  )
}
