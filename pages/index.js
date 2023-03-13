import Hero from '../UIKit/sections/root/main/Hero'
import Core from '../UIKit/sections/root/main/Core'
import SEO from '../components/SEO'
import Header from '../UIKit/layout/Header';
import axios from 'axios'
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { api } from '../config/api';
import { useRouter } from 'next/router';
import { useChainData } from '../contexts/chain';

export default function Home() {
  const { account } = useWeb3React()
  const router = useRouter()
  const { chain } = useChainData()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  useEffect(() => {
    async function getUserItems() {
      setLoading(true)
      try {
        if (!chain) { return }
        const res = await api.get('/ico/stats?chain=' + chain?.slug)
        setLoading(false)
        if (res.data.statuscode == 200) {
          setError(false)
          const data = res.data.body
          setData(data)
        }
      } catch (error) {
        setLoading(false)
        setError(error.message)
      }
    }
    getUserItems()


  }, [chain])
  function nFormatter(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
  }
  console.log(data)

  const STATS_DATA = [
    {
      label: 'Total Projects',
      number: data?.totalProjects ? nFormatter(data?.totalProjects) : 0
    },
    {
      label: 'Total Participants',
      number: data?.totalParticipants ? nFormatter(data?.totalParticipants) : 0
    },
    {
      label: 'Total Amount Raised',
      number: data?.totalAmountRaised ? nFormatter(data?.totalAmountRaised.toFixed(2)) + ' ' + chain?.symbol : nFormatter('0') + ' ' + chain?.symbol
    }
  ]
  return (
    <>
      <SEO />
      <Header />
      <Hero stats={STATS_DATA} />
      <Core />
    </>
  )
}
