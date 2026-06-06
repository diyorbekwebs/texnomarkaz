import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../styles/global";
import { useTranslation } from "react-i18next";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Section = styled.section`padding: 60px 0; background: #fff;`;

const SectionTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
`;

const Title = styled.h2`
  font-size: clamp(18px, 3vw, 24px);
  font-weight: 700;
  color: ${colors.dark};
`;

const SeeAll = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.primary};
  text-decoration: none;
  cursor: pointer;
  transition: gap 0.2s;
  &:hover { gap: 8px; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 14px;
  @media(max-width: 1100px) { grid-template-columns: repeat(4, 1fr); }
  @media(max-width: 768px) { grid-template-columns: repeat(3, 1fr); }
  @media(max-width: 480px) { grid-template-columns: repeat(2, 1fr); }
`;

const Card = styled.div`
  border: 1.5px solid ${colors.border};
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.22s;
  background: #fff;
  &:hover {
    border-color: ${colors.primary};
    box-shadow: 0 6px 24px rgba(37,99,235,0.1);
    transform: translateY(-3px);
  }
`;

const ImgBox = styled.div`
  background: ${colors.grayLight};
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 12px;
  img { width: 100%; height: 100%; object-fit: contain; }
`;

const TejamBadge = styled.span`
  position: absolute;
  top: 8px; left: 8px;
  background: #ef4444;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 6px;
`;

const WishBtn = styled.button`
  position: absolute;
  top: 8px; right: 8px;
  width: 28px; height: 28px;
  background: #fff;
  border: 1px solid ${colors.border};
  border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  svg { font-size: 14px; color: #aaa; }
  &:hover { border-color: #ef4444; svg { color: #ef4444; } }
`;

const Body = styled.div`padding: 10px`;

const Name = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.dark};
  margin-bottom: 4px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Stock = styled.p`
  font-size: 11px;
  color: #10b981;
  margin-bottom: 6px;
  font-weight: 500;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
`;

const PriceCol = styled.div``;

const OldPrice = styled.p`
  font-size: 11px;
  color: #aaa;
  text-decoration: line-through;
  line-height: 1;
`;

const Price = styled.p`
  font-size: 13px;
  font-weight: 700;
  color: ${colors.primary};
`;

const CartBtn = styled.button`
  width: 30px; height: 30px;
  background: ${colors.primaryLight};
  border: none;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; flex-shrink: 0;
  transition: all 0.2s;
  svg { font-size: 15px; color: ${colors.primary}; }
  &:hover { background: ${colors.primary}; svg { color: #fff; } }
`;

const products = [
  { id: 1, name: "iPhone 17", price: "12 890 000", oldPrice: null, tejam: null, stock: 5, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=400&hei=400&fmt=p-jpg" },
  { id: 2, name: "iPhone Air", price: "13 990 000", oldPrice: null, tejam: null, stock: 4, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-white?wid=400&hei=400&fmt=p-jpg" },
  { id: 3, name: "iPhone 17 Pro", price: "18 380 000", oldPrice: null, tejam: "4%", stock: 3, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-deserttitanium?wid=400&hei=400&fmt=p-jpg" },
  { id: 4, name: "iPhone 17 Pro Max", price: "19 520 000", oldPrice: null, tejam: "8%", stock: 3, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=400&hei=400&fmt=p-jpg" },
  { id: 5, name: "iPhone 16e", price: "10 390 000", oldPrice: null, tejam: null, stock: 0, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16e-finish-select-202502-6-1inch-black?wid=400&hei=400&fmt=p-jpg" },
  { id: 6, name: "iPhone 16", price: "11 299 000", oldPrice: "12 399 000", tejam: "9%", stock: 5, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=400&hei=400&fmt=p-jpg" },
  { id: 7, name: "iPhone 16 Plus", price: "14 160 000", oldPrice: null, tejam: null, stock: 3, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-plus-finish-select-202409-6-7inch-teal?wid=400&hei=400&fmt=p-jpg" },
  { id: 8, name: "iPhone 16 Pro", price: "16 093 000", oldPrice: null, tejam: null, stock: 3, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-blacktitanium?wid=400&hei=400&fmt=p-jpg" },
  { id: 9, name: "iPhone 16 Pro Max", price: "18 735 000", oldPrice: "18 850 000", tejam: "7%", stock: 3, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=400&hei=400&fmt=p-jpg" },
  { id: 10, name: "Apple iPhone 13 smartfoni", price: "6 990 000", oldPrice: "7 600 000", tejam: "8%", stock: 3, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-6-1inch-midnight?wid=400&hei=400&fmt=p-jpg" },
  { id: 11, name: "iPhone 17e", price: "11 289 000", oldPrice: null, tejam: null, stock: 3, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16e-finish-select-202502-6-1inch-white?wid=400&hei=400&fmt=p-jpg" },
  { id: 12, name: "Verified A iPhone 13 128GB Blue Single SIM", price: "4 674 000", oldPrice: null, tejam: null, stock: 3, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-6-1inch-blue?wid=400&hei=400&fmt=p-jpg" },
];

export default function TopProducts() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] || "uz";

  const t = {
    title: { uz: "Yuqori mahsulotlar", ru: "Топ товары", en: "Top Products" },
    seeAll: { uz: "Barcha mahsulotlarni ko'rish", ru: "Смотреть все", en: "See all products" },
    stock: { uz: "rangda mavjud", ru: "цвета в наличии", en: "colors available" },
    noStock: { uz: "Mavjud emas", ru: "Нет в наличии", en: "Out of stock" },
  };

  return (
    <Section>
      <div className="container">
        <SectionTop>
          <Title>{t.title[lang]}</Title>
          <SeeAll>
            {t.seeAll[lang]} <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </SeeAll>
        </SectionTop>
        <Grid>
          {products.map((p) => (
            <Card key={p.id}>
              <ImgBox>
                {p.tejam && <TejamBadge>{p.tejam} tejang</TejamBadge>}
                <WishBtn onClick={(e) => e.stopPropagation()}>
                  <FavoriteBorderIcon />
                </WishBtn>
                <img src={p.img} alt={p.name} />
              </ImgBox>
              <Body>
                <Name>{p.name}</Name>
                {p.stock > 0
                  ? <Stock>{p.stock} {t.stock[lang]}</Stock>
                  : <Stock style={{ color: "#ef4444" }}>{t.noStock[lang]}</Stock>
                }
                <PriceRow>
                  <PriceCol>
                    {p.oldPrice && <OldPrice>{p.oldPrice} so'm</OldPrice>}
                    <Price>{p.price} so'm</Price>
                  </PriceCol>
                  <CartBtn onClick={(e) => e.stopPropagation()}>
                    <ShoppingCartOutlinedIcon />
                  </CartBtn>
                </PriceRow>
              </Body>
            </Card>
          ))}
        </Grid>
      </div>
    </Section>
  );
}