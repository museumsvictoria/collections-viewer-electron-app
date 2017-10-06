import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';
import classnames from 'classnames';
import * as systemActions from '../actions/system';
import GridItem from '../components/GridItem';

class ObjectGrid extends Component {
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
  }

  componentDidUpdate(prevProps) {
    // Add objects to isotope and kick off imagesloaded once we recieve our API data
    if (this.props.objects && prevProps.objects.length === 0) {
      this.iso.reloadItems();

      this.imagesLoaded = imagesLoaded('.object-grid');
      this.imagesLoaded.on('done', this.allImagesLoaded);
    }
  }

  allImagesLoaded() {
    this.iso.arrange();
    this.setState({ allImagesLoaded: true });
  }

  render() {
    const { objects, actions } = this.props;
    const { allImagesLoaded } = this.state;

    return (
      <div className={classnames('object-grid', { loaded: allImagesLoaded })} ref={(objectGrid) => { this.objectGrid = objectGrid; }}>
        <div className="grid-sizer" />
        {objects && objects.map(object =>
          <GridItem key={object.id} id={object.id} imageUri={object.media.medium.uri} alternativeText={object.media.medium.alternativeText} selectObject={actions.selectObject} />,
        )}
      </div>
    );
  }
}

ObjectGrid.propTypes = {
  objects: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps({ system }) {
  return {
    objects: system.objects,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(systemActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ObjectGrid);
