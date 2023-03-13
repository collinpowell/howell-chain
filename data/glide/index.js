import { HeaderLogo,FooterLogo } from '../../UIKit/assets/Logos'
import { TDH } from '../../UIKit/assets/Platforms'


const dummyLogo = <HeaderLogo/>;
const dummyTooltip = 'Hi Visit Me!';
const dummyLink = 'http://wallet.howrea.com';

const GLIDE_DATA ={
    smallHeader:'Our Core Platforms',
    heading:'Glide into our fantastic platforms',
    body:'Take advantage of our fantastic platforms, powered by the Howrea blockchain: Excellent user experience, quick and simple payment methods, lots of gifts and rewards, and premium services',
    platforms:[
        {
            logo:<TDH/>,
            tooltip:  'Hi Visit Me!',
            link:'https://tdh.howrea.com'
        },
        {
            logo:<FooterLogo/>,
            tooltip: dummyTooltip,
            link:'https://lp.howrea.com'
        },
        {
            logo:dummyLogo,
            tooltip: dummyTooltip,
            link:'https://nft.howrea.com'
        },
        {
            logo:<FooterLogo/>,
            tooltip: dummyTooltip,
            link:dummyLink
        },
        {
            logo:dummyLogo,
            tooltip: dummyTooltip,
            link:'https://store.howrea.com'
        }
    ]
}

export default GLIDE_DATA;
