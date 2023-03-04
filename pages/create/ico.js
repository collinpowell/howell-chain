import { useState, useRef, useEffect } from "react";
import Header from "../../UIKit/layout/Header";
import { useFormData } from "../../contexts/form";
import { Box, Label, Flex, Heading, Text, Radio, Select, Input, Container, Spinner, Grid, Button } from 'theme-ui'
import styles from "../../styles/styles.module.scss";
import { useForm } from "react-hook-form";
import { chains } from "../../data/chains";
import useTokenData from "../../Web3Hooks/ERC20/useTokenData";
import { useRouter } from "next/router";
const ICO = () => {
    const [formStep, setFormStep] = useState(0);
    const router = useRouter()
    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
    const [selectedChain, setSelectedChain] = useState(chains[0]);

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

    return (
        <>
            <Header />
            <Container sx={{
                mt: '120px'
            }}>
                <FormCard currentStep={formStep} prevFormStep={prevFormStep}>
                    {formStep == 0 && (
                        <VerifyToken formStep={formStep} nextFormStep={nextFormStep} selectedChain={selectedChain} />
                    )}
                    {formStep == 1 && (
                        <BillingInfo formStep={formStep} nextFormStep={nextFormStep} />
                    )}
                    {formStep == 2 && (
                        <ConfirmPurchase formStep={formStep} nextFormStep={nextFormStep} />
                    )}

                    {formStep > 2 && <FormCompleted />}
                </FormCard>
            </Container>

        </>
    )
}

export default ICO

function FormCard({ children, currentStep, prevFormStep }) {
    return (
        <Box variant="boxes.glide">
            {currentStep < 3 && (
                <>
                    {currentStep > 0 && (
                        <button
                            onClick={prevFormStep}
                            type="button"
                        >
                            back
                        </button>
                    )}

                    <span className={styles.steps}>Step {currentStep + 1} of 3</span>
                </>
            )}
            {children}
        </Box>
    );
}

function FormCompleted() {
    const { data } = useFormData();

    return (
        <>
            <h2>Thank you for your purchase! 🎉</h2>

            <pre>{JSON.stringify(data)}</pre>
        </>
    );
}


function BillingInfo({ formStep, nextFormStep }) {
    const formRef = useRef();

    async function handleSubmit(data) {
        nextFormStep();
    }

    return (
        <div className={formStep === 1 ? styles.showForm : styles.hideForm}>
            <h2>Billing Info</h2>

            <button onClick={handleSubmit}>Next</button>

        </div>
    );
}

function ConfirmPurchase({ formStep, nextFormStep }) {
    const formRef = useRef();

    async function handleSubmit(data) {

        nextFormStep();

    }

    return (
        <div className={formStep === 2 ? styles.showForm : styles.hideForm}>
            <h2>Confirm Purchase</h2>

            <button onClick={handleSubmit}>Confirm purchase</button>

        </div>
    );
}

function VerifyToken({ formStep, nextFormStep, selectedChain }) {
    const [affiliate, setAffiliate] = useState(false)
    const router = useRouter() 
    const { setFormValues } = useFormData();
    const [address, setAddress] = useState(router?.query?.token)
    const { handleSubmit, register, formState: { errors } } = useForm();
    const data = useTokenData(address)
    console.log(data)
    async function onSubmit(data) {
        setFormValues(data)
        nextFormStep();
    }

    return (
        <Box className={formStep === 0 ? styles.showForm : styles.hideForm}>
            <Heading>Verify Token</Heading>
            <br />
            <Text as={'p'} mb={2}> <strong>Pool creation fee: {selectedChain.poolCreationFee + ' ' + selectedChain.symbol}</strong> </Text>
            
            <Box as="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Box>
                    <Flex sx={{
                        justifyContent: 'space-between'
                    }}>
                    <Label htmlFor="address">Token Address</Label>

                    <Button variant="text" onClick={() => {
                    const localChain = typeof window !== 'undefined' ? localStorage.getItem('chain') : undefined
                    router.push({
                        pathname: '/create/token',
                        query: { ...router.query, chain: localChain ? localChain : 'BSC' },
                    });
                }}>Create&nbsp;Token</Button>
                    </Flex>
                    <Input name="address" id="address" value={router?.query?.token ? router?.query?.token : null} {...register("address", {
                        required: "Required"
                    })} my={3} onChange={(e) => {
                        setAddress(e.target.value)
                    }} placeholder="e.g 0x1c86738cAbcd4E37910468119ddF78817dC2125d" />
                    <Text variant='danger'>{errors.address && errors.address.message}</Text>
                </Box>
                {data && data.name &&
                    <Box>
                        <Text as={'p'} mb={1}>Name: {data.name}</Text>
                        <Text as={'p'} mb={1}>Symbol: {data.symbol}</Text>
                        <Text as={'p'} mb={1}>Decimals: {data.decimals}</Text>
                    </Box>
                }
                <br />
                <Box sx={{ svg: { color: 'text' } }}>
                    <Label htmlFor="currency">Currency</Label>
                    <Label my={3}>
                        <Radio name="currency" id="currency" value='true'
                            defaultChecked={true} />
                        {selectedChain.symbol}&nbsp;<strong>(Users will pay with {selectedChain.symbol})</strong>
                    </Label>
                </Box>
                <br />
                <Box sx={{ svg: { color: 'text' } }}>
                    <Label htmlFor="referral">Affiliate (Referral Contest)</Label>
                    <Label my={2}>
                        <Radio name="referral" id="referral"
                            defaultChecked={true} onChange={(e) => {
                                setAffiliate(!e.target.value)
                            }} />
                        Disable Affiliate
                    </Label>
                    <Label my={2}>
                        <Radio name="referral" id="referral" onChange={(e) => {
                            setAffiliate(e.target.value)
                        }} />
                        Enable Affiliate
                    </Label>
                </Box>
                {affiliate && <Box>
                    <Label htmlFor="affiliate">Affiliate Percentage (Amount of raised fund to be used for affiliate)</Label>
                    <Input type="number" name="affiliate" {...register("affiliate", {
                        required: "Required"
                    })} id="affiliate" my={3} placeholder="Enter Percentage. Max: 10" />
                    <Text variant='danger'>{errors.affiliate && errors.affiliate.message}</Text>
                </Box>}
                <br />
                <Text as={'p'} mb={5}> <strong>Pool Fees: {selectedChain.poolFee + '% of ' + selectedChain.symbol} raised</strong> </Text>

                <Button type="submit">Verify</Button>
            </Box>
        </Box>
    );
}
