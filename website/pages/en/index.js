/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')

const MarkdownBlock = CompLibrary.MarkdownBlock /* Used to read markdown */
const Container = CompLibrary.Container
const GridBlock = CompLibrary.GridBlock

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = '' } = this.props
    const { baseUrl, docsUrl } = siteConfig
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`
    const langPart = `${language ? `${language}/` : ''}`
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    )

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    )

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    )

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    )

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <img
            src="https://camo.githubusercontent.com/d2b82ac367f13457de87d390fe92b5ede1b10a27/68747470733a2f2f63646e2e7261776769742e636f6d2f6c69616e676368756e6e2f747970657363726970742d6e6f64652d736372697074732f313265313630302f2e7265736f75726365732f7465726d2e737667"
            width={600}
          />
          <PromoSection>
            <Button href="#try">Try It Out</Button>
            <Button href={docUrl('getting-started.html')}>Documentation</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    )
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props
    const { baseUrl } = siteConfig

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}
      >
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    )

    const FeatureCallout = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{ textAlign: 'center' }}
      >
        <h2>Create, build, test, and deploy</h2>
        <MarkdownBlock>
          {/* TNS makes it easy to create applications with one command, 
          and provides helpful tools like a development server that incrementally compiles your source code, 
          making it blazing fast to develop your application. */}
          TNS makes it easy to create, build, and test your Node.js applications
          with built-in tooling, like a development server that incrementally
          compiles your source code and runs your app.
        </MarkdownBlock>
      </div>
    )

    const TryOut = () => (
      <Block id="try">
        {[
          {
            title: 'Try it Out',
            content: `Ready to create an app? Run the following command in your terminal: 
              <br/><br/>
              \`\`\`
              npx typescript-node-scripts create <my_app>
              \`\`\``,
          },
        ]}
      </Block>
    )

    const BuildAndRun = () => (
      <Block>
        {[
          {
            content:
              'TNS provides a development server which compiles your source code incrementally, and then runs your application in the same terminal.',
            image: `${baseUrl}img/dev-server.png`,
            imageAlign: 'bottom',
            title: 'Compile and Run',
          },
        ]}
      </Block>
    )

    const HelpfulErrorMessages = () => (
      <Block>
        {[
          {
            content:
              'TNS outputs a prettified error message along with the source of the error, and silences other errors that cascade from the current error.',
            image: `${baseUrl}img/dev-server-error.png`,
            imageAlign: 'bottom',
            title: 'Distraction-free Error Messages',
          },
        ]}
      </Block>
    )

    const Test = () => (
      <Block>
        {[
          {
            content:
              'Jest ships out of the box. Run your tests and update your snapshots, all in interactive mode. ',
            image: `${baseUrl}img/test.png`,
            imageAlign: 'bottom',
            title: 'Test',
          },
        ]}
      </Block>
    )

    const Build = () => (
      <Block>
        {[
          {
            content:
              'Build a production ready, minified, and optimized bundle with one command',
            image: `${baseUrl}img/build.png`,
            imageAlign: 'bottom',
            title: 'Build',
          },
        ]}
      </Block>
    )

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content: 'TNS works out of the box, no configuration required',
            image: `${baseUrl}img/gear.svg`,
            imageAlign: 'top',
            title: 'Zero Config',
          },
          {
            content:
              'TNS supports TypeScript in addition to JavaScript sources',
            image: `${baseUrl}img/typescript.png`,
            imageAlign: 'top',
            title: 'TypeScript + Babel',
          },
          {
            title: 'Webpack',
            content:
              'TNS transforms your source files into a single bundle through Webpack with source maps, which makes it easy to deploy and debug.',
            image: `${baseUrl}img/webpack.svg`,
            imageAlign: 'top',
          },
        ]}
      </Block>
    )

    // const Showcase = () => {
    //   if ((siteConfig.users || []).length === 0) {
    //     return null;
    //   }

    //   const showcase = siteConfig.users
    //     .filter(user => user.pinned)
    //     .map(user => (
    //       <a href={user.infoLink} key={user.infoLink}>
    //         <img src={user.image} alt={user.caption} title={user.caption} />
    //       </a>
    //     ));

    //   const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

    //   return (
    //     <div className="productShowcaseSection paddingBottom">
    //       <h2>Who is Using This?</h2>
    //       <p>This project is used by all these people</p>
    //       <div className="logos">{showcase}</div>
    //       <div className="more-users">
    //         <a className="button" href={pageUrl('users.html')}>
    //           More {siteConfig.title} Users
    //         </a>
    //       </div>
    //     </div>
    //   );
    // };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <FeatureCallout />
          <Features />
          <BuildAndRun />
          <HelpfulErrorMessages />
          <Test />
          <Build />
          <TryOut />
        </div>
      </div>
    )
  }
}

module.exports = Index
