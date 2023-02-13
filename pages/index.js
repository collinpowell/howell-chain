import Hero from '../UIKit/sections/root/main/Hero'
import Fresh from '../UIKit/sections/root/main/Fresh'
import Core from '../UIKit/sections/root/main/Core'
import Glide from '../UIKit/sections/root/main/Glide'
import Learn from '../UIKit/sections/root/main/Learn'
import Blogs from '../UIKit/sections/root/main/Blogs'
import SEO from '../components/SEO'
import Header from '../UIKit/layout/Header';
import axios from 'axios'
import cheerio from 'cheerio'
import { useEffect,useState } from 'react'

export default function Home() {
  const [state,setState] = useState({})

  useEffect(() => {
    async function performScraping() {
      // downloading the target web page
      // by performing an HTTP GET request in Axios
      let transfers

      axios.get("/scrape")
        .then((axiosResponse) => {
          console.log(axiosResponse.request.onloadend())

          
          // parsing the HTML source of the target web page with Cheerio
          const $ = cheerio.load(axiosResponse.data)
          console.log($)

          // initializing the data structures
          // that will contain the scraped data
          let holders = $("#ContentPlaceHolder1_tr_tokenHolders")
            .find(".mr-3").text()
          transfers = $("#ContentPlaceHolder1_trNoOfTxns")
            .find("#totaltxns").text()
          holders = holders.replace('\n', '')
          holders = holders.split(' ')[0]
          // transforming the scraped data into a general object
          const scrapedData = {
            holders,
            transfers,
          }
          setState(scrapedData)
          console.log(scrapedData)/*  */
        }).catch((error) => console.log(error))


      //} while (transfers = '-')

      // storing scrapedDataJSON in a database via an API call...
    }

    performScraping()
  }, [])

  return (
    <>
      <SEO />
      <Header />
      <Hero state={state}/>
      <Fresh />
      <Core />
      <Glide />
      <Learn />
      <Blogs />
    </>
  )
}
