// src/components/reviews/Reviews.jsx
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { colors } from "../../styles/global";
import { useTranslation } from "react-i18next";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Section = styled.section`padding:60px 0;background:${colors.grayLight}`;

const SectionTop = styled.div`
  text-align:center;margin-bottom:40px;
`;

const Title = styled.h2`
  font-size:clamp(20px,3vw,28px);font-weight:800;color:${colors.dark};margin-bottom:8px;
`;

const Subtitle = styled.p`font-size:14px;color:${colors.gray}`;

const Grid = styled.div`
  display:grid;grid-template-columns:repeat(3,1fr);gap:20px;
  @media(max-width:900px){grid-template-columns:repeat(2,1fr)}
  @media(max-width:600px){grid-template-columns:1fr}
`;

const Card = styled.div`
  background:#fff;border-radius:16px;padding:24px;
  border:1.5px solid ${colors.border};
  transition:all 0.2s;
  &:hover{box-shadow:0 8px 24px rgba(0,0,0,0.08);transform:translateY(-2px)}
`;

const Stars = styled.div`
  display:flex;gap:2px;margin-bottom:12px;
  svg{color:#f59e0b;font-size:16px}
`;

const ReviewText = styled.p`
  font-size:13px;color:${colors.gray};line-height:1.7;margin-bottom:16px;
`;

const Reviewer = styled.div`display:flex;align-items:center;gap:12px`;

const Avatar = styled.div`
  width:40px;height:40px;border-radius:50%;
  background:${colors.primary};
  display:flex;align-items:center;justify-content:center;
  font-size:16px;font-weight:700;color:#fff;flex-shrink:0;
`;

const ReviewerName = styled.p`font-size:14px;font-weight:600;color:${colors.dark}`;
const ReviewerProduct = styled.p`font-size:12px;color:${colors.gray}`;

const reviews = [
  { name: "Alisher T.", product: "iPhone 15 Pro Max", text: { uz: "Juda zo'r xizmat! 1 kunda yetkazib berishdi. Mahsulot original, kafolat ham bor. Tavsiya qilaman!", ru: "Отличный сервис! Доставили за 1 день. Товар оригинальный, есть гарантия. Рекомендую!", en: "Great service! Delivered in 1 day. Original product with warranty. Highly recommend!" }, stars: 5, avatar: "A" },
  { name: "Sevinch R.", product: "Samsung Galaxy S24", text: { uz: "Muddatli to'lov juda qulay bo'ldi. Telefon ayni vaqtida, va xodimlari aldo darajada!", ru: "Рассрочка очень удобная. Телефон получила вовремя, персонал на высшем уровне!", en: "Installment is very convenient. Got the phone on time, staff is excellent!" }, stars: 5, avatar: "S" },
  { name: "Sarvar B.", product: "MacBook Pro M3", text: { uz: "Do'kon atmosferasi zo'r, xodimlar professional. Apple ekotizimi uchun eng yaxshi tanlov!", ru: "Атмосфера магазина отличная, сотрудники профессиональные. Лучший выбор для Apple!", en: "Great store atmosphere, professional staff. Best choice for Apple ecosystem!" }, stars: 5, avatar: "S" },
  { name: "Diyorbek M.", product: "Honor Magic6 Pro", text: { uz: "Honor Magic6 Pro oldim, telefon zo'r ishlaydi. Yetkazib berish tez va ishonchli.", ru: "Купил Honor Magic6 Pro, телефон работает отлично. Доставка быстрая и надёжная.", en: "Bought Honor Magic6 Pro, phone works great. Fast and reliable delivery." }, stars: 4, avatar: "D" },
  { name: "Malika X.", product: "AirPods Pro 2", text: { uz: "AirPods Pro 2 original ekan, ovozi ajoyib. Do'kondan xursand qoldim!", ru: "AirPods Pro 2 оригинальные, звук замечательный. Довольна магазином!", en: "AirPods Pro 2 are original, sound is amazing. Very happy with the store!" }, stars: 5, avatar: "M" },
  { name: "Jasur K.", product: "iPad Air M2", text: { uz: "iPad Air M2 olish uchun eng yaxshi joy. Narxi ham raqobatbardosh, sifat zo'r!", ru: "Лучшее место для покупки iPad Air M2. Цена конкурентная, качество отличное!", en: "Best place to buy iPad Air M2. Competitive price, great quality!" }, stars: 5, avatar: "J" },
];

export default function Reviews() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] || "uz";

  const t = {
    title: { uz: "Mijozlarimiz fikri", ru: "Отзывы клиентов", en: "Customer Reviews" },
    subtitle: { uz: "Minglab mamnun mijozlarimiz", ru: "Тысячи довольных клиентов", en: "Thousands of satisfied customers" },
  };

  return (
    <Section>
      <div className="container">
        <SectionTop>
          <Title>{t.title[lang]}</Title>
          <Subtitle>{t.subtitle[lang]}</Subtitle>
        </SectionTop>
        <Grid>
          {reviews.map((r, i) => (
            <Card key={i}>
              <Stars>{[...Array(r.stars)].map((_, j) => <StarIcon key={j} />)}</Stars>
              <ReviewText>"{r.text[lang]}"</ReviewText>
              <Reviewer>
                <Avatar>{r.avatar}</Avatar>
                <div>
                  <ReviewerName>{r.name}</ReviewerName>
                  <ReviewerProduct>{r.product}</ReviewerProduct>
                </div>
              </Reviewer>
            </Card>
          ))}
        </Grid>
      </div>
    </Section>
  );
}