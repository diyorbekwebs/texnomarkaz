
import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/global";
import CloseIcon from "@mui/icons-material/Close";
import { categories } from "./data/product";

const Wrap = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;
`;

const Tag = styled.div`
  display: flex; align-items: center; gap: 6px;
  background: ${colors.primaryLight};
  border: 1.5px solid ${colors.primary};
  color: ${colors.primary};
  font-size: 12px; font-weight: 600;
  padding: 5px 10px; border-radius: 20px;
  cursor: pointer; transition: all 0.2s;
  &:hover { background: #dbeafe; }
  svg { font-size: 14px; }
`;

export default function ActiveFilters({ filters, onChange, lang }) {
  const tags = [];

  if (filters.category !== "all") {
    const cat = categories.find(c => c.id === filters.category);
    if (cat) tags.push({ label: cat.label[lang], key: "category", value: "all" });
  }

  filters.brands.forEach(brand => {
    tags.push({ label: brand, key: "brands", value: filters.brands.filter(b => b !== brand) });
  });

  if (filters.inStock) tags.push({ label: lang === "uz" ? "Mavjud" : lang === "ru" ? "В наличии" : "In stock", key: "inStock", value: false });
  if (filters.onSale) tags.push({ label: lang === "uz" ? "Chegirma" : lang === "ru" ? "Скидка" : "Sale", key: "onSale", value: false });

  if (tags.length === 0) return null;

  return (
    <Wrap>
      {tags.map((tag, i) => (
        <Tag key={i} onClick={() => onChange(tag.key, tag.value)}>
          {tag.label}
          <CloseIcon />
        </Tag>
      ))}
    </Wrap>
  );
}