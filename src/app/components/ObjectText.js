import React from 'react';
import PropTypes from 'prop-types';
import nl2br from 'nl2br';

export default function ObjectText(props) {
  const { title, description } = props;

  return (
    <div className="text">
      <h1 dangerouslySetInnerHTML={{ __html: title }} />
      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: nl2br(description) }}
      />
    </div>
  );
}

ObjectText.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
