import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../styles/global";
import { categories, brands } from "./data/product";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Sidebar = styled.div`
  background: #fff;
  border: 1.5px solid ${colors.border};
  border-radius: 16px;
  overflow: hidden;
  @media(max-width: 900px) { display: none; }
`;

const DrawerOverlay = styled.div`
  display: none;
  @media(max-width: 900px) {
    display: ${({ open }) => open ? "block" : "none"};
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.4);
    z-index: 999;
  }
`;

const DrawerContent = styled.div`
  display: none;
  @media(max-width: 900px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 0; left: 0; right: 0;
    background: #fff;
    border-radius: 20px 20px 0 0;
    z-index: 1000;
    max-height: 85vh;
    overflow-y: auto;
    transform: translateY(${({ open }) => open ? "0" : "100%"});
    transition: transform 0.3s cubic-bezier(0.34, 1.1, 0.64, 1);
  }
`;

const DrawerHandle = styled.div`
  width: 40px; height: 4px;
  background: #e2e8f0; border-radius: 2px;
  margin: 12px auto 0;
`;

const FilterHeader = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid ${colors.border};
`;

const FilterTitle = styled.h3`font-size: 15px; font-weight: 700; color: ${colors.dark};`;

const ClearBtn = styled.button`
  background: none; border: none;
  font-size: 13px; color: ${colors.primary};
  cursor: pointer; font-family: 'Inter', sans-serif;
  font-weight: 600;
  &:hover { text-decoration: underline; }
`;

const Section = styled.div`border-bottom: 1px solid ${colors.border};`;

const SectionHeader = styled.button`
  width: 100%; display: flex; align-items: center; justify-content: space-between;
  padding: 14px 20px; background: none; border: none;
  cursor: pointer; font-family: 'Inter', sans-serif;
`;

const SectionTitle = styled.span`font-size: 13px; font-weight: 700; color: ${colors.dark};`;

const SectionBody = styled.div`
  padding: ${({ open }) => open ? "0 20px 16px" : "0"};
  max-height: ${({ open }) => open ? "300px" : "0"};
  overflow: hidden;
  transition: all 0.25s ease;
`;

const CategoryList = styled.div`display: flex; flex-direction: column; gap: 6px;`;

const CategoryItem = styled.button`
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 12px; border-radius: 10px;
  background: ${({ active }) => active ? colors.primaryLight : "transparent"};
  border: 1.5px solid ${({ active }) => active ? colors.primary : "transparent"};
  color: ${({ active }) => active ? colors.primary : colors.dark};
  font-size: 13px; font-weight: ${({ active }) => active ? "600" : "400"};
  cursor: pointer; font-family: 'Inter', sans-serif;
  transition: all 0.15s; text-align: left;
  &:hover { background: ${colors.primaryLight}; color: ${colors.primary}; }
`;

const Count = styled.span`
  font-size: 11px; color: ${colors.gray};
  background: ${colors.grayLight};
  padding: 2px 7px; border-radius: 10px;
`;

const PriceInputs = styled.div`display: flex; gap: 8px; align-items: center;`;

const PriceInput = styled.input`
  flex: 1; padding: 8px 10px;
  border: 1.5px solid ${colors.border}; border-radius: 8px;
  font-size: 12px; outline: none; font-family: 'Inter', sans-serif;
  color: ${colors.dark};
  &:focus { border-color: ${colors.primary}; }
`;

const RangeSlider = styled.input`
  width: 100%; margin: 12px 0;
  accent-color: ${colors.primary};
`;

const BrandList = styled.div`display: flex; flex-direction: column; gap: 8px;`;

const BrandItem = styled.label`
  display: flex; align-items: center; gap: 10px;
  cursor: pointer; font-size: 13px; color: ${colors.dark};
  padding: 4px 0;
`;

const Checkbox = styled.input`
  width: 16px; height: 16px;
  accent-color: ${colors.primary};
  cursor: pointer;
