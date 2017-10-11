import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import BodyClassName from 'react-body-classname';
import autoBind from 'react-autobind';
import nl2br from 'nl2br';
import classnames from 'classnames';
import * as systemActions from '../actions/system';
import CloseModalButton from '../components/CloseModalButton';
import ObjectImage from '../components/ObjectImage';

class ObjectModal extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      transitioning: false,
    };
  }

  render() {
    const { actions, activeObject, imageExpanded } = this.props;

    return (
      <TransitionGroup>
        {activeObject &&
        <CSSTransition classNames="fade" timeout={{ enter: 400, exit: 300 }} key={activeObject.id} in={!!activeObject}>
          <BodyClassName className="object-selected">
            <div className={classnames('object-modal', { 'image-expanded': imageExpanded })} onClick={actions.closeObject}>
              <div className="details" onClick={e => e.stopPropagation()}>
                <CloseModalButton closeObject={actions.closeObject} />
                <ObjectImage media={activeObject.media} toggleImageExpand={actions.toggleImageExpand} imageExpanded={imageExpanded} />
                <div className="text">
                  <h1>{activeObject.title}</h1>
                  <div className="description" dangerouslySetInnerHTML={{ __html: nl2br(activeObject.description) }} />
                </div>
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
