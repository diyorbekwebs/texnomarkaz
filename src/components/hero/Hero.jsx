// src/components/hero/Hero.jsx
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { colors } from "../../styles/global";
import { useTranslation } from "react-i18next";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

const fadeInLeft = keyframes`
  from{opacity:0;transform:translateX(-30px)}
  to{opacity:1;transform:translateX(0)}
`;
const fadeInRight = keyframes`
  from{opacity:0;transform:translateX(30px)}
  to{opacity:1;transform:translateX(0)}
`;
const float = keyframes`
  0%,100%{transform:translateY(0)}
  50%{transform:translateY(-12px)}
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #f8faff 0%, #eff6ff 50%, #f0f9ff 100%);
  padding: 60px 0 0;
  overflow: hidden;
  position: relative;
  min-height: 520px;
  @media(max-width:768px){padding:40px 0 0;min-height:auto}
`;

const HeroInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  @media(max-width:900px){flex-direction:column;text-align:center}
`;

const HeroLeft = styled.div`
  flex: 1;
  animation: ${fadeInLeft} 0.6s ease;
`;

const HeroRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  animation: ${fadeInRight} 0.6s ease;
`;

const HeroImg = styled.img`
  width: 100%;
  max-width: 520px;
  animation: ${float} 4s ease-in-out infinite;
  filter: drop-shadow(0 20px 40px rgba(37,99,235,0.15));
  @media(max-width:768px){max-width:300px}
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${colors.primaryLight};
  color: ${colors.primary};
  font-size: 12px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 20px;
  margin-bottom: 20px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 800;
  color: ${colors.dark};
  line-height: 1.15;
  margin-bottom: 16px;
  span {
    color: ${colors.primary};
    display: block;
  }
`;

const HeroDesc = styled.p`
  font-size: 15px;
  color: ${colors.gray};
  line-height: 1.7;
  max-width: 440px;
  margin-bottom: 32px;
  @media(max-width:900px){margin:0 auto 32px}
`;

const HeroButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  @media(max-width:900px){justify-content:center}
`;

const BtnPrimary = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${colors.primary};
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Inter', sans-serif;
  &:hover{background:${colors.primaryDark};transform:translateY(-2px);box-shadow:0 8px 24px rgba(37,99,235,0.3)}
  &:active{transform:translateY(0)}
`;

const BtnSecondary = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  color: ${colors.dark};
  border: 2px solid ${colors.border};
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Inter', sans-serif;
  &:hover{border-color:${colors.primary};color:${colors.primary}}
`;

const HeroFeatures = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 40px;
  flex-wrap: wrap;
  @media(max-width:900px){justify-content:center}
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: ${colors.gray};
  svg{color:${colors.primary};font-size:18px}
`;

const SliderDots = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media(max-width:768px){display:none}
`;

const Dot = styled.div`
  width: 8px;
  height: ${({active}) => active ? "24px" : "8px"};
  background: ${({active}) => active ? colors.primary : "#d1d5db"};
  border-radius: 4px;
  transition: all 0.3s;
  cursor: pointer;
`;

const slides = [
  {
    badge: { uz: "PREMIUM TEXNIKA DO'KONI", ru: "ПРЕМИУМ МАГАЗИН", en: "PREMIUM TECH STORE" },
    title: { uz: ["Kelajak", "Qo'lingizda"], ru: ["Будущее", "В ваших руках"], en: ["Future", "In Your Hands"] },
    desc: {
      uz: "Dunyodagi eng yaxshi brendlar, original kafolat va eng tez yetkazib berish.",
      ru: "Лучшие мировые бренды, оригинальная гарантия и быстрая доставка.",
      en: "World's best brands, original warranty and fastest delivery.",
    },
    img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009286523",
  },
];

export default function Hero() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] || "uz";
  const [active, setActive] = useState(0);
  const slide = slides[active];

  const features = [
    { icon: <VerifiedIcon />, label: { uz: "Original mahsulotlar", ru: "Оригинал", en: "Original products" } },
    { icon: <WorkspacePremiumOutlinedIcon />, label: { uz: "Rasmiy kafolat", ru: "Гарантия", en: "Official warranty" } },
    { icon: <LocalShippingOutlinedIcon />, label: { uz: "Tez yetkazib berish", ru: "Быстрая доставка", en: "Fast delivery" } },
  ];

  return (
    <HeroSection>
      <div className="container">
        <HeroInner>
          <HeroLeft>
            <Badge>⚡ {slide.badge[lang]}</Badge>
            <HeroTitle>
              {slide.title[lang][0]}
              <span>{slide.title[lang][1]}</span>
            </HeroTitle>
            <HeroDesc>{slide.desc[lang]}</HeroDesc>
            <HeroButtons>
              <BtnPrimary>
                {lang === "uz" ? "Xarid qilish" : lang === "ru" ? "Купить" : "Shop now"}
                <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </BtnPrimary>
              <BtnSecondary>
                {lang === "uz" ? "Katalogni ko'rish" : lang === "ru" ? "Каталог" : "View catalog"}
              </BtnSecondary>
            </HeroButtons>
            <HeroFeatures>
              {features.map((f, i) => (
                <FeatureItem key={i}>
                  {f.icon} {f.label[lang]}
                </FeatureItem>
              ))}
            </HeroFeatures>
          </HeroLeft>
          <HeroRight>
            <HeroImg src={slide.img} alt="hero" />
          </HeroRight>
        </HeroInner>
      </div>
      <SliderDots>
        {slides.map((_, i) => (
          <Dot key={i} active={i === active} onClick={() => setActive(i)} />
        ))}
      </SliderDots>
    </HeroSection>
  );
}