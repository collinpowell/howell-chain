/* eslint-disable react/no-unknown-property */
/** @jsxImportSource theme-ui */
import { useState, useRef, useEffect } from "react";
import Header from "../../UIKit/layout/Header";
import { useFormData } from "../../contexts/form";
import { Box, Label, Flex, Heading, Text, Radio, Textarea, Input, Container, Spinner, Grid, Button } from 'theme-ui'
import styles from "../../styles/styles.module.scss";
import { useForm } from "react-hook-form";
import useTokenData from "../../Web3Hooks/ERC20/useTokenData";
import { useRouter } from "next/router";
import FormCompleted from '../../UIKit/components/ICOFormComplete'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useChainData } from "../../contexts/chain";

const ICO = () => {
    const [formStep, setFormStep] = useState(0);
    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
    const { chain } = useChainData()


    return (
        <>
            <Header />
            <Container sx={{
                mt: '180px'
            }}>
                <Box sx={{
                    textAlign: 'center',
                    mb: '30px'

                }}>
                    <Heading >Create an ICO - <span> Fair Launch</span></Heading>
                    <br />
                    <Text>Create an ICO fair launch in 3 easy steps</Text>
                </Box>

                <FormCard currentStep={formStep} prevFormStep={prevFormStep}>
                    {formStep == 0 && (
                        <VerifyToken formStep={formStep} nextFormStep={nextFormStep} selectedChain={chain} prevFormStep={prevFormStep} />
                    )}
                    {formStep == 1 && (
                        <ICODetails formStep={formStep} nextFormStep={nextFormStep} selectedChain={chain} prevFormStep={prevFormStep} />
                    )}
                    {formStep == 2 && (
                        <ProjectDetails formStep={formStep} nextFormStep={nextFormStep} selectedChain={chain} prevFormStep={prevFormStep} />
                    )}
                    {formStep > 2 && <FormCompleted selectedChain={chain} formStep={formStep} prevFormStep={prevFormStep} />}
                </FormCard>
            </Container>

        </>
    )
}

export default ICO

function FormCard({ children, currentStep, prevFormStep }) {
    const totalSteps = [1, 2, 3];
    return (
        <>
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
                    zIndex: '-1',
                    top: '20%'
                }} />
                {
                    totalSteps.map((value, i) => {
                        return (
                            <Box key={i} sx={{
                                borderRadius: '50%',
                                position: 'relative',
                                background: 'glide',
                                width: '30px',
                                height: '30px',
                                textAlign: 'center',
                            }} className={currentStep >= i ? 'active' : null}>
                                <Text as={'p'} sx={{
                                    position: 'absolute',
                                    left: 0, right: 0, top: '20%', bottom: 0, margin: 'auto'
                                }}>{value}</Text>
                            </Box>
                        )
                    })
                }
            </Flex>

            <Box variant="boxes.glide">

                {children}
            </Box>
        </>

    );
}

