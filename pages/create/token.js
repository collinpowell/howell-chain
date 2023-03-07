import { Box, Label, Flex, Heading, Text, Select, Input, Container, Spinner, Grid, Button } from 'theme-ui'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import TokenInfo from '../../UIKit/sections/root/main/Glide'
import { chains } from '../../data/chains';
import Party from '../../UIKit/components/Party'
import ABI from '../../artifacts/contracts/StandardToken.sol/Standard.json'
import { ContractFactory, ethers } from 'ethers';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import Header from '../../UIKit/layout/Header'

const handleSuccess = () => {
    return MySwal.fire({
        title: "Token Deployed successfully 🎉",
        text: "Thank You For your patronage, Click Okay to see token info",
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


export default function FormData() {
    const router = useRouter()
    const { library, account, chainId } = useWeb3React();
    const [selectedChain, setSelectedChain] = useState({});
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [tokenInfo, setTokenInfo] = useState({})
    useEffect(() => {
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
    const onSubmit = async (values) => {
        setTokenInfo(values)
        setIsSubmitting(true)
        if (!account) {
            handleFailure("Connect Wallet")
            setIsSubmitting(false)
            return;
        }

        console.log(values)

        const factory = new ContractFactory(ABI.abi, ABI.bytecode, library.getSigner(account));

        try {
            // If your contract requires constructor args, you can specify them here
            const contract = await factory.deploy(
                values.name,
                values.symbol,
                values.total,
                values.decimal,
                {
                    value: ethers.utils.parseUnits(selectedChain.tokenDeployFee, "ether"),
                }
            )
            const deploymentReceipt = await contract.deployTransaction.wait(1)
            console.log(`Contract deployed to ${contract.address}`)
            console.log(deploymentReceipt);
            values.txHash = deploymentReceipt.transactionHash
            values.contractAddress = contract.address
            values.deployer = deploymentReceipt.from

            console.log(contract.deployTransaction);
            handleSuccess('Token Creation Successful')
            setIsSubmitting(false)
            setTokenInfo(values)
            setIsSubmitted(true)
        } catch (error) {
            setIsSubmitting(false)
            if (error.data) {
                handleFailure(error.data.message);

            } else {
                handleFailure(error.message);
            }
        }
        setIsSubmitting(false)
    };


    return (
        <>
            {isSubmitted && <Party />}
            <Header />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Container>
                {!isSubmitted && <Box sx={styles.heading}>
                    <Heading>Create your own crypto token</Heading>
                    <br />
                    <Text>Tokens created would be published and verified on the public explorer</Text>
                    <br />
                    <br />
                    <Text> <strong>Note:</strong> Token total supply would be minted to your connected address (Standard Deployment cost: {selectedChain.tokenDeployFee +' '+ selectedChain.symbol})</Text>
                </Box>}
                {isSubmitted && <TokenInfo info={tokenInfo} chain={selectedChain} />}
                <Box as="form" sx={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Box>
                        <Label htmlFor="type">Token Type</Label>
                        <Select name="type" id="type" mb={2} {...register("type", {
                            required: "Required",
                            disabled: isSubmitted
                        })}>
                            <option>Standard Token</option>
                            {/* {howHeardData.map((data, i) => {
                                return <option key={i} value={i}>{data.text}</option>
                            })} */}

                        </Select>
                        <Text variant='danger'>{errors.type && errors.type.message}</Text>

                    </Box>
                    <Grid width={[250, null, 400]} gap={2} columns={[2, '1fr 2fr']}>
                        <Box>
                            <Label htmlFor="name">Name</Label>
                            <Input name="name" id="name"  {...register("name", {
                                required: "Required",
                                disabled: isSubmitted
                            })} mb={2} placeholder="e.g Sheer Finance" />
                            <Text variant='danger'>{errors.name && errors.name.message}</Text>
                        </Box>
                        <Box>
                            <Label htmlFor="symbol">Symbol</Label>
                            <Input name="symbol" id="symbol"  {...register("symbol", {
                                required: "Required",
                                disabled: isSubmitted
                            })} mb={2} placeholder="e.g SHRF" />
                            <Text variant='danger'>{errors.symbol && errors.symbol.message}</Text>
                        </Box>
                        <Box>
                            <Label htmlFor="decimal">Decimals</Label>
                            <Input type="number" name="decimal" {...register("decimal", {
                                required: "Required",
                                disabled: isSubmitted
                            })} id="decimal" mb={2} placeholder="e.g 18" />
                            <Text variant='danger'>{errors.decimal && errors.decimal.message}</Text>
                        </Box>
                        <Box>
                            <Label htmlFor="total">Total Supply</Label>
                            <Input type="number" name="total" {...register("total", {
                                required: "Required",
                                disabled: isSubmitted
                            })} id="total" mb={2} placeholder="e.g 100000000" />
                            <Text variant='danger'>{errors.total && errors.total.message}</Text>
                        </Box>

                    </Grid>
                    <br />
                    <Flex sx={{
                        flexDirection: ['column', null, null, 'row'],
                        justifyContent: 'space-between',
                    }}>
                        {!isSubmitting && !isSubmitted ? <Button type="submit">Create Token </Button> : null}
                        {isSubmitting ? <Box>
                            <Spinner />
                        </Box> : null}
                    </Flex>
                    {/* <br />
                    <br />
                    <br />
                    <a href="https://howrea.com/funding" target="_blank" rel="noreferrer">
                        <Button sx={{width:['100%',null,null,'fit-content']}} type='button'>
                        Buy SHRF Tokens
                        </Button>
                    </a> */}

                </Box>

            </Container >
        </>
    )
}

const styles = {
    heading: {
        textAlign: 'center',
        h1: {
            fontSize: ['20px', null, null, '25px'],
            wordWrap: 'break-word',
            position: 'relative',
            mr: 'auto',
            ml: 'auto',
            mb: '20px',
            mt: '50px',
            whiteSpace: 'initial',
        }
    },
    form: {
        mt: '50px',
        pl: [0, null, null, '100px'],
        pr: [0, null, null, '100px'],
        label: {
            mb: '10px',
        },
    },
    file: {
        position: 'relative',
        p: {
            mt: 'auto',
            mb: 'auto',
            ml: '10px'
        }
    }
}