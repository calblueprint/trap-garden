import { MultiSelect } from 'react-multi-select-component';
import styled from 'styled-components';

export const StyledMultiSelect = styled(MultiSelect)`
  .dropdown-container {
    border-radius: 60px; !important
    padding: 8px 14px 8px 14px; !important
    align-items: center;
    justify-content: center;
    justify-items: center;
    gap: 2px;
    background-color: #1f5a2a; !important
    border: 0.5px solid #888; !important
    color: #fff;
    position: relative;
  }

  .dropdown-content {
    display: block; !important
    position: absolute; !important
    z-index: 10000; !important
    top: 100%;
  }
`;
