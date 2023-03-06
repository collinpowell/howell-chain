import { Button, Box } from "theme-ui"
import { ArrowRight } from "../assets/Icons"
const ScrollTopView = (props) => {
    const { onScroll, onVisbile, visible } = props

    //console.log(visible)
    if (typeof window === 'object') window.addEventListener('scroll', onVisbile)

    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    zIndex: '2000 !important',
                    bottom: 140,
                    right: [15, 40, null, 50]
                }}>
                <Button
                    onClick={onScroll}
                    sx={{
                        display: visible ? 'inline-block' : 'none', borderRadius: '50%',
                        background: 'rgba(153, 169, 255, 0.1452)',
                        transform: 'rotate(-90deg)',
                        px: '15px !important',
                        '&:hover': {
                            transform: 'rotate(-90deg)',
                        }
                    }}
                >
                    <ArrowRight />
                </Button>
            </Box>
        </>
    )
}

export default ScrollTopView