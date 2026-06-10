import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { colors } from "../../styles/global";

const fadeIn = keyframes`from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}`;

const TabsRow = styled.div`
  display: flex; gap: 0;
  border-bottom: 2px solid ${colors.border};
  margin-bottom: 24px; overflow-x: auto;
  &::-webkit-scrollbar { display: none; }
`;

const Tab = styled.button`
  padding: 12px 20px;
  font-size: 14px; font-weight: 600;
  color: ${({ active }) => active ? colors.primary : colors.gray};
  border: none;
  border-bottom: 2px solid ${({ active }) => active ? colors.primary : "transparent"};
  background: transparent; cursor: pointer;
  font-family: 'Inter', sans-serif;
  transition: all 0.2s; white-space: nowrap; margin-bottom: -2px;
  &:hover { color: ${colors.primary}; }
`;

const Content = styled.div`
  background: #fff; border-radius: 16px; padding: 28px;
  border: 1.5px solid ${colors.border};
  animation: ${fadeIn} 0.3s ease;
`;

const DescTitle = styled.h3`font-size: 20px; font-weight: 800; color: ${colors.dark}; margin-bottom: 12px;`;
const DescText = styled.p`font-size: 14px; color: ${colors.gray}; line-height: 1.8; margin-bottom: 20px;`;

const SpecGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
  @media(max-width: 600px) { grid-template-columns: 1fr; }
`;

const SpecRow = styled.div`
  display: flex; align-items: center; gap: 8px;
  padding: 10px 14px; background: ${colors.grayLight};
  border-radius: 10px; font-size: 13px; color: ${colors.dark};
`;

export default function ProductTabs({ product, lang }) {
  const [activeTab, setActiveTab] = useState("desc");

  const tabs = [
    { key: "desc", label: { uz: "Umumiy ma'lumot", ru: "Описание", en: "Overview" } },
    { key: "specs", label: { uz: "Xususiyatlari", ru: "Характеристики", en: "Specs" } },
    { key: "delivery", label: { uz: "Yetkazib berish", ru: "Доставка", en: "Delivery" } },
    { key: "payment", label: { uz: "To'lov", ru: "Оплата", en: "Payment" } },
    { key: "reviews", label: { uz: `Sharhlar (${product.reviews})`, ru: `Отзывы (${product.reviews})`, en: `Reviews (${product.reviews})` } },
    { key: "qa", label: { uz: "Savol-javob", ru: "Вопросы", en: "Q&A" } },
  ];

  return (
    <div>
      <TabsRow>
        {tabs.map((t) => (
          <Tab key={t.key} active={activeTab === t.key} onClick={() => setActiveTab(t.key)}>
            {t.label[lang]}
          </Tab>
        ))}
      </TabsRow>
      <Content key={activeTab}>
        {activeTab === "desc" && (
          <>
            <DescTitle>Titan darajasidagi kuch.</DescTitle>
            <DescText>{product.desc[lang]}</DescText>
            <SpecGrid>
              {product.specs.map((s, i) => <SpecRow key={i}>✓ {s}</SpecRow>)}
            </SpecGrid>
          </>
        )}
        {activeTab === "specs" && (
          <SpecGrid>
            {product.specs.map((s, i) => <SpecRow key={i}>✓ {s}</SpecRow>)}
          </SpecGrid>
        )}
        {activeTab === "delivery" && (
          <>
            <DescTitle>Yetkazib berish</DescTitle>
            <DescText>Toshkent bo'ylab 1 kun ichida yetkazib beramiz. Viloyatlarga 2-3 kun.</DescText>
          </>
        )}
        {activeTab === "payment" && (
          <>
            <DescTitle>To'lov usullari</DescTitle>
            <DescText>Naqd pul, bank kartasi, muddatli to'lov (3, 6, 12, 24 oy) imkoniyati mavjud.</DescText>
          </>
        )}
        {activeTab === "reviews" && (
          <DescText>Sharhlar bo'limi tez orada qo'shiladi.</DescText>
        )}
        {activeTab === "qa" && (
          <DescText>Savol-javob bo'limi tez orada qo'shiladi.</DescText>
        )}
      </Content>
    </div>
  );
}