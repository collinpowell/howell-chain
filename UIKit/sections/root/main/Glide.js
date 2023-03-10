import { Container, Box, Button, Flex, Heading, Text } from 'theme-ui'
import { useRouter } from 'next/router';
const Glide = ({ info, chain }) => {
    const router = useRouter()
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return (
        <Box sx={styles.major}>
            <Container sx={styles.container}>
                <Box variant='boxes.glide' sx={styles.box}>
                    <Box sx={styles.main}>
                        <Heading variant='border' sx={styles.heading}>{'Yay! Your token was created successfully'}</Heading>
                        <Text variant='normal' as='p' sx={styles.smallHeader}>Deployer:  &nbsp;
                            <a href={chain?.explorer + '/address/' + info.deployer} target="_blank" rel="noopener noreferrer">
                                {info.deployer} </a></Text>
                        <Text variant='normal' as='p' sx={styles.smallHeader}>Deployment Chain: {chain?.chainName}</Text>
                        <Text variant='normal' as='p' sx={styles.smallHeader}>Chain ID: {chain?.chainId}</Text>
                        <Text variant='normal' as='p' sx={styles.smallHeader}>Name: {info.name}</Text>
                        <Text variant='normal' as='p' sx={styles.smallHeader}>Symbol: {info.symbol}</Text>
                        <Text variant='normal' as='p' sx={styles.smallHeader}>Total Supply: {numberWithCommas(info.total) + ' ' + info.symbol}</Text>
                        <Text variant='normal' as='p' sx={styles.smallHeader}>Token Address:  &nbsp;
                            <a href={chain?.explorer + '/token/' + info.contractAddress} target="_blank" rel="noopener noreferrer">
                                {info.contractAddress} </a> </Text>
                    </Box>
                    <br />
                    <Flex sx={{
                        justifyContent: 'center',
                        flexDirection: ['column', null, null, 'row'],
                        a: {
                            width: '100%'
                        },
                        button: {
                            width: '100%'
                        }
                    }}>
                        <a href={chain?.explorer + '/tx/' + info.txHash} target="_blank" rel="noopener noreferrer">
                            <Button>View transaction</Button>
                        </a>
                        &nbsp;
                        &nbsp;
                        <Button onClick={() =>{
                            const localChain = typeof window !== 'undefined' ? localStorage.getItem('chain') : undefined
                            router.push({
                                pathname: '/create/ico',
                                query: { ...router.query, chain: localChain ? localChain : 'BSC',token: info.contractAddress},
                            });
                        }}>Create ICO</Button>
                    </Flex>
                </Box>
            </Container>
        </Box>

    )
}

export default Glide

const styles = {
    container: {
        mt: '55px',
        pl: [0, null, null, '80px'],
        pr: [0, null, null, '80px'],
    },
    box: {
        textAlign: ['center', null, null, 'center'],
    },
    main: {
        pr: '15px',
        textAlign: ['center', null, null, 'center'],
        pl: ['15px', null, null, '0'],
        h2: {
            mb: '30px',
            mx: 'auto',
            textAlign: ['center', null, null, 'center'],
        },
        p: {
            textAlign: ['left', null, null, 'left'],
            mb: '20px',
            wordBreak: 'break-all',
            mx: [0, null, null, '30px'],
            a: {
                fontWeight: 'bold',
            }
        }
    },
}