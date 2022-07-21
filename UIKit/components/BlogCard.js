
import { Text, Box } from 'theme-ui'
import Image from 'next/image'
import { toBase64, shimmer } from './ImageLoader'


const BlogCard = ({ blog }) => {
    return (
        <Box variant='boxes.blogCard'>
            <Box>
                <Image src={blog.image ? blog.image : `data:image/svg+xml;base64,${toBase64(shimmer(550, 364))}`} alt='Image' width={550} height={364} placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(550, 364))}`} />
            </Box>
            <Text variant='title' as='h4'>{blog.title}</Text>
            <Text variant='normal' as='p'>{blog.body}<a href="/" target="_blank" rel="noreferrer"><strong>Read&nbsp;More...</strong></a></Text>
        </Box>
    )
}

export default BlogCard