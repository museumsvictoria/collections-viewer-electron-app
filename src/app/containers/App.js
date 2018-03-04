import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import IdleTimer from 'react-idle-timer';
import scrollIntoView from 'scroll-into-view';
import * as systemActions from '../actions/system';
import ObjectGrid from './ObjectGrid';
import ObjectModal from './ObjectModal';

class App extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      isIdle: false,
    };
  }

  toggleIdle() {
    const { isIdle } = this.state;

    if (!isIdle) {
      scrollIntoView(this.el, {
        time: 250,
        align: {
          top: 0,
        },
        scrollLeft: false,
      });
    }

    this.setState({
      isIdle: !isIdle,
    });
  }

  render() {
    return (
      <IdleTimer timeout={4 * 60 * 1000} idleAction={this.toggleIdle} activeAction={this.toggleIdle}>
        <div ref={(el) => { this.el = el; }}>
          <ObjectGrid />
          <ObjectModal />
        </div>
      </IdleTimer>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(systemActions, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(App);
