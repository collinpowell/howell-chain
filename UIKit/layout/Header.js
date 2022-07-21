import { DrawerProvider } from '../../contexts/drawer/drawer.provider';
import { Container, Box, Text, Flex, Button,useColorMode } from 'theme-ui';
import { HeaderLogo, FooterLogo } from '../../UIKit/assets/Logos'
import { DropdownIcon, ArrowRight } from '../../UIKit/assets/Icons'
import HEADER_DATA from '../../data/header'
import { Sun } from '../../UIKit/assets/Backgrounds'

const Header = () => {
  const [colorMode, setColorMode] = useColorMode()

  const { menuData } = HEADER_DATA

  return (
    <DrawerProvider>
      <header>
        <Sun/>
        <Container sx={styles.container}>
          <Box sx={styles.logo} onClick={(e) => {
            setColorMode(colorMode === 'default' ? 'dark' : 'default')
          }}>
            <HeaderLogo />
            <FooterLogo />
          </Box>
          <Flex sx={styles.nav}>
            {menuData.map(({ label }, i) => {
              return (
                <Box className='dropDownX' key={i}>
                  <Box variant='boxes.headerMenuItem'>
                    <Text variant='smaller' as='p'>{label}&nbsp;&nbsp;&nbsp;<DropdownIcon /></Text>
                  </Box>
                  <Box id='dropDown' variant='boxes.dropDown'></Box>
                </Box>
              )
            })}
          </Flex>
          <Button variant='text'>Get SHEER&nbsp;&nbsp;<ArrowRight /></Button>
        </Container>
      </header>
    </DrawerProvider>
  )
}

export default Header

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '88px',
    alignItems: 'center',
  },
  nav: {
    height: 'inherit',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    display: ['none', null, null, 'flex']
  },
  logo: {
    svg: {
      '&:nth-of-type(1)': {
        display: ['none', null, null, 'block']

      },
      '&:nth-of-type(2)': {
        display: ['block', null, null, 'none'],
        height: '45px'
      },
    }
  }
}