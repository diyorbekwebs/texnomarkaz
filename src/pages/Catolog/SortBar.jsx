import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/global";
import TuneIcon from "@mui/icons-material/Tune";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";

const Wrap = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px; margin-bottom: 20px; flex-wrap: wrap;
`;

const Left = styled.div`display: flex; align-items: center; gap: 12px;`;

const ResultCount = styled.p`
  font-size: 13px; color: ${colors.gray};
  span { font-weight: 700; color: ${colors.dark}; }
`;

const FilterBtn = styled.button`
  display: none;
  @media(max-width: 900px) {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 16px; border-radius: 10px;
    border: 1.5px solid ${colors.border};
    background: #fff; color: ${colors.dark};
    font-size: 13px; font-weight: 600;
    cursor: pointer; font-family: 'Inter', sans-serif;
    transition: all 0.2s;
    &:hover { border-color: ${colors.primary}; color: ${colors.primary}; }
    svg { font-size: 17px; }
  }
`;

const Right = styled.div`display: flex; align-items: center; gap: 10px;`;

const SortSelect = styled.select`
  padding: 8px 12px; border-radius: 10px;
  border: 1.5px solid ${colors.border};
  font-size: 13px; color: ${colors.dark};
  outline: none; font-family: 'Inter', sans-serif;
  cursor: pointer; background: #fff;
  &:focus { border-color: ${colors.primary}; }
`;

const ViewBtns = styled.div`
  display: flex; gap: 4px;
  @media(max-width: 600px) { display: none; }
`;

const ViewBtn = styled.button`
  width: 34px; height: 34px;
  display: flex; align-items: center; justify-content: center;
  border: 1.5px solid ${({ active }) => active ? colors.primary : colors.border};
  background: ${({ active }) => active ? colors.primaryLight : "#fff"};
  border-radius: 8px; cursor: pointer; transition: all 0.2s;
  svg { font-size: 18px; color: ${({ active }) => active ? colors.primary : colors.gray}; }
`;

export default function SortBar({ total, sort, onSort, view, onView, onFilterOpen, lang }) {
  const t = {
    results: { uz: "ta natija", ru: "результатов", en: "results" },
    sort: { uz: "Saralash", ru: "Сортировка", en: "Sort" },
    cheap: { uz: "Arzon avval", ru: "Сначала дешевле", en: "Price: Low to High" },
    expensive: { uz: "Qimmat avval", ru: "Сначала дороже", en: "Price: High to Low" },
    newest: { uz: "Yangi avval", ru: "Сначала новые", en: "Newest first" },
    popular: { uz: "Mashhur", ru: "Популярные", en: "Popular" },
    filter: { uz: "Filter", ru: "Фильтр", en: "Filters" },
  };

  return (
    <Wrap>
      <Left>
        <FilterBtn onClick={onFilterOpen}>
          <TuneIcon /> {t.filter[lang]}
        </FilterBtn>
        <ResultCount>
          <span>{total}</span> {t.results[lang]}
        </ResultCount>
      </Left>
      <Right>
        <SortSelect value={sort} onChange={(e) => onSort(e.target.value)}>
          <option value="popular">{t.popular[lang]}</option>
          <option value="cheap">{t.cheap[lang]}</option>
          <option value="expensive">{t.expensive[lang]}</option>
          <option value="newest">{t.newest[lang]}</option>
        </SortSelect>
        <ViewBtns>
          <ViewBtn active={view === "grid"} onClick={() => onView("grid")}>
            <GridViewIcon />
          </ViewBtn>
          <ViewBtn active={view === "list"} onClick={() => onView("list")}>
            <ViewListIcon />
          </ViewBtn>
        </ViewBtns>
      </Right>
    </Wrap>
  );
}