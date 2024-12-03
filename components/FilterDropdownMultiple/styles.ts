import { MultiSelect } from 'react-multi-select-component';
import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const StyledMultiSelect = styled(MultiSelect)`
  .dropdown-container {
    border-radius: 60px !important;
    padding: 0px 14px 0px 14px !important;
    align-items: center;
    justify-content: center;
    justify-items: center;
    gap: 2px;
    background-color: #fff !important;
    border: 0.5px solid ${COLORS.midgray} !important;
    color: #fff;
    position: relative;
  }

  .dropdown-content {
    display: block !important;
    position: absolute !important;
    z-index: 10000 !important;
    top: 100%;
    color: ${COLORS.midgray};
  }

  .dropdown-heading {
    font-size: 0.75rem !important;
    padding: 0px !important;
  }

  .dropdown-heading-value {
    color: ${COLORS.midgray} !important;
  }

  // changing color of the default display text
  .gray {
    color: ${COLORS.midgray} !important;
  }
`;
