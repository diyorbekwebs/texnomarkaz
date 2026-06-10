import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../styles/global";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Gallery from "./Gallery";
import ProductInfo from "./ProductInfo";
import PurchaseCard from "./PurchaseCard";
import ProductTabs from "./ProductTabs";
import SimilarProducts from "./SimilarProducts";
import { product, similarProducts } from "./data/product";

const PageWrap = styled.div`background: #f8fafc; min-height: 100vh; padding-bottom: 60px;`;

const Breadcrumb = styled.nav`
  padding: 14px 0; display: flex; align-items: center;
  gap: 6px; font-size: 13px; color: ${colors.gray};
`;

const BreadItem = styled.span`
  cursor: pointer; transition: color 0.2s;
  &:hover { color: ${colors.primary}; }
  &.active { color: ${colors.dark}; font-weight: 500; }
`;

const TopSection = styled.div`
  background: #fff;
  border-bottom: 1px solid ${colors.border};
  padding: 0 0 32px;
`;

const TopGrid = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr 340px;
  gap: 32px; align-items: start;
  @media(max-width: 1100px) { grid-template-columns: 1fr 1fr; }
  @media(max-width: 768px) { grid-template-columns: 1fr; }
`;

const BottomSection = styled.div`padding: 40px 0;`;

const BottomGrid = styled.div`
  display: grid; grid-template-columns: 1fr 340px; gap: 32px; align-items: start;
  @media(max-width: 900px) { grid-template-columns: 1fr; }
`;

export default function ProductDetail() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] || "uz";
  const navigate = useNavigate();

  const [activeImg, setActiveImg] = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const [activeMemory, setActiveMemory] = useState(0);
  const [activeSim, setActiveSim] = useState(0);
  const [wished, setWished] = useState(false);

  const handleColorChange = (i) => {
    setActiveColor(i);
    setActiveImg(i);
  };

  return (
    <PageWrap>
      <div className="container">
        <Breadcrumb>
          <BreadItem onClick={() => navigate("/")}>
            {lang === "uz" ? "Asosiy sahifa" : lang === "ru" ? "Главная" : "Home"}
          </BreadItem>
          <NavigateNextIcon sx={{ fontSize: 16 }} />
          <BreadItem onClick={() => navigate("/catalog")}>iPhone</BreadItem>
          <NavigateNextIcon sx={{ fontSize: 16 }} />
          <BreadItem className="active">{product.name}</BreadItem>
        </Breadcrumb>
      </div>

      <TopSection>
        <div className="container">
          <TopGrid>
            <Gallery
              images={product.images}
              badge={product.badge[lang]}
              activeImg={activeImg}
              onSelect={setActiveImg}
            />
            <ProductInfo
              product={product}
              lang={lang}
              activeColor={activeColor}
              onColorChange={handleColorChange}
              activeMemory={activeMemory}
              onMemoryChange={setActiveMemory}
              activeSim={activeSim}
              onSimChange={setActiveSim}
            />
            <PurchaseCard
              product={product}
              lang={lang}
              activeColor={activeColor}
              onColorChange={handleColorChange}
              activeMemory={activeMemory}
              onMemoryChange={setActiveMemory}
              wished={wished}
              onWish={() => setWished(!wished)}
            />
          </TopGrid>
        </div>
      </TopSection>

      <div className="container">
        <BottomSection>
          <BottomGrid>
            <ProductTabs product={product} lang={lang} />
            <SimilarProducts products={similarProducts} lang={lang} />
          </BottomGrid>
        </BottomSection>
      </div>
    </PageWrap>
  );
}