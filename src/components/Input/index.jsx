import React from 'react';
import { Input as ChakraInput } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Input = ({ name, placeholder, onChange, value, type = "text", ...props }) => {
  return (
    <ChakraInput
      {...props}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      marginBottom="2"
    />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default Input;
