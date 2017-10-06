import React from 'react';
import PropTypes from 'prop-types';

export default function GridItem(props) {
  return (
    <div className="grid-item" onClick={() => props.selectObject(props.id)}>
      <img src={props.imageUri} alt={props.alternativeText} />
    </div>
  );
}

GridItem.propTypes = {
  id: PropTypes.string.isRequired,
  imageUri: PropTypes.string.isRequired,
  selectObject: PropTypes.func.isRequired,
  alternativeText: PropTypes.string,
};

GridItem.defaultProps = {
  alternativeText: '',
};
