import React from 'react';
import PropTypes from 'prop-types';
import { Overlay } from 'office-ui-fabric-react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

const overlayStyle = {
  background: 'white',
  zIndex: 1
};

const LoadingSpinner = ({ loading }) =>
  loading &&
  (
    <Overlay className="flex justify-center items-center" style={overlayStyle}>
      <Spinner
        size={SpinnerSize.large}
        label="Deleting book"
        ariaLive="assertive"
        labelPosition="right"
      />
    </Overlay>
  );

LoadingSpinner.defaultProps = {
  loading: false
};

LoadingSpinner.propTypes = {
  loading: PropTypes.bool
};

export default LoadingSpinner;