/* eslint-disable react/no-unknown-property */
/** @jsxImportSource theme-ui */
import { Text, Heading, Flex, Image, Button, Spinner, Box } from "theme-ui";
import { useFormData } from "../../contexts/form";
import React from "react";
import { useWeb3React } from "@web3-react/core";
import Party from '../../UIKit/components/Party'
import useContract from '../../Web3Hooks/useContract'
import ABI from '../../artifacts/contracts/StandardICO.sol/Presale.json'
import tokenABI from "../../artifacts/contracts/SheerCoin.sol/Sheer.json";
import { ContractFactory, ethers } from 'ethers';
import { useState } from "react";
import { useRouter } from 'next/router'
import { api } from '../../config/api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const FormCompleted = ({ selectedChain, formStep, prevFormStep }) => {
    const { data } = useFormData();
    data.tokenDecimal = data.tokenInfo.decimals
    data.tokenName = data.tokenInfo.name
    data.tokenSymbol = data.tokenInfo.symbol
    data.hardCap = data.preSaleTokens / data.anticipatedRate

    console.log(data)
    const tokenContract = useContract(data.address, tokenABI.abi, true)
    const router = useRouter()
    const { library, account, chainId } = useWeb3React();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [currentStep, setCurrentStep] = useState(-1)

    const keys = Object.keys(data);
    const totalSteps = [1, 2, 3];
    keys.sort()
    const onSubmit = async () => {
        if (!account) {
            handleFailure("Connect Wallet")
            return;
        }
        if (selectedChain?.chainId != chainId) {
            handleFailure("Connect to " + selectedChain?.chainName)
            return;
        }
        setIsSubmitting(true)
        setCurrentStep(0)
        const factory = new ContractFactory(ABI.abi, ABI.bytecode, library.getSigner(account));



        try {
            // If your contract requires constructor args, you can specify them here
            const contract = await factory.deploy(
                data.address,
                data.tokenInfo.decimals,
                Number(selectedChain?.poolFee),
                Number(data.affiliate ? data.affiliate : 0),
                ethers.utils.parseUnits(data.softCap, "ether"),
                Number(data.anticipatedRate),
                data.startDate.getTime(),
                data.endDate.getTime(),
                Number(data.preSaleTokens),
                {
                    value: ethers.utils.parseUnits(selectedChain?.poolCreationFee, "ether")
                }
            )
            const deploymentReceipt = await contract.deployTransaction.wait(1)
            setCurrentStep(1)
            data.txHash = deploymentReceipt.transactionHash
            data.icoAddress = contract.address
            data.deployer = deploymentReceipt.from
            const tokenResult = await tokenContract.transfer(
                contract.address,
                ethers.utils.parseUnits(data.preSaleTokens, data.tokenInfo.decimals))
            await tokenResult.wait(1)
            setCurrentStep(2)
            const socials = []

            if (data.website) {
                socials.push({
                    link: data.website,
                    platform: 'website'
                })
            }
            if (data.telegram) {
                socials.push({
                    link: data.telegram,
                    platform: 'telegram'
                })
            }
            if (data.twitter) {
                socials.push({
                    link: data.twitter,
                    platform: 'twitter'
                })
            }
            if (data.instagram) {
                socials.push({
                    link: data.instagram,
                    platform: 'instagram'
                })
            }
            if (data.discord) {
                socials.push({
                    link: data.discord,
                    platform: 'discord'
                })
            }
            if (data.medium) {
                socials.push({
                    link: data.medium,
                    platform: 'medium'
                })
            }
            if (data.github) {
                socials.push({
                    link: data.github,
                    platform: 'github'
                })
            }
            if (data.reddit) {
                socials.push({
                    link: data.reddit,
                    platform: 'reddit'
                })
            }
            if (data.linkedin) {
                socials.push({
                    link: data.linkedin,
                    platform: 'linkedin'
                })
            }

            const res = await api.post('/ico', {
                chain: selectedChain?.slug,
                currency: selectedChain?.symbol,
                creator: account,
                tokenName: data.tokenName,
                tokenSymbol: data.tokenSymbol,
                startTime: data.startDate.getTime(),
                endTime: data.endDate.getTime(),
                affiliatePercent: Number(data.affiliate ? data.affiliate : 0),
                softCap: data.softCap,
                youtubeVideo: data.youtube,
                preSale: contract.address,
                logoUrl: data.logo,
                description: data.projectDescription,
                socials: socials
            })
            if (res.data.statuscode == 200) {
                console.log(`Fair launch deployed to ${contract.address}`)
                handleSuccess('Fair launch Creation Successful')
                setIsSubmitting(false)
                setIsSubmitted(true)
            }
        } catch (error) {
            setIsSubmitting(false)
            if (error.data) {
                handleFailure(error.data.message);
            } else {
                if (error.reason) {
                    handleFailure(error.reason);
                } else {
                    handleFailure(error.message);
                }
            }
            setCurrentStep(-1)
        }
        setIsSubmitting(false)
    };
    return (
        <Box sx={{
            textAlign: 'center',
            hr: {
                opacity: '0.2',
                my: '15px'
            }
        }}>
            {isSubmitted && <Party />}
            <Heading>Yay 🎉,You are all set</Heading>
            <br />
            <Text as={'p'} variant="title">Confirm info and Kindly read note below before submission</Text>
            <br />
            <br />
            {
                keys.map((key, index) => {
                    if (!data[key]) {
                        return null
                    }
                    switch (key) {
                        case 'tokenInfo':
                            return null
                        case 'preSaleTokens':
                            return (
                                <>
                                    <Flex key={index} sx={{
                                        justifyContent: ['center', null, null, 'space-between'],
                                        flexDirection: ['column', null, null, 'row'],
                                    }}>
                                        <Text as={'p'} sx={{
                                            fontWeight: 'bold',
                                            mb: ['8px', null, null, '0']
                                        }}>{key + ': '}</Text>
                                        <Text as={'p'} sx={{
                                            wordBreak: 'break-all'
                                        }}>{numberWithCommas(data[key]) + ' ' + data.tokenSymbol}</Text>
                                    </Flex>
                                    <hr />
                                </>

                            )
                        case 'anticipatedRate':
                            return (
                                <>
                                    <Flex key={index} sx={{
                                        justifyContent: ['center', null, null, 'space-between'],
                                        flexDirection: ['column', null, null, 'row'],
                                    }}>
                                        <Text as={'p'} sx={{
                                            fontWeight: 'bold',
                                            mb: ['8px', null, null, '0']
                                        }}>{key + ': '}</Text>
                                        <Text as={'p'} sx={{
                                            wordBreak: 'break-all'
                                        }}>{numberWithCommas(data[key]) + ' ' + data.tokenSymbol + ' Per ' + selectedChain?.symbol}</Text>
                                    </Flex>
                                    <hr />
                                </>

                            )
                        case 'affiliate':
                            return (
                                <>
                                    <Flex key={index} sx={{
                                        justifyContent: ['center', null, null, 'space-between'],
                                        flexDirection: ['column', null, null, 'row'],
                                    }}>
                                        <Text as={'p'} sx={{
                                            fontWeight: 'bold',
                                            mb: ['8px', null, null, '0']
                                        }}>{key + ': '}</Text>
                                        <Text as={'p'} sx={{
                                            wordBreak: 'break-all'
                                        }}>{data[key] + '% of Raised Funds'}</Text>
                                    </Flex>
                                    <hr />
                                </>

                            )
                        case 'softCap':
                        case 'hardCap':
                            return (
                                <>
                                    <Flex key={index} sx={{
                                        justifyContent: ['center', null, null, 'space-between'],
                                        flexDirection: ['column', null, null, 'row'],
                                    }}>
                                        <Text as={'p'} sx={{
                                            fontWeight: 'bold',
                                            mb: ['8px', null, null, '0']
                                        }}>{key + ': '}</Text>
                                        <Text as={'p'} sx={{
                                            wordBreak: 'break-all'
                                        }}>{data[key] + ' ' + selectedChain?.symbol}</Text>
                                    </Flex>
                                    <hr />
                                </>

                            )
                        case 'address':
                            return <>
                                <Flex key={index} sx={{
                                    justifyContent: ['center', null, null, 'space-between'],
                                    flexDirection: ['column', null, null, 'row'],
                                }}>
                                    <Text as={'p'} sx={{
                                        fontWeight: 'bold',
                                        mb: ['8px', null, null, '0']
                                    }}>{'Token Address: '}</Text>
                                    <Text as={'p'} sx={{
                                        wordBreak: 'break-all'
                                    }}>
                                        <a href={selectedChain?.explorer + '/token/' + data[key]} target="_blank" rel="noopener noreferrer">
                                            {data[key]}</a> </Text>
                                </Flex>
                                <hr />
                            </>
                        case 'logo':
                            return <>
                                <Flex key={index} sx={{
                                    justifyContent: ['center', null, null, 'space-between'],
                                    flexDirection: ['column', null, null, 'row'],
                                    img: {
                                        mx: ['auto', null, null, '0']
                                    }
                                }}>
                                    <Text as={'p'} sx={{
                                        fontWeight: 'bold',
                                        mb: ['8px', null, null, '0']
                                    }}>{key + ': '}</Text>
                                    <Image src={data[key]} width={40} height={40} alt='Logo' />
                                </Flex>
                                <hr />
                            </>
                        case 'projectDescription':
                            return(
                            <>
                            <Flex key={index} sx={{
                                justifyContent: ['center', null, null, 'space-between'],
                                flexDirection: ['column', null, null, 'row'],
                            }}>
                                <Text as={'p'} sx={{
                                    fontWeight: 'bold',
                                    mb: ['8px', null, null, '0']
                                }}>{key + ': '}</Text>
                                <Text as={'p'} sx={{
                                    wordBreak: 'break-all',
                                    maxWidth:['100%',null,null,'70%'],
                                    mx:'auto',
                                    textAlign:['center',null,null,'right']
                                }}>{data[key]?.toString()}</Text>
                            </Flex>
                            <hr />
                        </>)
                        default:
                            return (
                                <>
                                    <Flex key={index} sx={{
                                        justifyContent: ['center', null, null, 'space-between'],
                                        flexDirection: ['column', null, null, 'row'],
                                    }}>
                                        <Text as={'p'} sx={{
                                            fontWeight: 'bold',
                                            mb: ['8px', null, null, '0']
                                        }}>{key + ': '}</Text>
                                        <Text as={'p'} sx={{
                                            wordBreak: 'break-all'
                                        }}>{data[key]?.toString()}</Text>
                                    </Flex>
                                    <hr />
                                </>

                            )
                    }

                })
            }
            <br />
            <Flex sx={{
                justifyContent: 'space-between',
                position: 'relative',
                mx: '25px',
                my: '25px',
                '.active': {
                    color: 'background',
                    background: 'text',
                    transform: 'scale(1.5)'
                }
            }}>
                <hr sx={{
                    opacity: '0.2',
                    position: 'absolute',
                    width: '100%',
                    top: '10%'
                }} />
                {
                    totalSteps.map((value, i) => {
                        return (

                            <Box key={i} sx={{
                                position: 'relative'
                            }}>
                                <Box sx={{
                                    borderRadius: '50%',
                                    position: 'relative',
                                    transition: '1s ease-out',
                                    background: 'glide',
                                    width: '30px',
                                    height: '30px',
                                    textAlign: 'center',
                                }} className={i <= currentStep ? 'active' : null}>
                                    <Text as={'p'} sx={{
                                        position: 'absolute',
                                        left: 0, right: 0, top: '20%', bottom: 0, margin: 'auto'
                                    }}>{value}</Text>
                                </Box>
                                <Box sx={{
                                    position: 'absolute',
                                    mt: '20px',
                                    left: '-75%'
                                    //bottom:'0'
                                }}>
                                    {value == 1 && <Text as={'p'}>Deploying Contract</Text>}
                                    {value == 2 && <Text as={'p'}>Transferring Tokens to Contract</Text>}
                                    {value == 3 && <Text as={'p'}>Finalizing</Text>}
                                </Box>
                            </Box>
                        )
                    })
                }
            </Flex>
            <br />
            <br />
            <br />
            <br />
            <Flex sx={{
                flexDirection: ['column', null, null, 'row'],
                justifyContent: 'space-between',
                button: {
                    width: ['100%', null, null, 'fit-content']
                }
            }}>
                {!isSubmitting && !isSubmitted ?
                    <Flex>
                        {formStep > 0 && (
                            <Button
                                onClick={prevFormStep}
                            >
                                Back
                            </Button>
                        )}
                        &nbsp;
                        &nbsp;
                        <Button onClick={onSubmit}>Deploy</Button>
                    </Flex>
                    : null}
                {isSubmitting ? <Box>
                    <Spinner />
                </Box> : null}
            </Flex>
            {isSubmitted && <Flex sx={{
                justifyContent: 'center',
                flexDirection: ['column', null, null, 'row'],
                a: {
                    width: '100%'
                },
                button: {
                    width: '100%'
                }
            }}>
                <a href={selectedChain?.explorer + '/tx/' + data.txHash} target="_blank" rel="noopener noreferrer">
                    <Button>View transaction</Button>
                </a>
                &nbsp;
                &nbsp;
                <Button onClick={() => {
                    router.push({
                        pathname: '/funding/' + data.icoAddress,
                        query: { chain: selectedChain?.slug },
                    });
                }}>View Sale</Button>
            </Flex>}
        </Box>
    );
}

export default FormCompleted

const handleSuccess = () => {
    return MySwal.fire({
        title: "Fair Launch ICO Created successfully 🎉",
        text: "Thank You For your patronage, Click Okay to see info",
        icon: "success",
        customClass: {
            confirmButton: "SweatBtn",
        },
        buttonsStyling: false,
    });
};

const handleFailure = (msg) => {
    return MySwal.fire({
        title: "Failed",
        text: msg,
        icon: "error",
        customClass: {
            confirmButton: "SweatBtn",
        },
        buttonsStyling: false,
    });
};
