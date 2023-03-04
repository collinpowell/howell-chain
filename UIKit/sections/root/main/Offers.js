import { Container, Box, Flex, Heading, Text } from 'theme-ui';
import icon1 from '../../../assets/images/offer1.png';
import icon2 from '../../../assets/images/offer2.png';
import icon3 from '../../../assets/images/offer3.png';
import icon4 from '../../../assets/images/offer4.png';
import icon5 from '../../../assets/images/offer5.png';
import Image from 'next/image'

const OFFER_DATA = {
    data: [
        {
            icon: icon1.src,
            text:
                'No code, no need to be get technical to launch your crypto project, we got you covered.',
        },
        {
            icon: icon2.src,
            text:
                'Safe, Secure and Audited for safe and secure investment',
        },
        {
            icon: icon3.src,
            text:
                'We help you market and expand your projects market scope.',
        },
        {
            icon: icon4.src,
            text:
                'AI powered, interactive, smart and efficient',
        },
        {
            icon: icon5.src,
            text:
                'Cost effective, create your tokens and launch and ICO for a little as $100',
        },
    ],
};

const AboutOffer = () => {
    const { data } = OFFER_DATA;
    return (
        <Box as="section" id="offer" sx={styles.section}>
            <Box sx={styles.heading}>
                <Heading>What we offer</Heading>
                <br />
                <br />
            </Box>
            <Container sx={styles.container}>
                <Flex sx={styles.row}>
                    {data.map(({ icon, text }, index) => (
                        <Box key={index} sx={styles.post}>
                            <Box sx={styles.imageWrap}>
                                <Image src={icon} width={100} height={100} alt="icon image" />
                            </Box>
                            <Text as="p">{text}</Text>
                        </Box>
                    ))}
                </Flex>
            </Container>
        </Box>
    );
};

export default AboutOffer;

const styles = {
    heading: {
        textAlign: 'center',
    },
    section: {
        py: ['20px', '30px', null, '50px', '85px', null, '105px', '125px', '140px'],
    },
    container: {
        position: 'relative',
    },
    row: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 5,
        justifyContent: 'center',
    },
    post: {
        mb: ['32px', null, null, null, 0],
        flex: ['0 0 100%', null, '0 0 50%', null, '0 0 25%'],
        textAlign: 'center',
        p: {
            maxWidth: '266px',
            mx: 'auto',
            mt: '20px',
            fontSize: ['14px', '15px'],
            lineHeight: 2,
            px: [null, null, null, null, '5px', 0],
        },
    },
    imageWrap: {
        display: 'flex',
        minHeight: ['auto', '83px'],
        alignItems: 'center',
        justifyContent: 'center',
        img: {
            width: ['75px', null, null, null, 'auto'],
        },
    },
};