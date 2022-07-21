import { Button, Text, Box, Flex, Input } from 'theme-ui'

const NewLetter = ({data}) => {
    return (
        <Flex variant='boxes.newsLetter'>
            <Box>
                <Text variant='title' as='h4'>{data.heading}</Text>
                <Text variant='normal' as='p'>{data.body}</Text>
            </Box>
            <Flex>
                <Input type='email' placeholder='john@example.com' />
                <Button>Sign Up</Button>
            </Flex>
        </Flex>
    )
}

export default NewLetter