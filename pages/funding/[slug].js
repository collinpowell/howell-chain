import Stats from '../../UIKit/sections/funding/main/Stats'
import ICF from '../../UIKit/sections/funding/main/ICF'
import useSaleData from "../../Web3Hooks/Presale/useSaleData";
import SEO from '../../components/SEO'
import Header from '../../UIKit/layout/Header';
import {useRouter} from 'next/router'

export default function Home() {
  const router = useRouter();
  const { slug } = router.query;
  const saleData = useSaleData(slug);
  const [selectedChain, setSelectedChain] = useState(chains[0]);
  useEffect(() => {
      localStorage.setItem(router.query.chain)
      if (!localStorage) {
          setSelectedChain(chains[0])
      }
      for (let i = 0; i < chains.length; i++) {

          if (localStorage && localStorage.getItem('chain') == chains[i].slug) {
              setSelectedChain(chains[i])
              console.log(chains[i])
          }
      }
  }, [router.query])
  return (
    <>
      <SEO title='Howrea | Funding' description='Public ICO coming up, $1,000,000' />
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Stats saleData={saleData} chain={selectedChain} />
      <ICF saleData={saleData} icoAddress={slug} chain={selectedChain}/>
      <br />
      <br />
      <br />
      <br />
    </>
  )
}
