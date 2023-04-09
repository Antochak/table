import styled from "styled-components";

export const Image = styled.img<{
	height?: string
}>`
    height: ${props => props.height || '35px'};
    display: flex;
    align-self: flex-start;
    margin: 0 10px 0 0;`