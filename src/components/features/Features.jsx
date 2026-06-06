// src/components/features/Features.jsx
import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/global";
import { useTranslation } from "react-i18next";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";

const Section = styled.section`
  padding:40px 0;background:${colors.grayLight};
  border-top:1px solid ${colors.border};border-bottom:1px solid ${colors.border};
`;

const Grid = styled.div`
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:24px;
  @media(max-width:900px){grid-template-columns:repeat(2,1fr)}
  @media(max-width:480px){grid-template-columns:1fr}
`;

const Item = styled.div`
  display:flex;align-items:center;gap:16px;
  background:#fff;border-radius:14px;padding:20px;
  border:1.5px solid ${colors.border};
  transition:all 0.2s;
  &:hover{border-color:${colors.primary};box-shadow:0 4px 16px rgba(37,99,235,0.08)}
`;

const IconBox = styled.div`
  width:48px;height:48px;flex-shrink:0;
  background:${colors.primaryLight};border-radius:12px;
  display:flex;align-items:center;justify-content:center;
  svg{color:${colors.primary};font-size:24px}
`;

const ItemTitle = styled.p`font-size:14px;font-weight:700;color:${colors.dark};margin-bottom:4px`;
const ItemDesc = styled.p`font-size:12px;color:${colors.gray};line-height:1.5`;

const features = [
  {
    icon: <LocalShippingOutlinedIcon />,
    title: { uz: "Tez yetkazib berish", ru: "Быстрая доставка", en: "Fast Delivery" },
    desc: { uz: "Butun O'zbekiston bo'ylab 1 kun ichida", ru: "По всему Узбекистану за 1 день", en: "Across Uzbekistan in 1 day" },
  },
  {
    icon: <VerifiedOutlinedIcon />,
    title: { uz: "Original mahsulotlar", ru: "Оригинальные товары", en: "Original Products" },
    desc: { uz: "Barcha mahsulotlar 100% original", ru: "Все товары 100% оригинал", en: "All products 100% original" },
  },
  {
    icon: <CreditCardOutlinedIcon />,
    title: { uz: "Muddatli to'lov", ru: "Рассрочка", en: "Installment" },
    desc: { uz: "3, 6, 12, 24 oyga muddatli to'lov", ru: "Рассрочка на 3, 6, 12, 24 месяца", en: "3, 6, 12, 24 months installment" },
  },
  {
    icon: <HeadsetMicOutlinedIcon />,
    title: { uz: "24/7 qo'llab-quvvatlash", ru: "Поддержка 24/7", en: "24/7 Support" },
    desc: { uz: "Savollaringiz uchun har doim yordamiz", ru: "Всегда готовы помочь", en: "Always here to help" },
  },
];

export default function Features() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] || "uz";

  return (
    <Section>
      <div className="container">
        <Grid>
          {features.map((f, i) => (
            <Item key={i}>
              <IconBox>{f.icon}</IconBox>
              <div>
                <ItemTitle>{f.title[lang]}</ItemTitle>
                <ItemDesc>{f.desc[lang]}</ItemDesc>
              </div>
            </Item>
          ))}
        </Grid>
      </div>
    </Section>
  );
}