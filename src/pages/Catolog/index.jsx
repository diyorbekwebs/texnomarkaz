import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { colors } from "../../styles/global";
import { useTranslation } from "react-i18next";
import Filters from "./Filters";
import SortBar from "./SortBar";
import ActiveFilters from "./ActiveFilters";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";
import { allProducts } from "./data/product";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const PER_PAGE = 12;

const PageWrap = styled.div`
  background: #f8fafc;
  min-height: 100vh;
  padding-bottom: 60px;
`;

const Breadcrumb = styled.nav`
  padding: 14px 0;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${colors.gray};
`;

const BreadItem = styled.span`
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: ${colors.primary};
  }
  &.active {
    color: ${colors.dark};
    font-weight: 500;
  }
`;

const TopBar = styled.div`
  background: #fff;
  border-bottom: 1px solid ${colors.border};
  padding: 16px 0;
`;

const PageTitle = styled.h1`
  font-size: clamp(18px, 3vw, 24px);
  font-weight: 800;
  color: ${colors.dark};
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 24px;
  margin-top: 24px;
  align-items: start;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const initialFilters = {
  category: "all",
  minPrice: 0,
  maxPrice: 30000000,
  brands: [],
  inStock: false,
  onSale: false,
};

export default function Catalog() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] || "uz";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState(initialFilters);
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    setPage(1);
  };
  React.useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setFilters((prev) => ({ ...prev, category: cat }));
  }, []);

  const filtered = useMemo(() => {
    let result = [...allProducts];

    if (filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }
    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice,
    );
    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }
    if (filters.inStock) result = result.filter((p) => p.stock > 0);
    if (filters.onSale) result = result.filter((p) => p.isSale);

    switch (sort) {
      case "cheap":
        result.sort((a, b) => a.price - b.price);
        break;
      case "expensive":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return result;
  }, [filters, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const t = {
    catalog: { uz: "Katalog", ru: "Каталог", en: "Catalog" },
    home: { uz: "Asosiy sahifa", ru: "Главная", en: "Home" },
  };

  return (
    <PageWrap>
      <div className="container">
        <Breadcrumb>
          <BreadItem onClick={() => navigate("/")}>{t.home[lang]}</BreadItem>
          <NavigateNextIcon sx={{ fontSize: 16 }} />
          <BreadItem className="active">{t.catalog[lang]}</BreadItem>
        </Breadcrumb>
      </div>

      <TopBar>
        <div className="container">
          <PageTitle>{t.catalog[lang]}</PageTitle>
        </div>
      </TopBar>

      <div className="container">
        <Layout>
          <Filters
            filters={filters}
            onChange={handleFilterChange}
            onClear={handleClearFilters}
            products={allProducts}
            lang={lang}
            mobileOpen={mobileFilterOpen}
            onMobileClose={() => setMobileFilterOpen(false)}
          />
          <div>
            <SortBar
              total={filtered.length}
              sort={sort}
              onSort={setSort}
              view={view}
              onView={setView}
              onFilterOpen={() => setMobileFilterOpen(true)}
              lang={lang}
            />
            <ActiveFilters
              filters={filters}
              onChange={handleFilterChange}
              lang={lang}
            />
            <ProductGrid products={paginated} lang={lang} />
            {totalPages > 1 && (
              <Pagination
                current={page}
                total={totalPages}
                onChange={(p) => {
                  setPage(p);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}
          </div>
        </Layout>
      </div>
    </PageWrap>
  );
}
