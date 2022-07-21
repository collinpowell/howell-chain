import { Container, Heading,Flex ,Button} from 'theme-ui'
import Card from '../../../components/BlogCard'
import data from '../../../../data/blogs'
import Slider from 'react-slick';
import { useRef } from 'react';
import { ArrowRight, ArrowLeft } from '../../../../UIKit/assets/Icons'


const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: false,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1,
                infinite: false,
            },
        },
        {
            breakpoint: 480,
            settings: {
                infinite: true,
                // autoplay: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1,
                infinite: false,
            },
        },
    ],
};

const Blogs = () => {
    const blogRef = useRef();
    const { heading, blogs } = data

    // Slide Handler for trending nft's
    const nextButtonBlog = () => {
        blogRef.current.slickNext();
    };
    const previousButtonBlog = () => {
        blogRef.current.slickPrev();
    };
    return (
        <Container sx={styles.container}>
            <Heading variant='border'>{heading}</Heading>
            <Slider ref={blogRef} {...sliderSettings}>
                {blogs.map((blog, i) => {
                    return (<Card blog={blog} key={i} />)
                })}
                {blogs.map((blog, i) => {
                    return (<Card blog={blog} key={i} />)
                })}
            </Slider>
            <Flex sx={styles.flex}>
                <Button variant='text' onClick={previousButtonBlog}><ArrowLeft /></Button>
                <Button variant='text' onClick={nextButtonBlog}><ArrowRight /></Button>
            </Flex>
        </Container>
    )
}

export default Blogs

const styles = {
    container: {
        overflow: 'hidden',
        mt: '185px',
        pt:'25px',
        h2: {
            textAlign: 'center',
            mb: '85px',
            mx: 'auto'
        }
    },
    flex: {
        width: '100%',
        mt:'55px',
        justifyContent: 'center',
        svg: {
            width:'46px',
            height:'16px',
            mx:'15px'
        }
    }
}