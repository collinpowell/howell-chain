import { Container, Flex, Heading, Image, Button, Grid, Text, Box } from 'theme-ui'
import Seo from '../components/SEO';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { api } from '../config/api';
import { useRouter } from 'next/router';
import Header from '../UIKit/layout/Header'
import dynamic from "next/dynamic";
import { Progress } from "reactstrap";
const CountDown = dynamic(import("react-countdown"), { ssr: false });

const Privacy = () => {
    const { account } = useWeb3React()
    const router = useRouter()
    const [data, setData] = useState()
    console.log(data)
    useEffect(() => {
        async function getUserItems() {
            const res = await api.get('/ico')
            if (res.data.statuscode == 200) {
                const data = res.data.body.data
                console.log(data)
                setData(data)
            }
        }
        try {
            getUserItems()

        } catch (error) {
            console.log(error.message)
        }
    }, [account])

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
                                textAlign: 'center',
                                mt: '50px',
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
                                        {Number(ico.fundsRaised ? ico.fundsRaised : 0) + " BNB"}
                                    </Text>
                                    <Text as="p">{Number(ico.softCap ? ico.softCap : 0)}</Text>
                                </Flex>
                                <br />
                                <Box sx={{
                                    p: {
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        pb: '5px'
                                    }
                                }}>
                                    <Text as="p">
                                        {time.now < time.starting ? "Starting In" : time.now > time.ending ? "This pool has ended" : "Ending In"}
                                    </Text>
                                    <CountDown
                                        date={time.now < time.starting ? time.starting : time.ending}
                                        renderer={renderer}
                                    />
                                </Box>


                            </Box>
                        )
                    })}
                    {data.map((ico, i) => {
                        const time = {
                            starting: new Date(Number(ico.startTime ? ico.startTime : 0)),
                            now: new Date(),
                            ending: new Date(Number(ico.endTime ? ico.endTime : 0)),
                        };
                        var percent = ((Number(ico.fundsRaised ? ico.fundsRaised : 0) / Number(ico.softCap ? ico.softCap : 0)) * 100).toFixed(5);

                        return (
                            <Box key={i} variant='boxes.glide' onClick={() => {
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
                                    <Button className="safu">SAFU</Button>
                                    <Button className="audit">AUDIT</Button>
                                    <Button className="kyc">KYC</Button>
                                </Flex>
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
                                        {Number(ico.fundsRaised ? ico.fundsRaised : 0) + " BNB"}
                                    </Text>
                                    <Text as="p">{Number(ico.softCap ? ico.softCap : 0)}</Text>
                                </Flex>
                                <br />
                                <Box sx={{
                                    p: {
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        pb: '5px'
                                    }
                                }}>
                                    <Text as="p">
                                        {time.now < time.starting ? "Starting In" : time.now > time.ending ? "This pool has ended" : "Ending In"}
                                    </Text>
                                    <CountDown
                                        date={time.now < time.starting ? time.starting : time.ending}
                                        renderer={renderer}
                                    />
                                </Box>


                            </Box>
                        )
                    })}
                    {data.map((ico, i) => {
                        const time = {
                            starting: new Date(Number(ico.startTime ? ico.startTime : 0)),
                            now: new Date(),
                            ending: new Date(Number(ico.endTime ? ico.endTime : 0)),
                        };
                        var percent = ((Number(ico.fundsRaised ? ico.fundsRaised : 0) / Number(ico.softCap ? ico.softCap : 0)) * 100).toFixed(5);

                        return (
                            <Box key={i} variant='boxes.glide' onClick={() => {
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
                                    <Button className="safu">SAFU</Button>
                                    <Button className="audit">AUDIT</Button>
                                    <Button className="kyc">KYC</Button>
                                </Flex>
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
                                        {Number(ico.fundsRaised ? ico.fundsRaised : 0) + " BNB"}
                                    </Text>
                                    <Text as="p">{Number(ico.softCap ? ico.softCap : 0)}</Text>
                                </Flex>
                                <br />
                                <Box sx={{
                                    p: {
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        pb: '5px'
                                    }
                                }}>
                                    <Text as="p">
                                        {time.now < time.starting ? "Starting In" : time.now > time.ending ? "This pool has ended" : "Ending In"}
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
        mt: [0, null, 0, null, 0],
        gridGap: ['35px 0px', null, 0, null, null, '30px 5px'],
        gridTemplateColumns: [
            'repeat(1,1fr)',
            null,
            'repeat(2,1fr)',
            null,
            'repeat(3,1fr)',
        ],
        'svg': {
            width: '100px',
            height: '100px'
        }
    },
}