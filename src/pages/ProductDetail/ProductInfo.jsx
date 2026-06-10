import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/global";
import StarIcon from "@mui/icons-material/Star";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import CachedIcon from "@mui/icons-material/Cached";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

const Wrap = styled.div``;

const ProductBadge = styled.span`
  display: inline-block;
  background: ${colors.primaryLight}; color: ${colors.primary};
  font-size: 11px; font-weight: 700;
  padding: 4px 10px; border-radius: 8px;
  margin-bottom: 10px; text-transform: uppercase;
`;

const Title = styled.h1`
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 800; color: ${colors.dark};
  line-height: 1.2; margin-bottom: 8px;
`;

const Spec = styled.p`font-size: 14px; color: ${colors.gray}; margin-bottom: 14px;`;

const RatingRow = styled.div`
  display: flex; align-items: center;
  gap: 10px; margin-bottom: 20px; flex-wrap: wrap;
`;

const Stars = styled.div`
  display: flex; align-items: center; gap: 2px;
  svg { font-size: 16px; }
`;

const RatingScore = styled.span`font-size: 14px; font-weight: 700; color: ${colors.dark};`;
const ReviewCount = styled.span`font-size: 13px; color: ${colors.gray}; cursor: pointer; &:hover { color: ${colors.primary}; }`;
const SKU = styled.span`font-size: 12px; color: #aaa; padding-left: 10px; border-left: 1px solid ${colors.border};`;

const FeaturesList = styled.div`display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;`;

const FeatureItem = styled.div`
  display: flex; align-items: center; gap: 10px;
  font-size: 13px; color: ${colors.gray};
  svg { color: ${colors.primary}; font-size: 18px; flex-shrink: 0; }
`;

const VariantLabel = styled.p`font-size: 13px; font-weight: 600; color: ${colors.dark}; margin-bottom: 10px;`;

const ColorRow = styled.div`display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap;`;

const ColorBtn = styled.button`
  width: 32px; height: 32px; border-radius: 50%;
  background: ${({ color }) => color};
  border: 3px solid ${({ active }) => active ? colors.primary : "transparent"};
  outline: 2px solid ${({ active }) => active ? colors.primary : colors.border};
  cursor: pointer; transition: all 0.2s;
  &:hover { outline-color: ${colors.primary}; }
`;

const OptionRow = styled.div`display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap;`;

const OptionBtn = styled.button`
  padding: 8px 18px; border-radius: 10px;
  border: 1.5px solid ${({ active }) => active ? colors.primary : colors.border};
  background: ${({ active }) => active ? colors.primaryLight : "#fff"};
  color: ${({ active }) => active ? colors.primary : colors.dark};
  font-size: 13px; font-weight: 600; cursor: pointer;
  font-family: 'Inter', sans-serif; transition: all 0.2s;
  &:hover { border-color: ${colors.primary}; color: ${colors.primary}; }
`;

const featureIcons = [<VerifiedOutlinedIcon />, <CachedIcon />, <ShieldOutlinedIcon />];

export default function ProductInfo({
  product, lang,
  activeColor, onColorChange,
  activeMemory, onMemoryChange,
  activeSim, onSimChange,
}) {
  return (
    <Wrap>
      <ProductBadge>{product.badge[lang]}</ProductBadge>
      <Title>{product.name}</Title>
      <Spec>{product.spec[lang]}</Spec>

      <RatingRow>
        <Stars>
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} sx={{ color: i < Math.floor(product.rating) ? "#f59e0b" : "#e2e8f0" }} />
          ))}
        </Stars>
        <RatingScore>{product.rating}</RatingScore>
        <ReviewCount>({product.reviews} sharh)</ReviewCount>
        <SKU>SKU: {product.sku}</SKU>
      </RatingRow>

      <FeaturesList>
        {product.features.map((f, i) => (
          <FeatureItem key={i}>
            {featureIcons[i]} {f[lang]}
          </FeatureItem>
        ))}
      </FeaturesList>

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

      <VariantLabel>SIM karta</VariantLabel>
      <OptionRow>
        {product.sim.map((s, i) => (
          <OptionBtn key={i} active={i === activeSim} onClick={() => onSimChange(i)}>{s}</OptionBtn>
        ))}
      </OptionRow>
    </Wrap>
  );
}