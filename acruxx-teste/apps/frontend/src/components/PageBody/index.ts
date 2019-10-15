import { Theme } from '@material-ui/core';
import styled from 'styled-components';

export interface PageBodyProps {
  theme?: Theme;
  fixedAppBar?: boolean;
}

export default styled.main<PageBodyProps>`
  background: ${props =>
    props.theme ? props.theme.palette.background.default : 'initial'};
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  overflow-x: none;
  padding-top: ${props => (props.fixedAppBar ? '4rem' : 0)};
`;
