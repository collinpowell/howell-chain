import FRESH_DATA from '../../../../data/fresh/index'
import { Container, Button, Heading, Box, Text } from 'theme-ui'
import { LearnLogo } from '../../../assets/Logos'
import { ArrowRight } from '../../../assets/Icons'
import { Orbit } from '../../../../UIKit/assets/Backgrounds'

const Fresh = () => {
  const { heading, body } = FRESH_DATA
  return (
    <Container sx={styles.container}>
      <Box sx={styles.content}>
        <Heading variant='border'>{heading}</Heading>
        <Text variant='normal' as='p'>{body}</Text>
        <Button>Learn&nbsp;&nbsp;<ArrowRight /></Button>
      </Box>
      <Box sx={styles.image}>
        <LearnLogo />
        <Orbit />
      </Box>
    </Container>
  )
}

export default Fresh

const styles = {
  container: {
    mt: '185px',
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: ['column', null, null, 'row'],
    button: {
      mt: '35px',
      svg: {
        path: {
          fill: 'background'
        }
      }
    }
  },
  content: {
    textAlign: ['center', null, null, 'left'],
    mb: ['125px', null, null, '0'],
    maxWidth: ['100%', null, null, '355px', '540px', '595px', null, '650px'],
    h2: {
      mb: '23px',
      mx: ['20px','auto',null,'0'],
      padding: '5px',
    }
  },
  image: {
    position: 'relative',
    width: [
      null,
      null,
      null,
      'calc(100% - 355px)',
      'calc(100% - 540px)',
      'calc(100% - 595px)',
      null,
      'calc(100% - 650px)',
    ],
    textAlign: ['center'],
    svg: {
      m: 'auto',
      '&:nth-of-type(2)':{
        position: 'absolute',
        top: 0,
        left: 0,
        mt: ['-1395px',null,null,'-1465px'],
        ml: '-1155px',
        zIndex: -1
      }
    }

  },
}