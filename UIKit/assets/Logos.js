import { useThemeUI } from 'theme-ui'

export const HeaderLogo = () => {
    const { colorMode } = useThemeUI()
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="135" height="31" viewBox="0 0 135 31" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M119.084 30.75V0.594818H122.986V30.75H119.084ZM25.0948 2.30172H21.0308V14.5345H4.69332V2.30172H0.629272V30.75H4.69332V18.0702H21.0308V30.75H25.0948V2.30172ZM36.4954 29.5714C38.1752 30.5197 40.0989 30.9939 42.2663 30.9939C44.4067 30.9939 46.3168 30.5197 47.9966 29.5714C49.7035 28.6232 51.0311 27.3227 51.9794 25.67C52.9548 24.0173 53.4425 22.1207 53.4425 19.9803C53.4425 17.8128 52.9548 15.9163 51.9794 14.2906C51.0311 12.6379 49.7035 11.351 47.9966 10.4298C46.3168 9.48153 44.4067 9.00739 42.2663 9.00739C40.0989 9.00739 38.1752 9.48153 36.4954 10.4298C34.8156 11.351 33.488 12.6379 32.5126 14.2906C31.5373 15.9434 31.0496 17.8399 31.0496 19.9803C31.0496 22.0936 31.5373 23.9902 32.5126 25.67C33.488 27.3227 34.8156 28.6232 36.4954 29.5714ZM62.7945 30.75L54.7884 9.21059H58.4866L64.7421 26.3684L71.2477 9.21059H74.5396L80.9225 26.423L87.3413 9.21059H90.8364L82.7896 30.75H79.0507L72.8293 14.4329L66.5334 30.75H62.7945ZM97.6951 29.5714C99.4562 30.5197 101.488 30.9939 103.791 30.9939C105.579 30.9939 107.191 30.6958 108.627 30.0998C110.09 29.5037 111.31 28.6367 112.285 27.4988L110.131 24.9791C109.345 25.8461 108.424 26.4963 107.368 26.9298C106.338 27.3633 105.187 27.5801 103.913 27.5801C102.369 27.5801 101.001 27.2685 99.8084 26.6453C98.6163 26.0222 97.6816 25.1552 97.0042 24.0443C96.5243 23.2044 96.2214 22.2832 96.0957 21.2808H113.586C113.613 21.0911 113.626 20.8879 113.626 20.6712C113.653 20.4544 113.667 20.2648 113.667 20.1022C113.667 17.8805 113.206 15.9434 112.285 14.2906C111.391 12.6108 110.145 11.3103 108.546 10.3892C106.948 9.46798 105.105 9.00739 103.019 9.00739C100.96 9.00739 99.104 9.48153 97.4513 10.4298C95.8257 11.351 94.5387 12.6379 93.5904 14.2906C92.6693 15.9434 92.2087 17.8399 92.2087 19.9803C92.2087 22.1207 92.6828 24.0173 93.6311 25.67C94.6065 27.3227 95.9611 28.6232 97.6951 29.5714ZM96.0882 18.4766C96.2022 17.4929 96.4805 16.5988 96.923 15.7943C97.519 14.6835 98.3454 13.8301 99.402 13.234C100.459 12.6108 101.664 12.2993 103.019 12.2993C104.401 12.2993 105.606 12.6108 106.636 13.234C107.693 13.8301 108.519 14.67 109.115 15.7537C109.567 16.5756 109.84 17.4833 109.934 18.4766H96.0882ZM130.435 0.594818V30.75H134.337V0.594818H130.435ZM40.5333 17.3867L42.2278 12.1715L43.9223 17.3867H49.4059L44.9696 20.6098L46.6641 25.825L42.2278 22.6019L37.7915 25.825L39.486 20.6098L35.0497 17.3867H40.5333Z" fill={colorMode === 'default' ? 'black' : 'white'} />
        </svg>
    )
}

export const FooterLogo = () => {
    const { colorMode } = useThemeUI()
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="65" height="55" viewBox="0 0 65 55" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.038208 0.602539V54.4398H7.16653V30.3602H38.5541V54.4398H45.6825V0.602539H38.5541V24.5769H7.16653V0.602539H0.038208ZM64.4664 7.23482C64.4664 10.7899 61.3152 13.6719 57.428 13.6719C53.5409 13.6719 50.3897 10.7899 50.3897 7.23482C50.3897 3.67973 53.5409 0.797758 57.428 0.797758C61.3152 0.797758 64.4664 3.67973 64.4664 7.23482ZM57.6246 2.94335L56.4753 6.17818H52.7563L55.7651 8.17742L54.6158 11.4123L57.6246 9.41302L60.6333 11.4123L59.4841 8.17742L62.4928 6.17818H58.7738L57.6246 2.94335Z" fill={colorMode === 'default' ? 'black' : 'white'} />
        </svg>
    )
}

export const LearnLogo = () => {
    const { colorMode } = useThemeUI()
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="225" height="225" viewBox="0 0 225 225" fill="none">
            <g filter="url(#filter0_i_293_6869)">
                <path d="M26.9131 39.6163C67.167 -7.65172 138.117 -13.3378 185.385 26.916C232.653 67.1699 238.34 138.12 198.086 185.388C157.832 232.656 86.8814 238.343 39.6134 198.089C-7.65467 157.835 -13.3407 86.8843 26.9131 39.6163Z" fill="url(#paint0_radial_293_6869)" />
            </g>
            <g filter="url(#filter1_d_293_6869)">
                <path fillRule="evenodd" clipRule="evenodd" d="M79 81V146H87.5193V116.928H125.032V146H133.551V81H125.032V109.945H87.5193V81H79ZM156 89.0073C156 93.2995 152.234 96.779 147.588 96.779C142.943 96.779 139.177 93.2995 139.177 89.0073C139.177 84.7151 142.943 81.2355 147.588 81.2355C152.234 81.2355 156 84.7151 156 89.0073ZM147.823 83.8262L146.45 87.7318H142.005L145.601 90.1455L144.227 94.0511L147.823 91.6373L151.419 94.0511L150.045 90.1455L153.641 87.7318H149.197L147.823 83.8262Z" fill="white" />
            </g>
            <defs>
                <filter id="filter0_i_293_6869" x="0.0810547" y="0.0839844" width="224.837" height="224.837" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="16.5" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.844 0 0 0 0 0.5125 0 0 0 0 1 0 0 0 0.56 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_293_6869" />
                </filter>
                <filter id="filter1_d_293_6869" x="77.2348" y="81" width="84.0606" height="74.7084" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="1.76516" dy="6.17805" />
                    <feGaussianBlur stdDeviation="1.76516" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_293_6869" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_293_6869" result="shape" />
                </filter>
                <radialGradient id="paint0_radial_293_6869" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(186 174) rotate(-141.44) scale(241.271 214.882)">
                    <stop stopColor="#45122B" />
                    <stop offset="0.692708" stopColor="#1B1200" />
                    <stop offset="0.880208" stopColor="#FFE7D1" />
                </radialGradient>
            </defs>
        </svg>
    )
}

