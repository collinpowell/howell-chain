import { Container,Box,useColorMode } from 'theme-ui'
import NewsLetterCard from '../../../components/NewLetter'
import data from '../../../../data/newsLetter'
import Image from 'next/image'
import { toBase64, shimmer } from '../../../components/ImageLoader'
import BackImg from '../../../assets/Others/newLetterDark.png'
import BackImg1 from '../../../assets/Others/newLetterLight.png'
const NewsLetter = () => {
  const [colorMode, setColorMode] = useColorMode()

    const w = 1440;
    const h = 350;
    return (
        <Box sx={styles.major}>

            <Container sx={styles.container}>
                <NewsLetterCard data={data} />
            </Container>
            <Box sx={styles.bgImg}>
                <Image src={colorMode === 'dark' ? BackImg.src : BackImg1.src} alt='Image' width={w} height={h} placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`} />
            </Box>
        </Box>
    )
}

export default NewsLetter

const styles = {
    major: {
        position: 'relative'
    },
    bgImg: {
        position: 'absolute',
        top: 0,
        zIndex: -1,
        mt: '-185px'
    },
    container: {
        mt: '185px'
    },
}