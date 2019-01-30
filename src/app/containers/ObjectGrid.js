import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';
import classnames from 'classnames';
import GridItem from '../components/GridItem';

export default class ObjectGrid extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      allImagesLoaded: false,
    };
  }

  componentDidMount() {
    this.iso = new Isotope(this.objectGrid, {
      itemSelector: '.grid-item',
      layoutMode: 'masonry',
      masonry: {
        columnWidth: '.grid-sizer',
      },
      transitionDuration: 0,
    });

    this.imagesLoaded = imagesLoaded('.object-grid');
    this.imagesLoaded.on('done', this.allImagesLoaded);
  }

  allImagesLoaded() {
    this.iso.arrange();
    this.setState({ allImagesLoaded: true });
  }

  render() {
    const { items, selectObject } = this.props;
    const { allImagesLoaded } = this.state;

    return (
      <div className={classnames('object-grid', { loaded: allImagesLoaded })} ref={(objectGrid) => { this.objectGrid = objectGrid; }}>
        <div className="grid-sizer" ref={(el) => { this.gridSizerEl = el; }} />
        {items && items.map(item =>
          <GridItem key={item.id} id={item.id} media={item.media} minWidth={this.gridSizerEl ? this.gridSizerEl.clientWidth : null} selectObject={selectObject} />,
        )}
      </div>
    );
  }
}

ObjectGrid.propTypes = {
  items: PropTypes.array.isRequired,
  selectObject: PropTypes.func.isRequired,
};
