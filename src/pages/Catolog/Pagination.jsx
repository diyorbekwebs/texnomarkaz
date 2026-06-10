import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/global";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Wrap = styled.div`
  display: flex; align-items: center; justify-content: center;
  gap: 6px; margin-top: 32px; flex-wrap: wrap;
`;

const Btn = styled.button`
  min-width: 38px; height: 38px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 10px; font-size: 13px; font-weight: 600;
  cursor: pointer; font-family: 'Inter', sans-serif;
  transition: all 0.15s;
  border: 1.5px solid ${({ active }) => active ? colors.primary : colors.border};
  background: ${({ active }) => active ? colors.primary : "#fff"};
  color: ${({ active }) => active ? "#fff" : colors.dark};
  &:hover { border-color: ${colors.primary}; color: ${({ active }) => active ? "#fff" : colors.primary}; }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

const Dots = styled.span`
  font-size: 13px; color: ${colors.gray};
  padding: 0 4px;
`;

export default function Pagination({ current, total, onChange }) {
  const pages = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    if (current <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", total);
    } else if (current >= total - 3) {
      pages.push(1, "...", total - 4, total - 3, total - 2, total - 1, total);
    } else {
      pages.push(1, "...", current - 1, current, current + 1, "...", total);
    }
  }

  return (
    <Wrap>
      <Btn onClick={() => onChange(current - 1)} disabled={current === 1}>
        <NavigateBeforeIcon sx={{ fontSize: 18 }} />
      </Btn>
      {pages.map((p, i) =>
        p === "..." ? (
          <Dots key={i}>...</Dots>
        ) : (
          <Btn key={i} active={p === current} onClick={() => onChange(p)}>
            {p}
          </Btn>
        )
      )}
      <Btn onClick={() => onChange(current + 1)} disabled={current === total}>
        <NavigateNextIcon sx={{ fontSize: 18 }} />
      </Btn>
    </Wrap>
  );
}