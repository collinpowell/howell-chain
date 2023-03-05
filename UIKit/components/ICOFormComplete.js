import { Text, Heading, Flex,Button,Spinner,Box } from "theme-ui";
import { useFormData } from "../../contexts/form";
import { useWeb3React } from "@web3-react/core";
import Party from '../../UIKit/components/Party'
import ABI from '../../artifacts/contracts/StandardICO.sol/Presale.json'
import { ContractFactory, ethers } from 'ethers';
import { useRouter } from 'next/router'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

function FormCompleted({selectedChain}) {
    const { data } = useFormData();
    const router = useRouter()
    const { library, account, chainId } = useWeb3React();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const keys = Object.keys(data);

    console.log(keys);

    keys.forEach((key) => {
        console.log(`${key}: ${courses[key]}`);
    });

    const onSubmit = async () => {
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
                    value: ethers.utils.parseUnits(selectedChain.poolCreationFee, "ether"),
                }
            )
            const deploymentReceipt = await contract.deployTransaction.wait(1)
            console.log(`Fair launch deployed to ${contract.address}`)
            console.log(deploymentReceipt);
            values.txHash = deploymentReceipt.transactionHash
            values.contractAddress = contract.address
            values.deployer = deploymentReceipt.from

            console.log(contract.deployTransaction);
            handleSuccess('Fair launch Creation Successful')
            setIsSubmitting(false)
            setIsSubmitted(true)
        } catch (error) {
            setIsSubmitting(false)
            if (error.data) {
                handleFailure("Error message " + error.data.message);

            } else {
                handleFailure("Error message " + error.reason);
            }
        }
        setIsSubmitting(false)
    };
    return (
        <>
            {isSubmitted && <Party />}
            <Heading>Yay 🎉,You are all set, confirm info and Kindly read note below before submission</Heading>
            {
                keys.forEach((key, index) => {
                    return (
                        <>
                        <hr />
                        <Flex key={index} sx={{
                            justifyContent: 'space-between'
                        }}>
                            <Text as={'p'}>{key + ': '}</Text>
                            <Text as={'p'}>{courses[key]}</Text>
                        </Flex>
                        </>

                    )
                })
            }
            <br />
                    <Flex sx={{
                        flexDirection: ['column', null, null, 'row'],
                        justifyContent: 'space-between',
                    }}>
                        {!isSubmitting && !isSubmitted ? <Button onClick={onSubmit}>Deploy</Button> : null}
                        {isSubmitting ? <Box>
                            <Spinner />
                        </Box> : null}
                    </Flex>
        </>
    );
}

export default FormCompleted

 const handleSuccess = () => {
        return MySwal.fire({
            title: "Token Deployed successfully 🎉",
            text: "Thank You For you patronage, Click Okay to see token info",
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
