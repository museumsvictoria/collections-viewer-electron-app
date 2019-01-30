import React from 'react';
import PropTypes from 'prop-types';

export default function GridItem(props) {
  const { id, media, minWidth, selectObject } = props;
  let uri;

  if (media.small.width >= minWidth) {
    uri = media.small.uri;
  } else if (media.medium.width >= minWidth) {
    uri = media.medium.uri;
  } else {
    uri = media.large.uri;
  }

  return (
    <div className="grid-item" onClick={() => selectObject(id)}>
      <img src={uri} alt={media.alternativeText} />
    </div>
  );
}

GridItem.propTypes = {
  id: PropTypes.string.isRequired,
  media: PropTypes.object.isRequired,
  minWidth: PropTypes.number,
  selectObject: PropTypes.func.isRequired,
};

GridItem.defaultProps = {
  minWidth: 375,
};
