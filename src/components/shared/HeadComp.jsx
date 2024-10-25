import Head from "next/head";

const HeadComp = ({
  title = "Ecommerce Wbsite",
  description = "For building an Ecommerce Website",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <title>Create Next App</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeadComp;
