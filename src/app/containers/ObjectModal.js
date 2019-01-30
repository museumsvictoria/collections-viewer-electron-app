import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
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
  constructor(props) {
    super(props);
    autoBind(this);
  }

  findActiveObject() {
    const { objects, activeObjectId } = this.props;

    for (const theme of objects) {
      const foundItem = theme.items.find(item => item.id === activeObjectId);

      if (foundItem) {
        return foundItem;
      }
    }

    return null;
  }

  render() {
    const { actions, imageExpanded } = this.props;

    const activeObject = this.findActiveObject();

    return (
      <TransitionGroup>
        {activeObject &&
        <CSSTransition classNames="fade" timeout={{ enter: 800, exit: 500 }} key={activeObject.id} in={!!activeObject}>
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
  objects: PropTypes.array.isRequired,
  activeObjectId: PropTypes.string,
  imageExpanded: PropTypes.bool.isRequired,
};

ObjectModal.defaultProps = {
  activeObjectId: null,
};

function mapStateToProps({ system }) {
  return {
    objects: system.objects,
    activeObjectId: system.activeObjectId,
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
