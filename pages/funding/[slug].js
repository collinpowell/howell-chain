import ICF from '../../UIKit/sections/funding/main/ICF'
import useSaleData from "../../Web3Hooks/Presale/useSaleData";
import SEO from '../../components/SEO'
import Header from '../../UIKit/layout/Header';
import { useRouter } from 'next/router'
import { api } from '../../config/api';
import { useChainData } from '../../contexts/chain';

export default function Home({ apiData }) {
  const router = useRouter();
  const { slug } = router.query;
  const saleData = useSaleData(slug);
  const { chain } = useChainData()

  return (
    <>
      <SEO title='Howrea | Funding' description='Public ICO coming up, $1,000,000' />
      <Header />
      <br />
      <br />
      <br />
      <ICF saleData={saleData} icoAddress={slug} chain={chain} apiData={apiData} />
      <br />
      <br />
      <br />
      <br />
    </>
  )
}

export async function getServerSideProps({ params }) {

  const res = await api.get(`/ico/${params.slug}`)

  const apiData = res.data.body

  return {
    props: {
      apiData
    },
  }
}
