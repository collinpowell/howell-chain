import { Heading, Text, Box } from 'theme-ui'

const StatCard = ({ data }) => {
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <Box variant='boxes.stats'>
            <Heading variant='blockStats'>{numberWithCommas(data.number)}</Heading>
            <Text variant='normal' as='p'>{data.label}</Text>
        </Box>
    )
}

export default StatCard