function VerifyToken({ formStep, nextFormStep, selectedChain, prevFormStep }) {
    const [affiliate, setAffiliate] = useState(true)
    const [listing, setListing] = useState(false)
    console.log(listing)
    const router = useRouter()
    const { setFormValues, data } = useFormData();
    const [address, setAddress] = useState(router?.query?.token)
    const { handleSubmit, register, formState: { errors }, setError } = useForm();
    const tokenData = useTokenData(address)
    async function onSubmit(formData) {
        formData.listing = listing
        formData.tokenInfo = tokenData
        setFormValues(formData)
        nextFormStep();
    }

    return (
        <Box className={formStep === 0 ? styles.showForm : styles.hideForm}>
            <Heading>Verify Token</Heading>
            <br />
            <Text as={'p'} mb={2}> <strong>Pool creation fee: {selectedChain?.poolCreationFee + ' ' + selectedChain?.symbol}</strong> </Text>

            <Box as="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Box>
                    <br />
                    <Flex sx={{
                        justifyContent: 'space-between',
                        button: {
                            width: ['50%', null, null, 'fit-content']
                        }
                    }}>
                        <Label htmlFor="address">Token Address</Label>

                        <Button variant="text" onClick={() => {
                            router.push({
                                pathname: '/create/token',
                                query: { ...router.query, chain: selectedChain?.slug },
                            });
                        }}>Create&nbsp;Token</Button>
                    </Flex>
                    <Input name="address" id="address" value={router?.query?.token ? router?.query?.token : null} {...register("address", {
                        required: "Required",
                        //validate: value => value !== "admin" || "Nice try!",
                        validate: (value) => {
                            if (!tokenData || !tokenData.name) {
                                return 'Token Info Not Found (Kindly cross check address and chain)'
                            }
                        }
                    })} my={3} onChange={(e) => {
                        router.query.token = e.target.value
                        setAddress(e.target.value)
                    }} placeholder="e.g 0x1c86738cAbcd4E37910468119ddF78817dC2125d" />
                    <Text variant='danger'>{errors.address && errors.address.message}</Text>
                </Box>
                {tokenData && tokenData.name &&
                    <Box>
                        <Text as={'p'} mb={1}>Name: {tokenData.name}</Text>
                        <Text as={'p'} mb={1}>Symbol: {tokenData.symbol}</Text>
                        <Text as={'p'} mb={1}>Decimals: {tokenData.decimals}</Text>
                    </Box>
                }
                <br />
                <Box sx={{ svg: { color: 'text' } }}>
                    <Label htmlFor="currency">Currency</Label>
                    <Label my={3}>
                        <Radio name="currency" id="currency" value='true'
                            defaultChecked={true} />
                        {selectedChain?.symbol}&nbsp;<strong>(Users will pay with {selectedChain?.symbol})</strong>
                    </Label>
                </Box>
                <br />
                <Box sx={{ svg: { color: 'text' } }}>
                    <Label htmlFor="referral">Affiliate (Referral Contest)</Label>
                    <Label my={2}>
                        <Radio name="referral" id="referral"
                            onChange={(e) => {
                                setAffiliate(!e.target.value)
                            }} />
                        Disable Affiliate
                    </Label>
                    <Label my={2}>
                        <Radio name="referral" id="referral" defaultChecked={true} onChange={(e) => {
                            setAffiliate(e.target.value ? true : false)
                        }} />
                        Enable Affiliate
                    </Label>
                </Box>
                {affiliate && <Box>
                    <Label htmlFor="affiliate">Affiliate Percentage (Amount of raised fund to be used for affiliate)</Label>
                    <Input type="number" name="affiliate" {...register("affiliate", {
                        required: "Required"
                    })} id="affiliate" my={3} value={data.affiliate} placeholder="Enter Percentage. Max: 10" />
                    <Text variant='danger'>{errors.affiliate && errors.affiliate.message}</Text>
                </Box>}
                <br />
                <Box sx={{ svg: { color: 'text' } }}>
                    <Label htmlFor="auto">Auto Listing</Label>
                    <Label my={2}>
                        <Radio name="auto" id="auto"
                            defaultChecked={true} onChange={(e) => {
                                setListing(!e.target.value)
                            }} />
                        Disable Auto listing
                    </Label>
                    <Label my={2}>
                        <Radio name="auto" id="auto" onChange={(e) => {
                            setListing(e.target.value ? true : false)
                        }} />
                        Enable Auto listing
                    </Label>
                </Box>
                <br />
                <Text as={'p'} mb={5}> <strong>Pool Fees: {selectedChain?.poolFee + '% of ' + selectedChain?.symbol} raised</strong> </Text>
                <Flex>
                    {formStep > 0 && (
                        <Button
                            onClick={prevFormStep}
                        >
                            Back
                        </Button>
                    )}
                    <Button type="submit">Proceed{' >>>'}</Button>
                </Flex>

            </Box>
        </Box>
    );
}

