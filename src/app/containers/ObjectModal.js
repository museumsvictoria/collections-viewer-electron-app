import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import BodyClassName from 'react-body-classname';
import autoBind from 'react-autobind';
import nl2br from 'nl2br';
import * as systemActions from '../actions/system';
import CloseModalButton from '../components/CloseModalButton';
import FullscreenButton from '../components/FullscreenButton';

class ObjectModal extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { activeObject, actions } = this.props;
    return (
      <TransitionGroup>
        {activeObject &&
        <CSSTransition classNames="fade" timeout={{ enter: 500, exit: 300 }} key={activeObject.id}>
          <BodyClassName className="object-selected">
            <div className="object-modal" onClick={actions.closeObject}>
              <div className="details" onClick={e => e.stopPropagation()}>
                <CloseModalButton closeObject={actions.closeObject} />
                <div className="image">
                  <div className="container">
                    <FullscreenButton closeObject={actions.closeObject} />
                    <img src={activeObject.media.medium.uri} alt={activeObject.media.alternativeText} />
                  </div>
                </div>
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
};

ObjectModal.defaultProps = {
  activeObject: null,
};

function mapStateToProps({ system }) {
  return {
    activeObject: system.objects.find(object => object.id === system.activeObjectId),
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
