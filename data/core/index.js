import { Shopping, Banking, Payment, Ticketing, RealEstate, ArtFun, Charity, Trading, Investment } from '../../UIKit/assets/Icons'
import Fly from '../../UIKit/assets/Core/fly.png'
import Cash from '../../UIKit/assets/Core/cash.png'
import Bike from '../../UIKit/assets/Core/bike.png'
import Shapes from '../../UIKit/assets/Core/shapes.png'

const forNow = 'Shop you favorite goods and quick and easy with our unique currency'

const CORE_DATA = {
    smallHeader: 'Join the Trend',
    heading: 'The Core of The Howrea Blockchain',
    cards: [
        {
            icon: <Shopping />,
            heading: 'Shopping',
            body: forNow
        },
        {
            icon: <Banking />,
            heading: 'Banking',
            body: 'Explore the benefits of blockchain technology in banking.'
        },
        {
            icon: <Payment />,
            heading: 'Payment',
            body: 'Solutions for cross-border, decentralized, quick, and simple payments at your fingertips'
        },
        {
            icon: <Ticketing />,
            heading: 'Ticketing',
            body: 'Event ticketing with ease and security for event planners, organizers and attendees with the use of NFTs'
        },
        {
            icon: <ArtFun />,
            heading: 'Art / Fun',
            body: 'NFTs, rewards, the metaverse, and gaming'
        },
        {
            icon: <Investment />,
            heading: 'Investment',
            body: 'Project-driven, use-case-driven, and secure investment'
        },
        {
            icon: <Trading />,
            heading: 'Trading',
            body: 'Predict chart flows / market movements and earn cool cash'
        },
        {
            icon: <Charity />,
            heading: 'Charity',
            body: 'Our charitable endeavors are focused on addressing other peoples needs; we rise by helping others.'
        },
        {
            icon: <RealEstate />,
            heading: 'Education',
            body: 'Our educational platform is designed to spread knowledge.'
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
