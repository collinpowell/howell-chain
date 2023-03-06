import Head from 'next/head';

export default function Seo({
  description = 'Howrea Launchpad, Deploy your token on BSC,ETH,LOOP and all othe evm supported chain, take your project to the top with our platform, Host and ICO on our platform safe and secure for investors and project owners',
  author = 'Howrea Developer',
  meta,
  title = 'Launchpad | Home',
}) {
  const metaData = [
    {
      name: `description`,
      content: description,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: description,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: description,
    },
  ].concat(meta);
  return (
    <Head>
      <title>{title}</title>
      {metaData.map(({ name, content }, i) => (
        <meta key={i} name={name} content={content} />
      ))}
    </Head>
  );
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
};
