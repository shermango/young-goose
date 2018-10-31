import React, { Component, Suspense } from 'react';

const StopWatch = React.lazy(() => import('./Stopwatch'));

class SuspenseLoader extends Component {
  state = {
    showStopWatch: false
  };

  lazyLoadInStopWatch = () => {
    this.setState(() => ({
      showStopWatch: true
    }));
  };

  render() {
    return (
      <div>
        <button onClick={this.lazyLoadInStopWatch}>Show the stop watch</button>
        <Suspense fallback={<div>Loading...</div>}>
          {this.state.showStopWatch ? <StopWatch /> : null}
        </Suspense>
      </div>
    );
  }
}

export default SuspenseLoader;