function ICODetails({ formStep, nextFormStep, selectedChain, prevFormStep }) {
    const { setFormValues, data } = useFormData();
    const { handleSubmit, register, formState: { errors }, setError } = useForm();
    const [startDate, setStartDate] = useState(data?.startDate ? data?.startDate: new Date());
    const [endDate, setEndDate] = useState(data?.endDate ? data?.endDate: new Date());
    async function onSubmit(values) {
        values.startDate = startDate
        values.endDate = endDate
        setFormValues(values)
        nextFormStep();
    }

    return (
        <Box className={formStep === 0 ? styles.showForm : styles.hideForm}>
            <Heading>Fair Launch Info</Heading>
            <br />
            <Text as={'p'} mb={2}> <strong>Pool creation fee: {selectedChain?.poolCreationFee + ' ' + selectedChain?.symbol}</strong> </Text>
            <br />
            <Box as="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Box>
                    <Label htmlFor="preSaleTokens">Total tokens to be sold</Label>
                    <Input type="number" name="preSaleTokens" {...register("preSaleTokens", {
                        required: "Required"
                    })} id="preSaleTokens" my={3} value={data.preSaleTokens} placeholder="e.g 10000000" />
                    <Text variant='danger'>{errors.preSaleTokens && errors.preSaleTokens.message}</Text>
                </Box>
                <br />
                <Box>
                    <Label htmlFor="softCap">Soft Cap ({selectedChain?.symbol})</Label>
                    <Input type="number" name="softCap" {...register("softCap", {
                        required: "Required"
                    })} id="softCap" my={3} value={data.softCap} placeholder="50" />
                    <Text variant='danger'>{errors.softCap && errors.softCap.message}</Text>
                </Box>
                <br />
                <Box>
                    <Label htmlFor="anticipatedRate">Anticipated Rate (how many token per {selectedChain?.symbol})</Label>
                    <Input type="number" name="anticipatedRate" {...register("anticipatedRate", {
                        required: "Required"
                    })} id="anticipatedRate" my={3} value={data.anticipatedRate} placeholder="50" />
                    <Text variant='danger'>{errors.anticipatedRate && errors.anticipatedRate.message}</Text>
                </Box>
                <br />
                <Flex sx={{
                    justifyContent: 'space-between',
                    flexDirection: ['column', null, null, 'row'],
                    '.boxes': {
                        width: '100%',
                        input: {
                            mt: '15px'
                        }
                    }
                }}>
                    <Box className="boxes">
                        <Label htmlFor="start">Start Time (UTC)</Label>
                        <DatePicker selected={startDate} showTimeSelect onChange={(date) => setStartDate(date)} />
                    </Box>
                    &nbsp;
                    &nbsp;
                    <Box className="boxes">
                        <Label htmlFor="end">End Time (UTC)</Label>
                        <DatePicker selected={endDate} showTimeSelect onChange={(date) => setEndDate(date)} />
                    </Box>
                </Flex>
                <br />
                <Text as={'p'} mb={5}> <strong>Pool Fees: {selectedChain?.poolFee + '% of ' + selectedChain?.symbol} raised</strong> </Text>
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
                    <Button type="submit">Proceed {'>>>'}</Button>
                </Flex>

            </Box>
        </Box>
    );
}

