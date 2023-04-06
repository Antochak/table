import styled from "styled-components";

export const TextError = styled.span<{
    display?: string,
    margin?: string,
    alignItems?: string}>`
display: ${props => props.display || 'flex'};
margin: ${props => props.margin || '0 0 0 0'};
color: red;
font-size: 14px;
height: 15px;
align-items: ${props => props.alignItems || 'flex-end'};
`
