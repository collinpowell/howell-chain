import { Container, Flex, Button, Heading, Text } from 'theme-ui'
import Stats from '../sub/Stats'
import { useRouter } from 'next/router'
import Link from 'next/link'
const data = {
    subHeading: 'Empowering the next generation of blockchain heros!',
    body: 'Launch your token and ICO in a matter of seconds with no coding, risk-free,and secure for investors',
}

const Hero = ({ state }) => {
    const router = useRouter();

    return (
        <Container sx={styles.container}>
            <Heading>The <span>Howrea</span> Launchpad!</Heading>
            <Text variant='title' as='h4'>{data.subHeading}</Text>
            <Text variant='normal' as='p'>{data.body}</Text>
            <br />
            <br />
            <Flex sx={{
                justifyContent: 'center'
            }}>
                <Button onClick={() => {
                    const localChain = typeof window !== 'undefined' ? localStorage.getItem('chain') : undefined
                    router.push({
                        pathname: '/create/ico',
                        query: { ...router.query, chain: localChain ? localChain : 'BSC' },
                    });
                }}>Create ICO</Button>
                &nbsp;
                &nbsp;
                <Button onClick={() => {
                    const localChain = typeof window !== 'undefined' ? localStorage.getItem('chain') : undefined
                    router.push({
                        pathname: '/create/token',
                        query: { ...router.query, chain: localChain ? localChain : 'BSC' },
                    });
                }}>Create Token</Button>
            </Flex>
            <br />
            <Link href={'/dashboard'}>
                <Button>Dashboard</Button>
            </Link>
            <Stats data={null} />
        </Container>
    )
}

export default Hero

const styles = {
    container: {
        pt: '61px',
        mt: '80px',
        textAlign: 'center',
        h2: {
            mb: '27px',
        },
        h4: {
            mb: '12px',
        }
    },

}