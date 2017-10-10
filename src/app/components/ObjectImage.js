import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import Transition from 'react-transition-group/Transition';
import FullscreenButton from '../components/FullscreenButton';

const collapsedMaxWidth = 625;
const collapsedMaxHeight = 830;
const fullscreenMaxWidth = document.documentElement.clientWidth - 80;
const fullscreenMaxHeight = document.documentElement.clientHeight - 80;

export default class ObjectImage extends Component {
  static handleEntered(elem) {
    elem.className = 'image fullsreen';
  }

  static handleExited(elem) {
    elem.className = 'image';
  }

  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      isFullscreen: false,
    };
  }

  toggleFullscreen() {
    this.setState({
      isFullscreen: !this.state.isFullscreen,
    });
  }

  handleExit(elem) {
    this.imageEl.style.maxWidth = '';
    this.imageEl.style.maxHeight = '';
    elem.style.transform = '';
  }

  handleEnter(elem) {
    this.imageEl.style.maxHeight = `${fullscreenMaxHeight}px`;
    this.imageEl.style.maxWidth = `${fullscreenMaxWidth}px`;
    elem.style.transform = `translateX(${((document.documentElement.clientWidth - this.imageEl.clientWidth) / 2) - this.imageEl.x}px)`;
  }

  render() {
    const { media } = this.props;
    const { isFullscreen } = this.state;
    const fullScreenButtonDisabled = media.medium.width <= collapsedMaxWidth && media.medium.height <= collapsedMaxHeight;
    return (
      <Transition
        in={isFullscreen}
        onExit={this.handleExit}
        onEnter={this.handleEnter}
        onEntered={this.handleEntered}
        onExited={this.handleExited}
      >
        <div className="image">
          <div className="container" onClick={this.toggleFullscreen}>
            {!fullScreenButtonDisabled && <FullscreenButton toggleFullscreen={this.toggleFullscreen} isFullscreen={isFullscreen} />}
            <img
              src={media.medium.uri}
              alt={media.alternativeText}
              ref={(el) => { this.imageEl = el; }}
            />
          </div>
        </div>
      </Transition>
    );
  }
}

ObjectImage.propTypes = {
  media: PropTypes.object.isRequired,
};
