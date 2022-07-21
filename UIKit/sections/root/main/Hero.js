import { Container, Heading, Text } from 'theme-ui'
import Stats from '../sub/Stats'
const data = {
    subHeading:'Revolutionizing the blockchain industry',
    body:'let us Utilize blockchain technology for what it is meant for',
}

const Hero = () => {
    return (
        <Container sx={styles.container}>
            <Heading>The <span>Howell</span> Network is Here!</Heading>
            <Text variant='title' as='h4'>{data.subHeading}</Text>
            <Text variant='normal' as='p'>{data.body}</Text>
            <Stats/>
        </Container>
    )
}

export default Hero

const styles = {
    container: {
        pt:'61px',
        textAlign: 'center',
        h2: {
            mb: '27px',
        },
        h4: {
            mb: '12px',
        }
    },
   
}