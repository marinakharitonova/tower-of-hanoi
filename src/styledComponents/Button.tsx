import styled from "styled-components";

const Button = styled.button`
  background: white;
  color: palevioletred;
  font-size: 0.75em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 10px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default Button