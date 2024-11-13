import styled from 'styled-components';

const BigButton = styled.button<{ $color?: string }>`
  background-color: ${props => props.color || 'blue'};

  color: white;
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 3.125rem;
  cursor: pointer;
  width: 100%;
  height: 3rem;
  max-height: 3rem;
`;

export default BigButton;
