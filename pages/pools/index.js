import { Container, Spinner, Flex, Heading, Image, Button, Grid, Text, Box } from 'theme-ui'
import Seo from '../../components/SEO';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { api } from '../../config/api';
import { useRouter } from 'next/router';
import Header from '../../UIKit/layout/Header'
import dynamic from "next/dynamic";
import { Progress } from "reactstrap";
import { useChainData } from '../../contexts/chain';
const CountDown = dynamic(import("react-countdown"), { ssr: false });

const Privacy = () => {
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
                const res = await api.get('/ico?chain=' + chain?.slug)
                setLoading(false)
                if (res.data.statuscode == 200) {
                    setError(false)
                    const data = res.data.body.data
                    setData(data)
                }
            } catch (error) {
                setLoading(false)
                setError(error.message)
            }
        }
        getUserItems()


    }, [chain])

    return data ? (
        <>
            <Seo title='Profile | Launchpad Profile' description={account} />
            <Header />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Container>
                <Heading sx={{
                    textAlign: 'center',
                    mb: '35px'
                }}>
                    <span>Launch Pools</span>
                </Heading>
                {data.length <= 0 && <Text variant='title' as={'p'} sx={{
                    textAlign: 'center',
                    mx: 'auto',
                    minHeight: '100vh',
                }}>No pools on this chain, try checking another chain</Text>}
                <Grid sx={styles.grid}>
                    {data.map((ico, i) => {
                        const time = {
                            starting: new Date(Number(ico.startTime ? ico.startTime : 0)),
                            now: new Date(),
                            ending: new Date(Number(ico.endTime ? ico.endTime : 0)),
                        };
                        var percent = ((Number(ico.fundsRaised ? ico.fundsRaised : 0) / Number(ico.softCap ? ico.softCap : 0)) * 100).toFixed(5);
                        return (
                            <Box key={i} variant='boxes.glide' sx={{
                                position: 'relative',
                                border: ico.affiliatePercent > 0 ? '3.5px solid' : 'none',
                                borderColor: 'text',
                                '&:before': {
                                    content: ico.affiliatePercent > 0 ? `'${'Affiliate ' + ico.affiliatePercent + '%'}'` : null,
                                    position: 'absolute',
                                    width: 'fit-content',
                                    background: 'text',
                                    textAlign: 'center',
                                    mx: 'auto',
                                    right: 0,
                                    left: 0,
                                    color: 'background',
                                    p: '5px 10px',
                                    borderRadius: '15px',
                                    mt: '-15px',
                                    top: '0',
                                    alignItems: 'center',
                                }
                            }} onClick={() => {
                                router.push({
                                    pathname: '/funding/' + ico.preSale,
                                    query: { chain: ico.chain },
                                });
                            }}>
                                <Flex>
                                    <Image src={ico.logoUrl} alt='logo' width={90} height={90} />
                                    <Box sx={{
                                        ml: '15px'
                                    }}>
                                        <Text variant='title' as={'p'}>{ico.tokenName}</Text>
                                        <Text as={'p'}>{ico.tokenSymbol}</Text>
                                        <Text as={'p'} sx={{
                                            fontSize: '14px',
                                            opacity: '0.7',
                                            mt: '4px'
                                        }}>{'Fair Launch'}</Text>

                                    </Box>
                                </Flex>
                                <br />
                                <Flex sx={{
                                    button: {
                                        p: '5px 10px',
                                        height: 'fit-content',
                                        ml: '5px'
                                    },
                                    '.safu': {
                                        background: 'rgb(223, 95, 248)'
                                    },
                                    '.audit': {
                                        background: 'rgb(0, 188, 212)'
                                    },
                                    '.kyc': {
                                        background: '#48c774'
                                    },
                                }}>
                                    {ico?.badges?.map((info, i) => {
                                        return (
                                            <a
                                                key={i}
                                                href={info.link}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <Button className={info.type} sx={{
                                                    textTransform: 'uppercase'
                                                }}>{info.type}</Button>
                                            </a>
                                        )
                                    })}
                                </Flex>
                                <br />
                                <Box>
                                    <Text as='p'>Soft Cap</Text>
                                    <Text as='p' variant='title' sx={{ fontWeight: 'bold' }}>{ico.softCap + " " + ico.currency}</Text>
                                </Box>
                                <br />

                                <Progress
                                    value={percent}
                                    style={{
                                        height: ["1rem", null, null, "1.6rem"],
                                        border: "1px solid",
                                        borderRadius: "4rem",
                                    }}
                                />
                                <br />
                                <Flex sx={{ justifyContent: "space-between", fontWeight: "bold" }}>
                                    <Text as="p">
                                        {Number(ico.fundsRaised ? ico.fundsRaised : 0) + " " + ico.currency}
                                    </Text>
                                    <Text as="p">{Number(ico.softCap ? ico.softCap : 0) + " " + ico.currency}</Text>
                                </Flex>
                                <br />
                                <hr />
                                <Box sx={{
                                    p: {
                                        fontSize: '18px',
                                        pb: '5px'
                                    }
                                }}>
                                    <Text as="p">
                                        {time.now < time.starting ? "Sale Starts In" : time.now > time.ending ? "Ended" : "Ending In"}
                                    </Text>
                                    <CountDown
                                        date={time.now < time.starting ? time.starting : time.ending}
                                        renderer={renderer}
                                    />
                                </Box>


                            </Box>
                        )
                    })}
                </Grid>


            </Container>

        </>
    ) : (
        <>
            <Header />
            <Container sx={{
                height: '100vh',
                weight: '100vh',
                position: 'relative',
                textAlign: 'center'
            }}>
                <Box sx={{
                    position: 'absolute',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    top: '0',
                    m: 'auto',
                    width: 'fit-content',
                    height: 'fit-content',
                }} >
                    {loading && <Spinner />}
                    {error && <Text variant='danger' as={'h4'}>{error}</Text>}
                </Box>
            </Container>

        </>
    )
}

export default Privacy

const Completionist = () => {
    return (
        <Flex >
            <Box>
                <Text as="p">{"00"}</Text>
            </Box>
            <Text as="p">:</Text>
            <Box>
                <Text as="p">{"00"}</Text>
            </Box>
            <Text as="p">:</Text>

            <Box>
                <Text as="p">{"00"}</Text>
            </Box>
            <Text as="p">:</Text>

            <Box>
                <Text as="p">{"00"}</Text>
            </Box>
        </Flex>
    );
};
const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        return <Completionist />;
    } else {
        return (
            <Flex >
                <Box>
                    <Text as="p">{days}</Text>
                </Box>
                <Text as="p">:</Text>
                <Box>
                    <Text as="p">{hours}</Text>
                </Box>
                <Text as="p">:</Text>

                <Box>
                    <Text as="p">{minutes}</Text>
                </Box>
                <Text as="p">:</Text>

                <Box>
                    <Text as="p">{seconds}</Text>
                </Box>
            </Flex>
        );
    }
};

const styles = {
    grid: {
        gridGap: ['25px 10px', null, null, null, '30px 15px'],
        gridTemplateColumns: [
            'repeat(1,1fr)',
            null,
            'repeat(2,1fr)',
            null,
            'repeat(3,1fr)',
        ]
    }
}