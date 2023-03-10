import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='icon' href='/favicon.ico' />
          <meta
            name='description'
            content='Generate code or convert code to another programming language in seconds.'
          />
          <meta property='og:site_name' content='https://codegenie-roan.vercel.app/' />
          <meta
            property='og:description'
            content='Convert code to another programming language and code generator.'
          />
          <meta name="google-site-verification" content="I-NwiapDcZa0ZgpEwPg_CGOywwN4R_oHOjtg9GFyvgg" />
          <meta property='og:title' content='Codegenie' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='Codegenie' />
          <meta
            name='twitter:description'
            content='Generate code or convert code to another programming language in seconds.'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
