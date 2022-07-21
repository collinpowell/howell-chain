import STATS_DATA from '../../../../data/hero'
import StatCard from '../../../components/StatCard'
import { Container, Flex } from 'theme-ui'
const Stats = () => {
    return (
        <Container>
            <Flex sx={styles.flex}>
                {STATS_DATA.map((data, i) => {
                    return( <StatCard data={data} key={i} />)
                })}
            </Flex>
        </Container>
    )
}

export default Stats

const styles = {
    flex:{
        justifyContent:'space-evenly',
        mt:'145px',
        flexDirection:['column',null,null,'row'],
        alignItems: 'center',
    }
}