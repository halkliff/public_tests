import styled from 'styled-components';

export interface FormGridSectionProps {
  spacing?: string;
}

export default styled.section<FormGridSectionProps>`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-column-gap: 2rem;
  margin: ${props => props.spacing || '1em'};
`;
