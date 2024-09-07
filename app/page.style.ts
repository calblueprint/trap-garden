'use client';

import styled from 'styled-components';

export const Card = styled.div`
  color: ${({ theme }) => theme.colors.text};
`;

Card.defaultProps = {
  theme: {
    colors: {
      text: 'red',
    },
  },
};
