import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import BodyClassName from 'react-body-classname';
import classnames from 'classnames';
import * as systemActions from '../actions/system';
import CloseModalButton from '../components/CloseModalButton';
import ObjectImage from '../components/ObjectImage';
import ObjectText from '../components/ObjectText';

class ObjectModal extends Component {
  render() {
    const { actions, activeObject, imageExpanded } = this.props;

    return (
      <TransitionGroup>
        {activeObject &&
        <CSSTransition classNames="fade" timeout={400} key={activeObject.id} in={!!activeObject}>
          <BodyClassName className="object-selected">
            <div className={classnames('object-modal', { 'image-expanded': imageExpanded })} onClick={actions.closeObject}>
              <div className="details" onClick={e => e.stopPropagation()}>
                <CloseModalButton closeObject={actions.closeObject} />
                <ObjectImage media={activeObject.media} toggleImageExpand={actions.toggleImageExpand} imageExpanded={imageExpanded} />
                <ObjectText title={activeObject.title} description={activeObject.description} />
              </div>
            </div>
          </BodyClassName>
        </CSSTransition>
        }
      </TransitionGroup>
    );
  }
}

ObjectModal.propTypes = {
  actions: PropTypes.object.isRequired,
  activeObject: PropTypes.object,
  imageExpanded: PropTypes.bool.isRequired,
};

ObjectModal.defaultProps = {
  activeObject: null,
};

function mapStateToProps({ system }) {
  return {
    activeObject: system.objects.find(object => object.id === system.activeObjectId),
    imageExpanded: system.activeObjectImageExpanded,
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
)(ObjectModal);
