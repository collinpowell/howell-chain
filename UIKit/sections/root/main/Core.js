import CoreCards from '../sub/CoreCards'
import { Container, Box } from 'theme-ui'
import Image from 'next/image'
import { toBase64, shimmer } from '../../../components/ImageLoader'
import CORE_DATA from '../../../../data/core'
import {Core as CoreBg} from '../../../assets/Backgrounds'

const Core = () => {
    const { smallHeader, heading, cards, images } = CORE_DATA

    return (
        <Box sx={{position:'relative'}}>
            <CoreBg/>
            <Container sx={styles.container}>
                <Box sx={styles.images}>
                    {images.map(({ img, w, h }, i) => {
                        return (
                            <Box>
                                <Image src={img ? img : `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`} alt='Image' width={w} height={h} placeholder="blur"
                                    key={i} blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`} />
                            </Box>

                        )
                    })}
                </Box>
                <CoreCards smallHeader={smallHeader} heading={heading} cards={cards} />
            </Container>
        </Box>

    )
}

export default Core

const styles = {
    container: {
        mt: ['385px', null, null, '255px'],
        display: 'flex',
        justifyContent: ['center', null, null, 'space-between'],
        position: 'relative',
        // svg: {
        //     position: 'absolute',
        //     zIndex: -3
        // }
    },
    images: {
        display: 'flex',
        position: ['absolute', null, null, 'relative'],
        flexDirection: 'column',
        justifyContent: 'space-between',
        img: {
            width: 'fit-content !important',
            height: 'fit-content !important',
            minWidth: 'fit-content !important',
            maxWidth: 'fit-content !important',
            maxHeight: 'fit-content !important',
            minHeight: 'fit-content !important',
        },
        span: {

            width: 'fit-content !important',
            height: 'fit-content !important',
            minWidth: 'fit-content !important',
            maxWidth: 'fit-content !important',
            maxHeight: 'fit-content !important',
            minHeight: 'fit-content !important',
        },
        div: {
            '&:nth-of-type(1)': {
                mt: ['-285px !important', null, null, '-155px !important'],
                zIndex: '-1'

            },
            '&:nth-of-type(2)': {
                mt: ['1285px !important', null, null, '0  !important'],
                ml: ['175px !important', null, null, '0  !important'],
                zIndex: '-1'

            },
            '&:nth-of-type(3)': {
                ml: ['155px !important', null, null, '0  !important'],
                zIndex: '-1'

            },
            '&:nth-of-type(4)': {
                position: 'absolute !important',
                bottom: '0 !important',
                mb: '155px !important',
                ml: ['195px !important', null, null, '0  !important'],
                zIndex: '-2'
            },
        }
    }
}