import { Heading, Container } from "theme-ui"
import Header from '../UIKit/layout/Header';
const ComingSoon = () => {
    return (
        <>
      <Header />
      <Container sx={{
            textAlign: 'center',
        }}>
            <Heading sx={{
                textAlign: 'center',
                width: '100%',
                my: '20vh'
            }}>
                Stay tunes, Coming Soon
            </Heading>
            <br />
            <br />
            <br />
        </Container>
        </>
    )
}

export default ComingSoon