`;

const ApplyBtn = styled.button`
  width: calc(100% - 40px);
  margin: 16px 20px;
  padding: 14px;
  background: ${colors.primary}; color: #fff;
  border: none; border-radius: 12px;
  font-size: 14px; font-weight: 700;
  cursor: pointer; font-family: 'Inter', sans-serif;
  transition: all 0.2s;
  &:hover { background: #1d4ed8; }
`;

const FilterContent = ({ filters, onChange, onClear, products, lang }) => {
  const [openSections, setOpenSections] = useState({
    category: true, price: true, brand: true,
  });

  const toggle = (key) => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  const getCategoryCount = (catId) =>
    catId === "all" ? products.length : products.filter(p => p.category === catId).length;

  const t = {
    filter: { uz: "Filter", ru: "Фильтр", en: "Filters" },
    clear: { uz: "Tozalash", ru: "Сбросить", en: "Clear" },
    category: { uz: "Kategoriya", ru: "Категория", en: "Category" },
    price: { uz: "Narx", ru: "Цена", en: "Price" },
    brand: { uz: "Brend", ru: "Бренд", en: "Brand" },
    from: { uz: "dan", ru: "от", en: "from" },
    to: { uz: "gacha", ru: "до", en: "to" },
    inStock: { uz: "Faqat mavjud", ru: "Только в наличии", en: "In stock only" },
    onSale: { uz: "Chegirmali", ru: "Со скидкой", en: "On sale" },
  };

  return (
    <>
      <FilterHeader>
        <FilterTitle>{t.filter[lang]}</FilterTitle>
        <ClearBtn onClick={onClear}>{t.clear[lang]}</ClearBtn>
      </FilterHeader>

      {/* Category */}
      <Section>
        <SectionHeader onClick={() => toggle("category")}>
          <SectionTitle>{t.category[lang]}</SectionTitle>
          {openSections.category ? <ExpandLessIcon sx={{ fontSize: 18, color: colors.gray }} /> : <ExpandMoreIcon sx={{ fontSize: 18, color: colors.gray }} />}
        </SectionHeader>
        <SectionBody open={openSections.category}>
          <CategoryList>
            {categories.map((cat) => (
              <CategoryItem
                key={cat.id}
                active={filters.category === cat.id}
                onClick={() => onChange("category", cat.id)}
              >
                {cat.label[lang]}
                <Count>{getCategoryCount(cat.id)}</Count>
              </CategoryItem>
            ))}
          </CategoryList>
        </SectionBody>
      </Section>

      {/* Price */}
      <Section>
        <SectionHeader onClick={() => toggle("price")}>
          <SectionTitle>{t.price[lang]}</SectionTitle>
          {openSections.price ? <ExpandLessIcon sx={{ fontSize: 18, color: colors.gray }} /> : <ExpandMoreIcon sx={{ fontSize: 18, color: colors.gray }} />}
        </SectionHeader>
        <SectionBody open={openSections.price}>
          <RangeSlider
            type="range" min={0} max={30000000} step={500000}
            value={filters.maxPrice}
            onChange={(e) => onChange("maxPrice", Number(e.target.value))}
          />
          <PriceInputs>
            <PriceInput
              type="number" placeholder="0"
              value={filters.minPrice}
              onChange={(e) => onChange("minPrice", Number(e.target.value))}
            />
            <span style={{ color: colors.gray, fontSize: 13 }}>—</span>
            <PriceInput
              type="number"
              value={filters.maxPrice}
              onChange={(e) => onChange("maxPrice", Number(e.target.value))}
            />
          </PriceInputs>
        </SectionBody>
      </Section>

      {/* Brand */}
      <Section>
        <SectionHeader onClick={() => toggle("brand")}>
          <SectionTitle>{t.brand[lang]}</SectionTitle>
          {openSections.brand ? <ExpandLessIcon sx={{ fontSize: 18, color: colors.gray }} /> : <ExpandMoreIcon sx={{ fontSize: 18, color: colors.gray }} />}
        </SectionHeader>
        <SectionBody open={openSections.brand}>
          <BrandList>
            {brands.map((brand) => (
              <BrandItem key={brand}>
                <Checkbox
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...filters.brands, brand]
                      : filters.brands.filter(b => b !== brand);
                    onChange("brands", updated);
                  }}
                />
                {brand}
              </BrandItem>
            ))}
          </BrandList>
        </SectionBody>
      </Section>

      {/* Extra */}
      <Section style={{ border: "none" }}>
        <SectionBody open={true} style={{ padding: "12px 20px" }}>
          <BrandList>
            <BrandItem>
              <Checkbox type="checkbox"
                checked={filters.inStock}
                onChange={(e) => onChange("inStock", e.target.checked)}
              />
              {t.inStock[lang]}
            </BrandItem>
            <BrandItem>
              <Checkbox type="checkbox"
                checked={filters.onSale}
                onChange={(e) => onChange("onSale", e.target.checked)}
              />
              {t.onSale[lang]}
            </BrandItem>
          </BrandList>
        </SectionBody>
      </Section>
    </>
  );
};

export default function Filters({ filters, onChange, onClear, products, lang, mobileOpen, onMobileClose }) {
  return (
    <>
      {/* Desktop sidebar */}
      <Sidebar>
        <FilterContent filters={filters} onChange={onChange} onClear={onClear} products={products} lang={lang} />
      </Sidebar>

      {/* Mobile drawer */}
      <DrawerOverlay open={mobileOpen} onClick={onMobileClose} />
      <DrawerContent open={mobileOpen}>
        <DrawerHandle />
        <FilterContent filters={filters} onChange={onChange} onClear={onClear} products={products} lang={lang} />
        <ApplyBtn onClick={onMobileClose}>
          {lang === "uz" ? "Qo'llash" : lang === "ru" ? "Применить" : "Apply"}
        </ApplyBtn>
      </DrawerContent>
    </>
  );
}