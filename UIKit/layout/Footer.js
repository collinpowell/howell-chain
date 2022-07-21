/** @jsxImportSource theme-ui */
import { Box, Heading, Text, Flex, Container, Link, useColorMode } from 'theme-ui'
import FOOTER_DATA from '../../data/footer'
import { FooterLogo } from '../assets/Logos'
import { Facebook, Twitter, Telegram, Youtube, Instagram, Linkedin } from '../assets/Socials'

const Footer = () => {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <Box as="footer" sx={styles.footer}>
      <hr />
      <Container>
        <Flex sx={styles.logoCol}>
          <Box sx={styles.logo} onClick={(e) => {
            setColorMode(colorMode === 'default' ? 'dark' : 'default')
          }}>
            <FooterLogo />
          </Box>
          <Flex sx={styles.row}>
            {FOOTER_DATA.map(({ title, menuItem }, index) => (
              <Box sx={styles.widget} key={`footer-widget-key-${index}`}>
                <Heading>{title}</Heading>
                <ul>
                  {menuItem.map(({ link, label }, index) => (
                    <li key={`footer-menu-item-key-${index}`}>
                      <Link href={link}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </Box>
            ))}
          </Flex>
        </Flex>

        <Flex sx={styles.bottom}>
          <Text as="p">COPYRIGHT © 2021&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;Privacy</Text>
          <Flex sx={styles.socials} >
            <a href="https://www.facebook.com/nodexihub/" target="_blank" rel="noreferrer"><Facebook /></a>
            <a href="https://www.instagram.com/p/COvyae_JkAY/?utm_medium=copy_link" target="_blank" rel="noreferrer"><Instagram /></a>
            <a href="https://twitter.com/nodexihub?s=09" target="_blank" rel="noreferrer"><Twitter /></a>
            <a href="https://www.linkedin.com/company/nodex-ihub" target="_blank" rel="noreferrer"><Linkedin /></a>
            <a href="https://www.linkedin.com/company/nodex-ihub" target="_blank" rel="noreferrer"><Telegram /></a>
            <a href="https://www.linkedin.com/company/nodex-ihub" target="_blank" rel="noreferrer"><Youtube /></a>
          </Flex>
        </Flex>

      </Container>


    </Box>
  )
}

export default Footer

const styles = {
  footer: {
    bg: 'transparent',
    mt: ['65px', null, '75px', null, '90px'],
    pt: ['55px', null, '55px', null, '60px'],
    pb: ['25px', null, '35px', '25px', '35px'],
    textAlign: ['center', null, null, 'left'],
    hr: {
      opacity: 0.5, mx: '5%', my: '85px',
    }
  },
  row: {
    display: 'flex',
    width: ['100%', null, null, '70%'],
    flexDirection: ['column', null, null, 'row'],
    textAlign: ['center', null, null, 'left'],
    justifyContent: 'space-between',
  },
  logoCol: {
    flexDirection: ['column', 'column', null, null, 'row'],
    justifyContent: 'space-between',
  },
  logo: {
    marginTop: '10px',
     width: ['100%', null, null, '30%'],
     mb:['25px', null, null,'0'],
      svg: { 
        ml: ['0', null, null, '111px'] 
      }
  },
  widget: {
    mb: ['33px', null, null, '45px', '45px'],
    ml: 'auto',
    mr: 'auto',
    h2: {
      m: 0,
      lineHeight: 1.35,
      fontSize: ['17px', null, '18px'],
      letterSpacing: '-0.5px',
      fontWeight: 'bold',
    },
    ul: {
      mt: 10,
      p: 0,
      listStyle: 'none',
      mt: ['20px', null, null, '25px', '30px'],
      li: {
        mt: ['10px', null, '12px'],
      },
      a: {
        display: 'block',
        opacity: 0.8,
        fontSize: '14px',
        lineHeight: 1.7,
        transition: 'all 500ms ease',
        '&:hover': {
          opacity: 1,
        },
      },
    },
  },
  socials: {
    display: 'flex',
    mb: ['25px', null, null, '0'],
    justifyContent: ['center', null, null, 'left'],
    a: { mx: '5px' }
  },
  bottom: {
    mt: '55px',
    justifyContent: 'space-between',
    flexDirection: ['column-reverse', null, null, 'row'],
  }
};
