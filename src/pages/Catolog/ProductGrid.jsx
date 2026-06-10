import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/global";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  @media(max-width: 1100px) { grid-template-columns: repeat(2, 1fr); }
  @media(max-width: 480px) { grid-template-columns: repeat(2, 1fr); gap: 10px; }
`;

const Card = styled.div`
  border: 1.5px solid ${colors.border};
  border-radius: 14px; overflow: hidden;
  background: #fff; cursor: pointer;
  transition: all 0.22s;
  &:hover {
    border-color: ${colors.primary};
    box-shadow: 0 6px 24px rgba(37,99,235,0.1);
    transform: translateY(-3px);
  }
`;

const ImgBox = styled.div`
  background: ${colors.grayLight};
  height: 180px; position: relative; padding: 16px;
  display: flex; align-items: center; justify-content: center;
  img { width: 100%; height: 100%; object-fit: contain; }
  @media(max-width: 480px) { height: 140px; }
`;

const TejamBadge = styled.span`
  position: absolute; top: 10px; left: 10px;
  background: #ef4444; color: #fff;
  font-size: 10px; font-weight: 700;
  padding: 3px 8px; border-radius: 6px;
`;

const NewBadge = styled.span`
  position: absolute; top: 10px; left: 10px;
  background: ${colors.primary}; color: #fff;
  font-size: 10px; font-weight: 700;
  padding: 3px 8px; border-radius: 6px;
`;

const WishBtn = styled.button`
  position: absolute; top: 10px; right: 10px;
  width: 30px; height: 30px;
  background: #fff; border: 1px solid ${colors.border};
  border-radius: 8px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.2s;
  svg { font-size: 15px; color: #aaa; }
  &:hover { border-color: #ef4444; svg { color: #ef4444; } }
`;

const Body = styled.div`padding: 12px;`;

const Name = styled.p`
  font-size: 13px; font-weight: 600; color: ${colors.dark};
  margin-bottom: 4px; line-height: 1.4;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
`;

const Brand = styled.p`font-size: 11px; color: ${colors.gray}; margin-bottom: 8px;`;

const Stock = styled.p`
  font-size: 11px; font-weight: 500; margin-bottom: 8px;
  color: ${({ instock }) => instock ? "#10b981" : "#ef4444"};
`;

const PriceRow = styled.div`
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
`;

const PriceCol = styled.div``;
const OldPrice = styled.p`font-size: 11px; color: #aaa; text-decoration: line-through; line-height: 1;`;
const Price = styled.p`font-size: 14px; font-weight: 700; color: ${colors.primary};`;

const CartBtn = styled.button`
  width: 32px; height: 32px; flex-shrink: 0;
  background: ${colors.primaryLight}; border: none; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.2s;
  svg { font-size: 16px; color: ${colors.primary}; }
  &:hover { background: ${colors.primary}; svg { color: #fff; } }
`;

const Empty = styled.div`
  grid-column: 1 / -1;
  text-align: center; padding: 60px 20px;
`;

const EmptyIcon = styled.div`font-size: 48px; margin-bottom: 12px;`;
const EmptyText = styled.p`font-size: 16px; font-weight: 600; color: ${colors.dark}; margin-bottom: 6px;`;
const EmptyDesc = styled.p`font-size: 13px; color: ${colors.gray};`;

export default function ProductGrid({ products, lang }) {
  const navigate = useNavigate();

  const t = {
    stock: { uz: "rangda mavjud", ru: "цвета в наличии", en: "colors available" },
    noStock: { uz: "Mavjud emas", ru: "Нет в наличии", en: "Out of stock" },
    empty: { uz: "Mahsulot topilmadi", ru: "Товары не найдены", en: "No products found" },
    emptyDesc: { uz: "Filter parametrlarini o'zgartiring", ru: "Измените параметры фильтра", en: "Try changing filter parameters" },
  };

  if (products.length === 0) {
    return (
      <Grid>
        <Empty>
          <EmptyIcon>🔍</EmptyIcon>
          <EmptyText>{t.empty[lang]}</EmptyText>
          <EmptyDesc>{t.emptyDesc[lang]}</EmptyDesc>
        </Empty>
      </Grid>
    );
  }

  return (
    <Grid>
      {products.map((p) => (
        <Card key={p.id} onClick={() => navigate(`/product/${p.id}`)}>
          <ImgBox>
            {p.isSale && p.tejam && <TejamBadge>{p.tejam}% tejang</TejamBadge>}
            {p.isNew && !p.isSale && <NewBadge>Yangi</NewBadge>}
            <WishBtn onClick={(e) => e.stopPropagation()}>
              <FavoriteBorderIcon />
            </WishBtn>
            <img src={p.img} alt={p.name} />
          </ImgBox>
          <Body>
            <Brand>{p.brand}</Brand>
            <Name>{p.name}</Name>
            <Stock instock={p.stock > 0}>
              {p.stock > 0 ? `${p.stock} ${t.stock[lang]}` : t.noStock[lang]}
            </Stock>
            <PriceRow>
              <PriceCol>
                {p.oldPrice && <OldPrice>{p.oldPrice.toLocaleString()} so'm</OldPrice>}
                <Price>{p.price.toLocaleString()} so'm</Price>
              </PriceCol>
              <CartBtn onClick={(e) => e.stopPropagation()}>
                <ShoppingCartOutlinedIcon />
              </CartBtn>
            </PriceRow>
          </Body>
        </Card>
      ))}
    </Grid>
  );
}   