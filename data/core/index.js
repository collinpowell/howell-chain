import { Shopping, Banking, Payment, Ticketing, RealEstate, ArtFun, Charity, Trading, Investment } from '../../UIKit/assets/Icons'
import Fly from '../../UIKit/assets/Core/fly.png'
import Cash from '../../UIKit/assets/Core/cash.png'
import Bike from '../../UIKit/assets/Core/bike.png'
import Shapes from '../../UIKit/assets/Core/shapes.png'

const forNow = 'Shop you favorite goods and quick and easy with our unique currency'

const CORE_DATA = {
    smallHeader: 'Join the Trend',
    heading: 'The Core of The Howell Blockchain',
    cards: [
        {
            icon: <Shopping />,
            heading: 'Shopping',
            body: forNow
        },
        {
            icon: <Banking />,
            heading: 'Banking',
            body: forNow
        },
        {
            icon: <Payment />,
            heading: 'Payment',
            body: forNow
        },
        {
            icon: <Ticketing />,
            heading: 'Ticketing',
            body: forNow
        },
        {
            icon: <RealEstate />,
            heading: 'Real Estate',
            body: forNow
        },
        {
            icon: <ArtFun />,
            heading: 'Art / Fun',
            body: forNow
        },
        {
            icon: <Investment />,
            heading: 'Investment',
            body: forNow
        },
        {
            icon: <Trading />,
            heading: 'Trading',
            body: forNow
        },
        {
            icon: <Charity />,
            heading: 'Charity',
            body: forNow
        },
    ],
    images: [
        { img: Fly.src, w: 310, h: 310 },
        { img: Cash.src, w: 212, h: 212 },
        { img: Bike.src, w: 300, h: 300 },
        { img: Shapes.src, w: 407, h: 186 }
    ],
}

export default CORE_DATA;
