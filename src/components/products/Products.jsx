// src/components/products/Products.jsx
import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/global";
import { useTranslation } from "react-i18next";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Section = styled.section`padding:60px 0;background:#fff`;

const SectionTop = styled.div`
  display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;
`;

const SectionTitle = styled.h2`
  font-size:clamp(20px,3vw,26px);font-weight:700;color:${colors.dark};
  display:flex;align-items:center;gap:8px;
`;

const SeeAll = styled.a`
  display:flex;align-items:center;gap:4px;
  font-size:14px;font-weight:600;color:${colors.primary};
  text-decoration:none;cursor:pointer;
  &:hover{gap:8px;transition:gap 0.2s}
`;

const Grid = styled.div`
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
  gap:20px;
  @media(max-width:600px){grid-template-columns:repeat(2,1fr);gap:12px}
`;

const Card = styled.div`
  background:#fff;border:1.5px solid ${colors.border};
  border-radius:16px;overflow:hidden;
  transition:all 0.25s;cursor:pointer;
  &:hover{border-color:${colors.primary};box-shadow:0 8px 32px rgba(37,99,235,0.1);transform:translateY(-4px)}
`;

const CardImg = styled.div`
  background:${colors.grayLight};
  display:flex;align-items:center;justify-content:center;
  padding:24px;height:180px;position:relative;
  img{width:100%;height:100%;object-fit:contain}
`;

const CardBadge = styled.span`
  position:absolute;top:10px;left:10px;
  background:${({type}) => type === "new" ? colors.primary : type === "sale" ? "#ef4444" : "transparent"};
  color:#fff;font-size:10px;font-weight:700;
  padding:3px 8px;border-radius:6px;text-transform:uppercase;
`;

const WishBtn = styled.button`
  position:absolute;top:10px;right:10px;
  background:#fff;border:1px solid ${colors.border};
  border-radius:8px;width:32px;height:32px;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;transition:all 0.2s;
  &:hover{border-color:#ef4444;color:#ef4444}
  svg{font-size:16px;color:#999}
`;

const CardBody = styled.div`padding:14px`;

const CardName = styled.p`
  font-size:14px;font-weight:600;color:${colors.dark};
  margin-bottom:4px;line-height:1.4;
`;

const CardDesc = styled.p`
  font-size:12px;color:${colors.gray};margin-bottom:12px;
`;

const CardPriceRow = styled.div`
  display:flex;align-items:center;justify-content:space-between;gap:8px;
`;

const CardPrice = styled.span`
  font-size:15px;font-weight:700;color:${colors.dark};
`;

const CardOldPrice = styled.span`
  font-size:12px;color:#aaa;text-decoration:line-through;
`;

const CartBtn = styled.button`
  background:${colors.primaryLight};
  border:none;border-radius:8px;
  width:34px;height:34px;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;transition:all 0.2s;flex-shrink:0;
  svg{font-size:17px;color:${colors.primary}}
  &:hover{background:${colors.primary};svg{color:#fff}}
`;

const products = [
  { id:1, name:"iPhone 15 Pro Max", desc:"Titanium. 256GB", price:"15 999 000", oldPrice:null, img:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=800&hei=800&fmt=p-jpg&qlt=80", badge:"new" },
  { id:2, name:"Samsung Galaxy S24 Ultra", desc:"Yangi AI imkoniyatlari", price:"13 499 000", oldPrice:"14 500 000", img:"https://images.samsung.com/is/image/samsung/p6pim/levant/2401/gallery/levant-galaxy-s24-ultra-s928-sm-s928bztgmea-thumb-539573488?$650_519_PNG$", badge:"sale" },
  { id:3, name:"AirPods Pro 2", desc:"Mukammal ovoz", price:"2 499 000", oldPrice:null, img:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=800&hei=800&fmt=jpeg&qlt=90", badge:null },
  { id:4, name:"Apple Watch Series 9", desc:"Sizning salomatingiz", price:"4 199 000", oldPrice:"4 800 000", img:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MR9A3?wid=800&hei=800&fmt=jpeg&qlt=90", badge:"sale" },
  { id:5, name:"MacBook Pro 14\"", desc:"M3 Pro chip", price:"22 999 000", oldPrice:null, img:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202310?wid=800&hei=800&fmt=jpeg&qlt=90", badge:"new" },
  { id:6, name:"iPad Air M2", desc:"11 dyuym, Wi-Fi", price:"8 499 000", oldPrice:"9 200 000", img:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202405?wid=800&hei=800&fmt=jpeg&qlt=90", badge:null },
];

export default function Products() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] || "uz";

  const title = { uz: "Mashhur mahsulotlar 🔥", ru: "Популярные товары 🔥", en: "Popular Products 🔥" };
  const seeAll = { uz: "Barchasini ko'rish", ru: "Смотреть все", en: "See all" };
  const detail = { uz: "Batafsil", ru: "Подробнее", en: "Details" };

  return (
    <Section>
      <div className="container">
        <SectionTop>
          <SectionTitle>{title[lang]}</SectionTitle>
          <SeeAll>{seeAll[lang]} <ArrowForwardIcon sx={{fontSize:16}}/></SeeAll>
        </SectionTop>
        <Grid>
          {products.map((p) => (
            <Card key={p.id}>
              <CardImg>
                {p.badge && <CardBadge type={p.badge}>{p.badge === "new" ? "Yangi" : "Sale"}</CardBadge>}
                <WishBtn><FavoriteBorderIcon /></WishBtn>
                <img src={p.img} alt={p.name} />
              </CardImg>
              <CardBody>
                <CardName>{p.name}</CardName>
                <CardDesc>{p.desc}</CardDesc>
                <CardPriceRow>
                  <div>
                    <CardPrice>{p.price} so'm</CardPrice>
                    {p.oldPrice && <><br/><CardOldPrice>{p.oldPrice} so'm</CardOldPrice></>}
                  </div>
                  <CartBtn><ShoppingCartOutlinedIcon /></CartBtn>
                </CardPriceRow>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </div>
    </Section>
  );
}