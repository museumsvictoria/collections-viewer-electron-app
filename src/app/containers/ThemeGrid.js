import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import * as systemActions from '../actions/system';
import ObjectGrid from './ObjectGrid';

class ThemeGrid extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { objects, actions } = this.props;

    return (
      <div className="theme-grid">
        {objects && objects.map(theme =>
          (<div key={theme.title}>
            <h2>{theme.title}</h2>
            <ObjectGrid items={theme.items} selectObject={actions.selectObject} />
          </div>),
        )}
      </div>
    );
  }
}

ThemeGrid.propTypes = {
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
)(ThemeGrid);
