import { Container, Grid, Heading, Text } from 'theme-ui'
import LEARN_DATA from '../../../../data/learn'
import Card from '../../../components/JoinCard'
const Learn = () => {
    const { smallHeader, heading, cards } = LEARN_DATA
    return (
        <Container sx={styles.container}>
            <Text variant='normal' as='p' sx={styles.smallHeader}>{smallHeader}</Text>
            <Heading variant='border'>{heading}</Heading>
            <Grid sx={styles.grid}>
                {cards.map((card, i) => {
                    return (
                        <Card data={card} key={i} />
                    )
                })}
            </Grid>
        </Container>
    )
}

export default Learn

const styles = {
    container: {
        mt: '185px',
        h2: {
            mx: '20px',
            mb: '97px',
            textAlign: 'center',
        },
    },
    smallHeader: {
        mb: '27px',
        textAlign: 'center',
    },
    grid: {
        px: ['0',null,null,'35px'],
        gridGap: ['29px 29px', null, null, '32px 32px'],
        gridTemplateColumns: [
            'repeat(1,1fr)',
            null,
            null,
            'repeat(2,1fr)',
        ],
        div: {
            '&:nth-of-type(3)': {
                mt: ['initial', null, null, '-263px'],
            }
        }
    }
}