import { Text, Box } from 'theme-ui'

const CoreCard = ({data}) => {
    return (
        <Box variant='boxes.coreCard'>
            <Box variant='boxes.icon'>
                {data.icon}
            </Box>
            <Text variant='title' as='h4'>{data.heading}</Text>
            <Text variant='normal' as='p'>{data.body}</Text>
        </Box>
    )
}

export default CoreCard