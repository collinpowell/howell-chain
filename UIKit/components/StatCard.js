import { Heading, Text, Box } from 'theme-ui'

const StatCard = ({ data }) => {
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <a href="https://bscscan.com/token/0x1c86738cAbcd4E37910468119ddF78817dC2125d" target="_blank"
            rel="noreferrer" >
            <Box variant='boxes.stats'>
                <Heading variant='blockStats'>{(data.number)}</Heading>
                <Text variant='normal' as='p'>{data.label}</Text>
            </Box>
        </a>

    )
}

export default StatCard