import { Heading, Text, Container } from 'theme-ui'
import { privacy } from '../data/privacy';
import Seo from '../components/SEO';
import Header from '../UIKit/layout/Header';
const Privacy = () => {
    return (
        <>
        <Seo title='Howrea | Privacy Policy' description='Our Privacy Policy'/>
            <Header/>
            <br />
            <br />
            <br />
            <br />
            <Container sx={{
                fontSize: ['15px', null, null, '20px'],
                h1: {
                    textAlign: ['center', null, null, 'left']
                },
                h2: {
                    textAlign: ['center', null, null, 'left']
                }
            }}>
                {privacy.map((item, i) => {
                    return (
                        <div key={i}>
                            <br />
                            <Heading variant='blockStats'>{item.heading}</Heading>
                            <br />
                            {item.subHeading && <><Heading variant='normal' sx={{fontWeight:'bold'}}>{item.subHeading}</Heading> <br /> </>}

                            {item.text.map((texts, j) => {
                                if (texts.team) {
                                    return texts.p
                                } else {
                                    return (
                                        <div key={j}>
                                            {texts.p && <>
                                                <Text variant='normal'>{texts.p}</Text>

                                            </>}
                                            {texts.ul &&
                                                <>
                                                    <ul>
                                                        {texts.ul.map((list, k) => {
                                                            return <li key={k}>{list.li}</li>
                                                        })}
                                                    </ul>
                                                </>
                                            }
                                            <br />
                                            <br />
                                        </div>
                                    )
                                }

                            })}
                        </div>
                    )
                })}
            </Container>



        </>
    )
}

export default Privacy