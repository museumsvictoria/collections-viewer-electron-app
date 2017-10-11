import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import Transition from 'react-transition-group/Transition';
import ImageExpandButton from '../components/ImageExpandButton';

const collapsedMaxWidth = 625;
const collapsedMaxHeight = 830;
const expandedMaxWidth = document.documentElement.clientWidth - 80;
const expandedMaxHeight = document.documentElement.clientHeight - 80;

export default class ObjectImage extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleExit(elem) {
    this.imageEl.style.maxWidth = '';
    this.imageEl.style.maxHeight = '';
    elem.style.transform = '';
  }

  handleEnter(elem) {
    this.imageEl.style.maxWidth = `${expandedMaxWidth}px`;
    this.imageEl.style.maxHeight = `${expandedMaxHeight}px`;
    elem.style.transform = `translateX(${((document.documentElement.clientWidth - this.imageEl.clientWidth) / 2) - this.imageEl.x}px)`;
  }

  render() {
    const { media, toggleImageExpand, imageExpanded } = this.props;
    const imageExpandButtonDisabled = media.medium.width <= collapsedMaxWidth && media.medium.height <= collapsedMaxHeight;

    return (
      <Transition timeout={0} in={imageExpanded} onExit={this.handleExit} onEnter={this.handleEnter}>
        <div className="image">
          <div className="container" onClick={() => { if (!imageExpandButtonDisabled) toggleImageExpand(); }}>
            {!imageExpandButtonDisabled && <ImageExpandButton toggleImageExpand={toggleImageExpand} imageExpanded={imageExpanded} />}
            <img src={media.medium.uri} alt={media.alternativeText} ref={(el) => { this.imageEl = el; }} />
          </div>
        </div>
      </Transition>
    );
  }
}

ObjectImage.propTypes = {
  media: PropTypes.object.isRequired,
  toggleImageExpand: PropTypes.func.isRequired,
  imageExpanded: PropTypes.bool.isRequired,
};
