import { Container, Heading, Text } from 'theme-ui'
import Stats from '../sub/Stats'
const data = {
    subHeading:'Revolutionizing the blockchain industry',
    body:'Join the new digital gold rush with the howrians',
}

const Hero = () => {
    return (
        <Container sx={styles.container}>
            <Heading>The <span>Howrea</span> Network is Here!</Heading>
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