import styled from "styled-components";

export const FlexContainer = styled.div<{

    width?: string,
    height?: string,
    alignItems?: string,
    justifyContent?:string,
    margin?: string,
    row?: boolean,
    border?: string,
    flexDirection?: string} >`

  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  margin: ${props => props.margin || '0 auto'};
  display: flex;
  flex-direction: ${props => props.flexDirection || 'row'};
  align-items: ${props => props.alignItems || 'center'};
  justify-content: ${props => props.justifyContent || 'center'};
  border: ${props => props.border || 'none'};
`