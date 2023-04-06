import styled from "styled-components";

export const TextContainer = styled.div<{
    alignSelf?: string,
    margin?:string,
    color?: string,
    opacity?: string}>`
display: flex;
align-self: ${props => props.alignSelf || 'center'};
margin: ${props => props.margin};
color: ${props => props.color || 'black'};
opacity: ${props => props.opacity || "1"};
`