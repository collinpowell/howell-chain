import { Container, Box, Heading, Text } from 'theme-ui'
import GLIDE_DATA from '../../../../data/glide'
import Image from 'next/image'
import { toBase64, shimmer } from '../../../components/ImageLoader'
import BackImg from '../../../assets/Others/glide.png'
import { keyframes } from '@emotion/react'

//const rotation = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } })
const scroll = keyframes({ from: { transform: 'translate3d(35%, 0, 0)'}, to: { transform: 'translate3d(-65%, 0, 0)' } })
const scrollDesk = keyframes({ from: { transform: 'translate3d(33%, 0, 0)'}, to: { transform: 'translate3d(-11%, 0, 0)' } })

const Glide = () => {
    const { smallHeader, heading, body, platforms } = GLIDE_DATA
    let elems = []
    let three = true
    const w = 1440;
    const h = 240;

    return (
        <Box sx={styles.major}>
            <Container sx={styles.container}>
                <Box variant='boxes.glide' sx={styles.box}>
                    <Box sx={styles.main}>
                        <Text variant='normal' as='p' sx={styles.smallHeader}>{smallHeader}</Text>
                        <Heading variant='border' sx={styles.heading}>{heading}</Heading>
                        <Text variant='normal' as='p' sx={styles.smallHeader}>{body}</Text>
                    </Box>
                    <Box sx={styles.platforms}>
                        <Box sx={{ width: 'fit-content',animation: [`${scroll} 15s linear infinite`,null,null,`${scrollDesk} 15s linear infinite`] }}>
                            {platforms.map(({ logo, tooltip, link }, i) => {
                                let tempElement = []
                                elems.push(<Box variant='boxes.platform' key={i}>
                                    {logo}
                                </Box>)

                                if (elems.length > 1) {
                                    if (three) {
                                        if (elems.length % 2 > 0) {
                                            tempElement = elems
                                            elems = []
                                            three = !three
                                            return (
                                                <Box sx={styles.platBoxes} key={i}>
                                                    {tempElement}
                                                </Box>
                                            )
                                        }
                                    } else {
                                        if (elems.length % 2 == 0) {
                                            tempElement = elems
                                            elems = []
                                            three = !three
                                            return (
                                                <Box sx={styles.platBoxes} key={i}>
                                                    {tempElement}
                                                </Box>
                                            )
                                        }
                                    }
                                }

                            })}
                        </Box>

                    </Box>

                </Box>
            </Container>
            <Box sx={styles.bgImg}>
                <Image src={BackImg.src} alt='Image' width={w} height={h} placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`} />
            </Box>
        </Box>

    )
}

export default Glide

const styles = {
    major: {
        position: 'relative',
    },
    bgImg: {
        position: 'absolute',
        top: 0,
        zIndex: -1,
        mt: '145px'
    },
    container: {
        mt: '185px'
    },
    box: {
        display: 'flex',
        flexDirection: ['column', null, null, 'row'],
        justifyContent: 'space-between'
    },
    main: {
        width: ['100%', null, null, '45%'],
        my: 'auto',
        pr: '15px',
        pl: ['15px', null,null, '0'],
        textAlign: ['center', null, null, 'left'],
        h2: {
            mb: '30px',
            mx: '20px'
        },
        p: {
            mb: '30px'
        }
    },
    platforms: {
        width: ['100%', null, null, '55%'],
        overflowX: 'auto',
    },
    platBoxes: { display: 'flex', justifyContent: 'center', mb: '10px' }
}