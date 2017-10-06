import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';

class ObjectGrid extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.iso = new Isotope(this.objectGrid, {
      itemSelector: '.object-item',
      layoutMode: 'masonry',
      masonry: {
        columnWidth: '.grid-sizer',
      },
      transitionDuration: 0,
    });
  }

  componentDidUpdate() {
    if (this.props.objects) {
      this.iso.reloadItems();

      this.imagesLoaded = imagesLoaded('.object-item');
      this.imagesLoaded.on('done', this.allImagesLoaded);
    }
  }

  allImagesLoaded() {
    this.iso.arrange();
  }

  render() {
    const { objects } = this.props;
    return (
      <div className="object-grid" ref={(objectGrid) => { this.objectGrid = objectGrid; }}>
        <div className="grid-sizer" />
        {objects && objects.map(object =>
          (<div key={object.id} className="object-item">
            <img src={object.media.medium.uri} alt={object.media.alternativeText} />
          </div>))
        }
      </div>
    );
  }
}

ObjectGrid.propTypes = {
  objects: PropTypes.array.isRequired,
};

function mapStateToProps({ system }) {
  return {
    objects: system.objects,
  };
}

export default connect(
  mapStateToProps,
)(ObjectGrid);
