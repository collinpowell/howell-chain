import StatCard from '../../../components/StatCard'
import { Container, Flex } from 'theme-ui'
const Stats = ({stats}) => {
    return (
        <Container>
            <Flex sx={styles.flex}>
                {stats.map((data, i) => {
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
        flexDirection:['column','column',null,null,'row'],
        alignItems: 'center',
    }
}