/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { Container, Grid } from 'theme-ui';
import TeamCard from './TeamCard';
import { Facebook, Twitter, Linkedin } from './Socials';

import Member1 from './Card/Group.png';
import CP from './cp.jpeg'

const data = [
  {
    id: 1,
    imgSrc: CP.src,
    altText: 'Collin Powell',
    title: 'Collin Powell',
    designation: 'CEO / Founder',
    socialProfile: [
      {
        id: 1,
        name: 'facebook',
        path: 'https://web.facebook.com/collin.powell.503/',
        icon: <Facebook />,
      },
      {
        id: 2,
        name: 'twitter',
        path: 'https://twitter.com/SMARTCONNECTCP',
        icon: <Twitter />,
      },
      {
        id: 3,
        name: 'linkedin',
        path: 'https://www.linkedin.com/in/collinskrubu/',
        icon: <Linkedin />,
      },
    ],
  },
  {
    id: 6,
    imgSrc: Member1.src,
    altText: 'Howrea',
    title: 'Howrea',
    designation: 'Community Manager',
    socialProfile: [
      {
        id: 1,
        name: 'facebook',
        path: '',
        icon: <Facebook />,
      },
      {
        id: 2,
        name: 'twitter',
        path: '',
        icon: <Twitter />,
      },
      {
        id: 3,
        name: 'linkedin',
        path: '',
        icon: <Linkedin />,
      },
    ],
  },
];

export default function TeamSection() {
  return (
    <section>
        <br />
      <Container>
        <Grid sx={styles.grid}>
          {data.map((item) => (
            <TeamCard
              key={`team--key${item.id}`}
              src={item.imgSrc}
              altText={item.altText}
              title={item.title}
              designation={item.designation}
              social={item.socialProfile}
            />
          ))}
        </Grid>
      </Container>
      <br />
      <br />
      <br />
    </section>
  );
}

const styles = {
  grid: {
    mt: [0, null, -6, null, -4],
    gridGap: ['35px 0px', null, 0, null, null, '30px 5px'],
    gridTemplateColumns: [
      'repeat(1,1fr)',
      null,
      'repeat(2,1fr)',
      null,
      'repeat(4,1fr)',
    ],
  },
};