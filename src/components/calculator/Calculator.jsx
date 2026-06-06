// src/components/calculator/Calculator.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../styles/global";
import { useTranslation } from "react-i18next";

const Section = styled.section`padding:60px 0;background:#fff`;

const Inner = styled.div`
  background:linear-gradient(135deg,${colors.primaryLight} 0%,#f0f9ff 100%);
  border-radius:24px;padding:40px;
  display:grid;grid-template-columns:1fr 1fr;gap:40px;
  align-items:center;
  @media(max-width:768px){grid-template-columns:1fr;gap:24px}
`;

const Left = styled.div``;

const Title = styled.h2`
  font-size:clamp(20px,3vw,28px);font-weight:800;
  color:${colors.dark};margin-bottom:8px;
`;

const Desc = styled.p`font-size:14px;color:${colors.gray};margin-bottom:24px`;

const ProductCard = styled.div`
  display:flex;align-items:center;gap:16px;
  background:#fff;border-radius:14px;padding:16px;
  border:1.5px solid ${colors.border};
`;

const ProductImg = styled.img`width:70px;height:70px;object-fit:contain`;

const ProductInfo = styled.div`flex:1`;
const ProductName = styled.p`font-size:14px;font-weight:700;color:${colors.dark}`;
const ProductSpec = styled.p`font-size:12px;color:${colors.gray}`;
const ProductPrice = styled.p`font-size:15px;font-weight:700;color:${colors.primary};margin-top:4px`;

const Right = styled.div``;

const MonthsRow = styled.div`
  display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;
`;

const MonthBtn = styled.button`
  flex:1;min-width:60px;
  padding:10px 0;
  background:${({active}) => active ? colors.primary : "#fff"};
  color:${({active}) => active ? "#fff" : colors.gray};
  border:1.5px solid ${({active}) => active ? colors.primary : colors.border};
  border-radius:10px;font-size:14px;font-weight:600;
  cursor:pointer;transition:all 0.2s;font-family:'Inter',sans-serif;
  &:hover{border-color:${colors.primary};color:${({active}) => active ? "#fff" : colors.primary}}
`;

const ResultBox = styled.div`
  background:#fff;border-radius:14px;padding:20px;
  border:1.5px solid ${colors.border};margin-bottom:16px;
`;

const ResultLabel = styled.p`font-size:12px;color:${colors.gray};margin-bottom:4px`;
const ResultValue = styled.p`font-size:28px;font-weight:800;color:${colors.primary}`;

const ApplyBtn = styled.button`
  width:100%;
  background:${colors.primary};color:#fff;
  border:none;border-radius:12px;padding:14px;
  font-size:15px;font-weight:600;cursor:pointer;
  transition:all 0.2s;font-family:'Inter',sans-serif;
  &:hover{background:${colors.primaryDark};transform:translateY(-1px);box-shadow:0 6px 20px rgba(37,99,235,0.3)}
`;

const months = [3, 6, 12, 24];

export default function Calculator() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] || "uz";
  const [selected, setSelected] = useState(6);

  const price = 15999000;
  const monthly = Math.round(price / selected);

  const t = {
    title: { uz: "Muddatli to'lov kalkulyatori", ru: "Калькулятор рассрочки", en: "Installment Calculator" },
    desc: { uz: "O'zingizga qulay muddatni tanlang", ru: "Выберите удобный срок", en: "Choose a convenient term" },
    monthly: { uz: "Oyiga to'lov", ru: "В месяц", en: "Monthly payment" },
    apply: { uz: "Ariza qoldirish", ru: "Оставить заявку", en: "Apply now" },
    month: { uz: "oy", ru: "мес", en: "mo" },
  };

  return (
    <Section>
      <div className="container">
        <Inner>
          <Left>
            <Title>{t.title[lang]}</Title>
            <Desc>{t.desc[lang]}</Desc>
            <ProductCard>
              <ProductImg
                src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=300&hei=300&fmt=p-jpg&qlt=80"
                alt="iPhone"
              />
              <ProductInfo>
                <ProductName>iPhone 15 Pro Max</ProductName>
                <ProductSpec>256GB · Natural Titanium</ProductSpec>
                <ProductPrice>15 999 000 so'm</ProductPrice>
              </ProductInfo>
            </ProductCard>
          </Left>
          <Right>
            <MonthsRow>
              {months.map((m) => (
                <MonthBtn key={m} active={selected === m} onClick={() => setSelected(m)}>
                  {m} {t.month[lang]}
                </MonthBtn>
              ))}
            </MonthsRow>
            <ResultBox>
              <ResultLabel>{t.monthly[lang]}</ResultLabel>
              <ResultValue>{monthly.toLocaleString()} so'm</ResultValue>
            </ResultBox>
            <ApplyBtn>{t.apply[lang]}</ApplyBtn>
          </Right>
        </Inner>
      </div>
    </Section>
  );
}