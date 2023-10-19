import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'What does Oasis do?',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        OASIS is an artificial intelligence for reading documents, questions and answers, along with an organizational platform where you can create groups and upload project documents and the area whether internal or not. All this locally for data security of the company and the areas thus speeding up the productivity and performance of information at work.
      </>
    ),
  },
  {
    title: 'Tchnologies used',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
      Our core technology uses Figma for design, Next.js and Prisma for the front-end, Python and FastAPI for the back-end, GPTForAll for AI, ChromaDB for data storage, and MySQL and PostgreSQL databases, all managed with Docker.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
