import { Button, Text, Box } from 'theme-ui'
import { ArrowRight } from '../assets/Icons'
import Image from 'next/image'
import { toBase64, shimmer } from '../components/ImageLoader'
const JoinCard = ({ data }) => {
  return (

    <Box variant='boxes.joinCard' sx={{
      height: ['fit-content', null, null, data.h], position: 'relative', '.noMobile': {
        display: ['none', null, null, 'block']
      }
    }}>
      <Text variant='biggerTitle' as='h4'>{data.heading}</Text>
      <Text variant='normal' as='p'>{data.body}</Text>
      <a
        href={data.link}
        target="_blank"
        rel="noreferrer"
      >
        <Button variant='border'><ArrowRight /></Button>
      </a>

      {data.icon.map(({ img, w, h, mobile }, i) => {
        return (
          <Box key={i} sx={styles.pic} className={mobile ? 'mobile' : 'noMobile'}>
            <Image src={img ? img : `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`} alt='Image' width={w} height={h} placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`} />
          </Box>

        )
      })}
    </Box>
  )
}

export default JoinCard

const styles = {
  pic: {
    position: ['relative', null, null, 'absolute'],
    bottom: '0',
    '&:nth-of-type(2)': {
      right: '0',
      zIndex: -1
    },
    '&:nth-of-type(1)': {
      left: '0',
      ml: '23px',
      zIndex: -1

    },
  },

}