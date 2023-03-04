import { Box, Heading, Text, Grid } from 'theme-ui'
import Card from '../../../components/CoreCard'
const CoreCards = ({ smallHeader, heading, cards }) => {
    return (
        <Box sx={styles.box}>
            <Heading variant='border' sx={styles.heading}>{heading}</Heading>
            <br />
            <br />
            <Grid sx={styles.grid}>
                {cards.map((card, i) => {
                    return (
                        <Card data={card} key={i} />
                    )
                })}
            </Grid>
        </Box>
    )
}

export default CoreCards

const styles = {
    box: {
        textAlign: ['center', null, null, 'center'],
    },
    smallHeader: {
        mb: '25px'

    },
    heading: {
        mx: 'auto',
        mb: '25px',
    },
    grid: {
        gridGap: ['35px 15px', null, null, null, null, '47px 74px'],
        gridTemplateColumns: [
            'repeat(2,1fr)',
            null,
            'repeat(2,1fr)',
            null,
            'repeat(3,1fr)',
        ],
    },
};