import React from "react";
import clsx from "clsx";
// import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import styled from 'styled-components'
import styles from "./index.module.css";

const Poetry  = styled.div`
  display: flex;
  width: 300px;
  flex-direction: column;
  align-self: center;
  width: max-content;
  user-select: none;
  justify-content: center;
  padding-top: 36px;
  color: #333;
  p {
    line-height: 1.5em;
  }
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items:center;
  flex: 1;
  background-color: ghostwhite;
`




function HomepageHeader({top}) {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)} style={{backgroundImage: "url('/bg.jpeg')", backgroundColor: 'transparent', color: 'white', backgroundSize: 'cover', backgroundPosition: `center ${top ? 15 : 85 }%`, flex: 2 }}>
      <div className="container">
        {/* <h1 className="hero__title">{siteConfig.title}</h1> */}
        {/* <p className="hero__subtitle">{siteConfig.tagline}</p> */}
        {/* <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div> */}
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader top={true} />
      <Main>
        {/* <HomepageFeatures /> */}
        <Poetry>
          <h3 style={{alignSelf: 'center'}}>青玉案 · 元夕</h3>
          <h5 style={{alignSelf: 'flex-end'}}>辛弃疾</h5>
          <p >东风夜放花千树，更吹落、星如雨。</p>
          <p>宝马雕车香满路。凤箫声动，玉壶光转，一夜鱼龙舞。</p>
          <p>蛾儿雪柳黄金缕，笑语盈盈暗香去。</p>
          <p>众里寻他千百度，蓦然回首，那人却在，灯火阑珊处。</p>
        </Poetry>
      </Main>
      <HomepageHeader top={false} />
    </Layout>
  );
}
