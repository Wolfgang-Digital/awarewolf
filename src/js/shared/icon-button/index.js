import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'; 

const Button = styled.button`
  position: relative;
  padding: ${p => p.padding};
  background: ${p => p.background};
  color: ${p => p.color};
  border: ${p => p.border};
  border-radius: ${p => p.borderRadius};
  border-color: ${p => p.borderColour};

  > .tooltip {
    clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 50% 100%, 50% 75%, 0% 75%);
    position: absolute;
    transition: opacity .3s ease-in-out;
    border-radius: ${p => p.tooltipBorderRadius};
    background: ${p => p.tooltipBackground};
    padding: ${p => p.tooltipPadding};
    color: ${p => p.tooltipColour};
    top: ${p => p.tooltipTop};
    left: ${p => p.tooltipLeft};
    font-size: ${p => p.fontSize};
    opacity: 0;
  }

  &:hover {
    > .tooltip {
      opacity: ${p => p.showTooltip && 1};
    }
  }
`;

const IconButton = ({ icon: Icon , onClick, size, tooltip, ...rest }) => (
  <Button onClick={e => e.stopPropagation() & onClick()} showTooltip={!!tooltip} {...rest}>
    <div className='tooltip'>{ tooltip }</div>
    <Icon size={size} />
  </Button>
);

IconButton.defaultProps = {
  size: '3em',
  padding: '.5em',
  background: '#666',
  color: '#FFF',
  border: '1px solid',
  borderRadius: '4px',
  borderColour: 'orange',
  fontSize: '1em',
  tooltipColour: '#FFF',
  tooltipTop: '-60%',
  tooltipLeft: '-10%',
  tooltipPadding: '2px 2px 14px 2px',
  tooltipBorderRadius: '4px',
  tooltipBackground: '#999999'
};

IconButton.propTypes = {
  icon: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  tooltip: PropTypes.string,
  size: PropTypes.string
};

export default IconButton;