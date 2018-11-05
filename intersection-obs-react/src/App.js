import React, { Component } from 'react';
import li from 'lorem-ipsum';
import styled, { css } from 'styled-components';

const Horizontal = styled.div`
  display: flex;
`;

const Navigation = styled.nav`
  margin: 30px;
`;

const Article = styled.div`
  overflow-y: scroll;
  height: 100vh;
`;

const Anchor = styled.a`
  display: block;
  margin-bottom: 10px;
  text-decoration: none;

  ${props =>
    props.selected
      ? css`
          border-bottom: 1px solid #000;
          font-weight: bold;
        `
      : null};
  }
`;

class App extends Component {
  state = {
    things: [
      {
        id: 'a',
        headline: 'React',
        text: li({ count: 50, units: 'sentences' }),
      },
      {
        id: 'b',
        headline: 'Redux',
        text: li({ count: 50, units: 'sentences' }),
      },
      {
        id: 'c',
        headline: 'GraphQL',
        text: li({ count: 50, units: 'sentences' }),
      },
    ],
    activeThing: { id: null, ratio: 0 },
  };

  rootRef = React.createRef();
  singleRefs = this.state.things.reduce((acc, value) => {
    acc[value.id] = {
      ref: React.createRef(),
      id: value.id,
      ratio: 0,
    };
    return acc;
  }, {});

  callback = entries => {
    entries.forEach(
      entry =>
        (this.singleRefs[entry.target.id].ratio = entry.intersectionRatio),
    );

    const activeThing = Object.values(this.singleRefs).reduce((acc, val) => {
      return val.ratio > acc.ratio ? val : acc;
    }, this.state.activeThing);

    if (activeThing.ratio > this.state.activeThing.ratio) {
      this.setState({ activeThing });
    }
  };

  observer = new IntersectionObserver(this.callback, {
    root: this.rootRef.current,
    threshold: new Array(101).fill(0).map((v, i) => i * 0.01),
  });

  componentDidMount() {
    Object.values(this.singleRefs).forEach(val =>
      this.observer.observe(val.ref.current),
    );
  }

  render() {
    return (
      <Horizontal>
        <Navigation>
          {this.state.things.map(thing => (
            <div key={thing.headline}>
              <Anchor
                href={`#${thing.id}`}
                selected={thing.id === this.state.activeThing.id}
              >
                {thing.headline}
              </Anchor>
            </div>
          ))}
        </Navigation>

        <Article ref={this.rootRef}>
          {this.state.things.map(thing => (
            <div
              key={thing.id}
              id={thing.id}
              ref={this.singleRefs[thing.id].ref}
            >
              <h1>{thing.headline}</h1>
              <p>{thing.text}</p>
            </div>
          ))}
        </Article>
      </Horizontal>
    );
  }
}

export default App;
