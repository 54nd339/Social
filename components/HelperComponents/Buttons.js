import React from "react";
import styled from "styled-components";
import { ThreeBounce } from "better-react-spinkit";

export const Button = styled.button`
  width: 100%;
  height: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SmallButton = styled.button`
  background: none;
  border: none;
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease;

  &:hover {
    color: #764ba2;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.75rem 1.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SecondaryButton = styled.button`
  background: transparent;
  border: 2px solid #667eea;
  border-radius: 0.5rem;
  color: #667eea;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.75rem 1.5rem;

  &:hover:not(:disabled) {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const LoadingButton = ({ loading, children, ...props }) => (
  <Button {...props}>
    {loading ? <ThreeBounce size={9} color="#fff" /> : children}
  </Button>
);
