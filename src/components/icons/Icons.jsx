import React from 'react';

const IconWrapper = ({ children, size = 20, className = '', ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    {...rest}
  >
    {children}
  </svg>
);

export const RotateCcw = (props) => (
  <IconWrapper {...props}>
    <path d="M9 2v4H5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M21 12A9 9 0 1 1 3 5.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </IconWrapper>
);

export const RotateCw = (props) => (
  <IconWrapper {...props}>
    <path d="M15 2v4h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M3 12A9 9 0 1 0 21 5.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </IconWrapper>
);

export const Pencil = (props) => (
  <IconWrapper {...props}>
    <path d="M3 21l3-1 11-11a2.5 2.5 0 0 0-3.5-3.5L6.5 16.5 5 20z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </IconWrapper>
);

export const Eraser = (props) => (
  <IconWrapper {...props}>
    <path d="M3 17L9 11l6 6-6 6z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <rect x="14" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.6" fill="none" />
  </IconWrapper>
);

export const Square = (props) => (
  <IconWrapper {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
  </IconWrapper>
);

export const Circle = (props) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" fill="none" />
  </IconWrapper>
);

export const Palette = (props) => (
  <IconWrapper {...props}>
    <path d="M12 3C7 3 3 7 3 12s4 9 9 9c.7 0 1.4-.1 2-.3.9-.3 1.5-1.2 1.5-2.2 0-1.5-1.2-2.8-2.7-2.8-.6 0-1.3.2-1.7.5-.4.3-1 .1-1.2-.4-.4-1.1-.6-2.3-.6-3.5 0-2.3 1-4 3-5.8z" stroke="currentColor" strokeWidth="1.2" fill="none" />
    <circle cx="9" cy="9" r="0.8" fill="currentColor" />
    <circle cx="14" cy="8" r="0.8" fill="currentColor" />
    <circle cx="15.5" cy="13" r="0.8" fill="currentColor" />
  </IconWrapper>
);

export const Minus = (props) => (
  <IconWrapper {...props}>
    <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </IconWrapper>
);

export const Plus = (props) => (
  <IconWrapper {...props}>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </IconWrapper>
);

export const Grid = (props) => (
  <IconWrapper {...props}>
    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </IconWrapper>
);

export const Settings = (props) => (
  <IconWrapper {...props}>
    <path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z" stroke="currentColor" strokeWidth="1.4" fill="none" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a1 1 0 0 1-1.1 1.6l-.2-.1a1.7 1.7 0 0 0-1.9.3l-.3.3a1 1 0 0 1-1.4 0l-.3-.3a1.7 1.7 0 0 0-1.9-.3l-.2.1a1 1 0 0 1-1.1-1.6l.1-.1a1.7 1.7 0 0 0 .3-1.9l-.1-.3a1 1 0 0 1 0-1l.1-.3a1.7 1.7 0 0 0-.3-1.9l-.1-.1A1 1 0 0 1 10 6.7l.2.1a1.7 1.7 0 0 0 1.9-.3l.3-.3a1 1 0 0 1 1.4 0l.3.3a1.7 1.7 0 0 0 1.9.3l.2-.1A1 1 0 0 1 18 8.3l-.1.1a1.7 1.7 0 0 0-.3 1.9l.1.3a1 1 0 0 1 0 1l-.1.3z" stroke="currentColor" strokeWidth="1.2" fill="none" />
  </IconWrapper>
);

export const X = (props) => (
  <IconWrapper {...props}>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </IconWrapper>
);

export const Download = (props) => (
  <IconWrapper {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </IconWrapper>
);

export default null;
