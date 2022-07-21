import CI11 from '../../UIKit/assets/Card/SuperToroid.png'
import CI12 from '../../UIKit/assets/Card/Saly3.png'
import CI21 from '../../UIKit/assets/Card/Saly1.png'
import CI22 from '../../UIKit/assets/Card/Group.png'
import CI31 from '../../UIKit/assets/Card/RoundCube.png'
import CI32 from '../../UIKit/assets/Card/Saly2.png'
import CI41 from '../../UIKit/assets/Card/Pill.png'
import CI42 from '../../UIKit/assets/Card/Saly4.png'

const h1 = '485.42px'
const h2 = '748px'


const LEARN_DATA = {
    smallHeader: 'The Howell ecosystem is thriving.',
    heading: 'Join the thriving and rapidly expanding ecosystem, which features world-class projects in a variety of industries',
    cards: [
        {
            icon: [
                { img: CI11.src, w: 97, h: 97, mobile: true },
                { img: CI12.src, w: 277, h: 277 },
            ],
            heading: 'Create an Account',
            h: h1,
            body: 'Get Started by creating your own wallet',
            link: 'https://near.nodexihub.com/',
        },
        {
            icon: [
                { img: CI21.src, w: 345, h: 345, mobile: true },
                { img: CI22.src, w: 176, h: 176 },
            ],
            h: h2,
            heading: 'Learn more about the howell network',
            body: 'Learn and read about the howell network',
            link: 'https://near.nodexihub.com/',

        },
        {
            icon: [
                { img: CI31.src, w: 113, h: 100 },
                { img: CI32.src, w: 350, h: 350, mobile: true },
            ],
            h: h2,
            heading: 'Join the community',
            body: 'We have a vibrant and passionate community with deep developer talents and lots of support, Join us and be part of shaping the future of the howell network',
            link: 'https://near.nodexihub.com/',

        },
        {
            icon: [
                { img: CI41.src, w: 45, h: 70, mobile: true },
                { img: CI42.src, w: 195, h: 162 },
            ],
            h: h1,
            heading: 'Build on the howell blockchain',
            body: 'The howell blockchain is EVM supported therefore dapps and all other applications can be built on the howell blockchain',
            link: 'https://near.nodexihub.com/',

        },
    ]
}

export default LEARN_DATA;
