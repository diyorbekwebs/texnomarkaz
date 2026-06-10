import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/global";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import BoltIcon from "@mui/icons-material/Bolt";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Card = styled.div`
  background: #fff;
  border: 1.5px solid ${colors.border};
  border-radius: 20px; padding: 24px;
  position: sticky; top: 80px;
`;

const PriceLabel = styled.p`font-size: 12px; color: ${colors.gray}; margin-bottom: 4px;`;

const Price = styled.h2`
  font-size: 32px; font-weight: 800;
  color: ${colors.dark}; margin-bottom: 16px;
`;

const OldPrice = styled.span`
  font-size: 16px; color: #aaa;
  text-decoration: line-through;
  font-weight: 400; margin-left: 8px;
`;

const InstallmentBox = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  background: ${colors.primaryLight}; border-radius: 12px;
  padding: 14px 16px; margin-bottom: 20px; cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #dbeafe; }
`;

const InstallmentLeft = styled.div`display: flex; align-items: center; gap: 10px;`;

const InstallmentIcon = styled.div`
  width: 36px; height: 36px;
  background: ${colors.primary}; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  svg { color: #fff; font-size: 18px; }
`;

const InstallmentPrice = styled.p`font-size: 14px; font-weight: 700; color: ${colors.primary};`;
const InstallmentDesc = styled.p`font-size: 11px; color: ${colors.gray};`;

const VariantLabel = styled.p`font-size: 13px; font-weight: 600; color: ${colors.dark}; margin-bottom: 10px;`;

const ColorRow = styled.div`display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;`;

const ColorBtn = styled.button`
  width: 28px; height: 28px; border-radius: 50%;
  background: ${({ color }) => color};
  border: 3px solid ${({ active }) => active ? colors.primary : "transparent"};
  outline: 2px solid ${({ active }) => active ? colors.primary : colors.border};
  cursor: pointer; transition: all 0.2s;
`;

const OptionRow = styled.div`display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;`;

const OptionBtn = styled.button`
  flex: 1; padding: 8px 0; border-radius: 10px;
  border: 1.5px solid ${({ active }) => active ? colors.primary : colors.border};
  background: ${({ active }) => active ? colors.primaryLight : "#fff"};
  color: ${({ active }) => active ? colors.primary : colors.dark};
  font-size: 13px; font-weight: 600; cursor: pointer;
  font-family: 'Inter', sans-serif; transition: all 0.2s;
  &:hover { border-color: ${colors.primary}; }
`;

const BtnRow = styled.div`display: flex; gap: 10px; margin-bottom: 10px;`;

const AddToCartBtn = styled.button`
  flex: 1;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  background: ${colors.dark}; color: #fff;
  border: none; border-radius: 14px; padding: 14px;
  font-size: 14px; font-weight: 700; cursor: pointer;
  font-family: 'Inter', sans-serif; transition: all 0.2s;
  &:hover { background: #1e293b; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,0.15); }
`;

const WishBtn = styled.button`
  width: 48px; height: 48px;
  background: #fff; border: 1.5px solid ${colors.border};
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; flex-shrink: 0; transition: all 0.2s;
  svg { font-size: 20px; color: ${({ wished }) => wished ? "#ef4444" : "#aaa"}; }
  &:hover { border-color: #ef4444; }
`;

const QuickBuyBtn = styled.button`
  width: 100%;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  background: ${colors.primaryLight}; color: ${colors.primary};
  border: 1.5px solid ${colors.primary}; border-radius: 14px; padding: 12px;
  font-size: 14px; font-weight: 700; cursor: pointer;
  font-family: 'Inter', sans-serif; transition: all 0.2s;
  margin-bottom: 16px;
  &:hover { background: ${colors.primary}; color: #fff; }
`;

const DeliveryRow = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 10px;`;

const DeliveryItem = styled.div`
  display: flex; align-items: flex-start; gap: 8px;
  svg { color: ${colors.gray}; font-size: 18px; flex-shrink: 0; margin-top: 1px; }
`;

const DeliveryTitle = styled.p`font-size: 12px; font-weight: 600; color: ${colors.dark};`;
const DeliveryDesc = styled.p`font-size: 11px; color: ${colors.gray};`;

export default function PurchaseCard({
  product, lang,
  activeColor, onColorChange,
  activeMemory, onMemoryChange,
  wished, onWish,
}) {
  return (
    <Card>
      <PriceLabel>Narxi</PriceLabel>
      <Price>
        {product.price} so'm
        {product.oldPrice && <OldPrice>{product.oldPrice} so'm</OldPrice>}
      </Price>

      <InstallmentBox>
        <InstallmentLeft>
          <InstallmentIcon><BoltIcon /></InstallmentIcon>
          <div>
            <InstallmentPrice>Oyiga {product.installment} so'm</InstallmentPrice>
            <InstallmentDesc>Muddatli to'lovga olish hisob-kitobini ko'rish</InstallmentDesc>
          </div>
        </InstallmentLeft>
        <KeyboardArrowRightIcon sx={{ color: colors.primary }} />
      </InstallmentBox>

      <VariantLabel>Rang: <strong>{product.colors[activeColor].name}</strong></VariantLabel>
      <ColorRow>
        {product.colors.map((c, i) => (
          <ColorBtn key={i} color={c.hex} active={i === activeColor}
            onClick={() => onColorChange(i)} title={c.name} />
        ))}
      </ColorRow>

      <VariantLabel>Xotira</VariantLabel>
      <OptionRow>
        {product.memory.map((m, i) => (
          <OptionBtn key={i} active={i === activeMemory} onClick={() => onMemoryChange(i)}>{m}</OptionBtn>
        ))}
      </OptionRow>

      <BtnRow>
        <AddToCartBtn>
          <ShoppingCartOutlinedIcon sx={{ fontSize: 18 }} />
          Savatchaga qo'shish
        </AddToCartBtn>
        <WishBtn wished={wished} onClick={onWish}>
          {wished ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </WishBtn>
      </BtnRow>

      <QuickBuyBtn>
        <BoltIcon sx={{ fontSize: 18 }} />
        Tez buyurtma
      </QuickBuyBtn>

      <DeliveryRow>
        <DeliveryItem>
          <LocalShippingOutlinedIcon />
          <div>
            <DeliveryTitle>Yetkazib berish</DeliveryTitle>
            <DeliveryDesc>Toshkent bo'ylab 1 kun ichida</DeliveryDesc>
          </div>
        </DeliveryItem>
        <DeliveryItem>
          <StoreOutlinedIcon />
          <div>
            <DeliveryTitle>Do'kondan olish</DeliveryTitle>
            <DeliveryDesc>Bugun tayyor, 5 do'kon</DeliveryDesc>
          </div>
        </DeliveryItem>
      </DeliveryRow>
    </Card>
  );
}