function ProjectDetails({ formStep, nextFormStep, selectedChain, prevFormStep }) {
    const { data, setFormValues } = useFormData();
    const { handleSubmit, register, formState: { errors } } = useForm();

    async function onSubmit(formData) {
        setFormValues(formData)
        nextFormStep();
    }

    return (
        <Box className={formStep === 0 ? styles.showForm : styles.hideForm}>
            <Heading>Project Info</Heading>
            <br />
            <Text as={'p'} mb={2}> <strong>Pool creation fee: {selectedChain?.poolCreationFee + ' ' + selectedChain?.symbol}</strong> </Text>

            <Box as="form" onSubmit={handleSubmit(onSubmit)} noValidate>

                <Grid width={[250, null, 400]} gap={2} columns={[2, '1fr 2fr']}>
                    <Box>
                        <Label htmlFor="logo">Link to Logo</Label>
                        <br />
                        <Input name="logo" id="logo" type='url' value={data.logo}  {...register("logo", {
                            required: "Required",
                        })} mb={3} placeholder="e.g https://howrea.com/shrf.png" />
                        <Text variant='danger'>{errors.logo && errors.logo.message}</Text>
                    </Box>
                    <Box>
                        <Label htmlFor="website">Project Website Link</Label>
                        <br />
                        <Input name="website" id="website" type='url' value={data.website}  {...register("website", {
                            required: "Required",
                        })} mb={3} placeholder="e.g https://howrea.com" />
                        <Text variant='danger'>{errors.website && errors.website.message}</Text>
                    </Box>
                    <Box>
                        <Label htmlFor="telegram">Telegram</Label>
                        <br />
                        <Input name="telegram" id="telegram" type='url' value={data.telegram}   {...register("telegram", {
                        })} mb={3} placeholder="e.g t.me/howrians" />
                        <Text variant='danger'>{errors.telegram && errors.telegram.message}</Text>
                    </Box>
                    <Box>
                        <Label htmlFor="twitter">Twitter</Label>
                        <br />
                        <Input name="twitter" id="twitter" type='url' value={data.twitter}  {...register("twitter", {
                        })} mb={3} placeholder="e.g https://twitter.com/HowreaNetwork" />
                        <Text variant='danger'>{errors.twitter && errors.twitter.message}</Text>
                    </Box>
                    <Box>
                        <Label htmlFor="instagram">Instagram</Label>
                        <br />
                        <Input name="instagram" id="instagram" type='url' value={data.instagram}   {...register("instagram", {
                        })} mb={3} placeholder="e.g https://www.instagram.com/howrians" />
                        <Text variant='danger'>{errors.instagram && errors.instagram.message}</Text>
                    </Box>
                    <Box>
                        <Label htmlFor="discord">Discord</Label>
                        <br />
                        <Input name="discord" id="discord" type='url' value={data.discord}  {...register("discord", {
                        })} mb={3} placeholder="e.g https://discord.gg/ecBCWHweym" />
                        <Text variant='danger'>{errors.discord && errors.discord.message}</Text>
                    </Box>
                    <Box>
                        <Label htmlFor="medium">Medium</Label>
                        <br />
                        <Input name="medium" id="medium" type='url' value={data.medium}   {...register("medium", {
                        })} mb={3} placeholder="e.g https://medium.com/@howreanetwork" />
                        <Text variant='danger'>{errors.medium && errors.medium.message}</Text>
                    </Box>
                    <Box>
                        <Label htmlFor="github">Github</Label>
                        <br />
                        <Input name="github" id="github" type='url' value={data.github}  {...register("github", {
                        })} mb={3} placeholder="e.g https://github.com/howrea" />
                        <Text variant='danger'>{errors.github && errors.github.message}</Text>
                    </Box>
                    <Box>
                        <Label htmlFor="reddit">Reddit</Label>
                        <br />
                        <Input name="reddit" id="reddit" type='url' value={data.reddit}   {...register("reddit", {
                        })} mb={3} placeholder="e.g https://reddit.com/@howreanetwork" />
                        <Text variant='danger'>{errors.reddit && errors.reddit.message}</Text>
                    </Box>
                    <Box>
                        <Label htmlFor="linkedin">Linkedin</Label>
                        <br />
                        <Input name="linkedin" id="linkedin" type='url' value={data.linkedin}  {...register("linkedin", {
                        })} mb={3} placeholder="e.g https://www.linkedin.com/company/howreanetwork" />
                        <Text variant='danger'>{errors.linkedin && errors.linkedin.message}</Text>
                    </Box>
                </Grid>
                <Box>
                    <Label htmlFor="youtube">Youtube Video</Label>
                    <br />
                    <Input name="youtube" id="youtube" type='url' value={data.youtube}  {...register("youtube", {
                    })} mb={3} placeholder="e.g https://www.youtube.com/watch?v=4FsFdO0_5OU" />
                    <Text variant='danger'>{errors.youtube && errors.youtube.message}</Text>
                </Box>
                <Box>
                    <Label htmlFor="projectDescription">Project description</Label>
                    <br />
                    <Textarea type="text" name="projectDescription" id="projectDescription" value={data.projectDescription} {...register("projectDescription", {
                        required: "Required"
                    })} mb={3} placeholder="Howrea Network: A blockchain project powered by AI to automate the process of creating your very own..." />
                    <Text variant='danger'>{errors.projectDescription && errors.projectDescription.message}</Text>
                    <br />
                    <br />
                </Box>
                <Text as={'p'} mb={5}> <strong>Pool Fees: {selectedChain?.poolFee + '% of ' + selectedChain?.symbol} raised</strong> </Text>
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
                    <Button type="submit">Create ICO</Button>
                </Flex>

            </Box>
        </Box>
    );
}
