
import { Text, Box } from 'theme-ui'
import Image from 'next/image'
import { toBase64, shimmer } from './ImageLoader'


const BlogCard = ({ blog }) => {
    return (
        <a
            href="https://medium.com/@howreanetwork/what-you-probably-didnt-know-about-blockchain-technology-howrea-howrea-com-2f8950b93012"
            target="_blank"
            rel="noreferrer"
        >
            <Box variant='boxes.blogCard'>
                <Box>
                    <Image src={blog.image ? blog.image : `data:image/svg+xml;base64,${toBase64(shimmer(550, 364))}`} alt='Image' width={550} height={364} placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(550, 364))}`} />
                </Box>
                <Text variant='title' as='h4'>{blog.title}</Text>
                <Text variant='normal' as='p'>{blog.body}<strong>Read&nbsp;More...</strong></Text>
            </Box>
        </a>
    )
}

export default BlogCard