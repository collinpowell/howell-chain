import React from 'react'
import {
    Twitter,
    Telegram,
    Youtube,
    Linkedin,
    Github, Medium, Discord
} from "../UIKit/assets/Socials";
import { Grid, Container, Heading } from 'theme-ui';
import SEO from '../components/SEO'
import Header from '../UIKit/layout/Header';

const Community = () => {
    return (
        <>
            <SEO title='Howrea Community' description='Be Part Of Our Vibrant Communities, stay upto date' />
      <Header />
            <Container sx={styles.con}>
                <Heading><span>Be Part Of Our Vibrant Communities</span> </Heading>
                <br />
                <br />
                <br />
                <br />
                <br />
                <Grid sx={styles.grid}>
                    <a
                        href="https://twitter.com/HowreaNetwork"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Twitter />
                    </a>
                    <a
                        href="https://www.youtube.com/@howreanetwork"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Youtube />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/howreanetwork/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Linkedin />
                    </a>
                    <a
                        href="https://github.com/howrea"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Github />
                    </a>
                    <a
                        href="https://medium.com/@howreanetwork"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Medium />
                    </a>
                    <a
                        href="https://discord.gg/ecBCWHweym"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Discord />
                    </a>
                    <a
                        href="https://t.me/howrians"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Telegram />
                    </a>
                </Grid>
            </Container>
            <br />
            <br />
            <br />
            <br />
        </>

    )
}

export default Community

const styles = {
    con: {
        textAlign: 'center',
        mt: '80px'
    },
    grid: {
        mt: [0, null, 0, null, 0],
        gridGap: ['35px 0px', null, 0, null, null, '30px 5px'],
        gridTemplateColumns: [
            'repeat(2,1fr)',
            null,
            'repeat(3,1fr)',
            null,
            'repeat(4,1fr)',
        ],
        'svg': {
            width: '100px',
            height: '100px'
        }
    },
};