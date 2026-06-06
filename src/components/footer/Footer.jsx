// src/components/footer/Footer.jsx
import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/global";
import { useTranslation } from "react-i18next";
import { Logo } from "../../assets/img/img";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const FooterWrap = styled.footer`
  background:${colors.dark};color:#fff;padding:60px 0 0;
`;

const Grid = styled.div`
  display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;
  @media(max-width:900px){grid-template-columns:1fr 1fr}
  @media(max-width:600px){grid-template-columns:1fr}
`;

const LogoImg = styled.img`width:120px;height:auto;filter:brightness(10);margin-bottom:16px`;

const FooterDesc = styled.p`font-size:13px;color:#94a3b8;line-height:1.7;margin-bottom:20px`;

const SocialRow = styled.div`display:flex;gap:10px`;

const SocialBtn = styled.a`
  width:36px;height:36px;border-radius:10px;
  background:rgba(255,255,255,0.08);
  display:flex;align-items:center;justify-content:center;
  transition:all 0.2s;cursor:pointer;text-decoration:none;
  svg{font-size:18px;color:#94a3b8}
  &:hover{background:${colors.primary};svg{color:#fff}}
`;

const ColTitle = styled.h4`
  font-size:14px;font-weight:700;color:#fff;
  margin-bottom:16px;
`;

const ColList = styled.ul`list-style:none;display:flex;flex-direction:column;gap:10px`;

const ColItem = styled.li`
  font-size:13px;color:#94a3b8;cursor:pointer;
  display:flex;align-items:center;gap:8px;
  transition:color 0.2s;
  &:hover{color:#fff}
  svg{font-size:15px;flex-shrink:0}
`;

const Divider = styled.div`height:1px;background:rgba(255,255,255,0.08);margin-top:40px`;

const Bottom = styled.div`
  padding:20px 0;
  display:flex;align-items:center;justify-content:space-between;
  flex-wrap:wrap;gap:12px;
`;

const Copyright = styled.p`font-size:12px;color:#64748b`;

export default function Footer() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] || "uz";

  const catalog = {
    uz: ["Telefonlar", "Noutbuklar", "Smart Watch", "Aksessuarlar", "Barchasi"],
    ru: ["Телефоны", "Ноутбуки", "Smart Watch", "Аксессуары", "Все"],
    en: ["Phones", "Laptops", "Smart Watch", "Accessories", "All"],
  };

  const info = {
    uz: ["Biz haqimizda", "Yetkazib berish", "Kafolat", "To'lov usullari", "Qaytarish"],
    ru: ["О нас", "Доставка", "Гарантия", "Оплата", "Возврат"],
    en: ["About us", "Delivery", "Warranty", "Payment", "Returns"],
  };

  const t = {
    desc: {
      uz: "Premium texnika do'koni. Siz uchun faqat eng yaxshisi.",
      ru: "Премиум магазин техники. Только лучшее для вас.",
      en: "Premium tech store. Only the best for you.",
    },
    catalog: { uz: "Katalog", ru: "Каталог", en: "Catalog" },
    info: { uz: "Ma'lumot", ru: "Информация", en: "Information" },
    contacts: { uz: "Aloqa", ru: "Контакты", en: "Contacts" },
    rights: { uz: "© 2026 Texnomarkaz. Barcha huquqlar himoyalangan.", ru: "© 2026 Texnomarkaz. Все права защищены.", en: "© 2026 Texnomarkaz. All rights reserved." },
  };

  return (
    <FooterWrap>
      <div className="container">
        <Grid>
          <div>
            <LogoImg src={Logo} alt="Logo" />
            <FooterDesc>{t.desc[lang]}</FooterDesc>
            <SocialRow>
              <SocialBtn href="https://t.me" target="_blank"><TelegramIcon /></SocialBtn>
              <SocialBtn href="https://instagram.com" target="_blank"><InstagramIcon /></SocialBtn>
              <SocialBtn href="https://facebook.com" target="_blank"><FacebookIcon /></SocialBtn>
              <SocialBtn href="https://youtube.com" target="_blank"><YouTubeIcon /></SocialBtn>
            </SocialRow>
          </div>
          <div>
            <ColTitle>{t.catalog[lang]}</ColTitle>
            <ColList>
              {catalog[lang].map((item, i) => <ColItem key={i}>{item}</ColItem>)}
            </ColList>
          </div>
          <div>
            <ColTitle>{t.info[lang]}</ColTitle>
            <ColList>
              {info[lang].map((item, i) => <ColItem key={i}>{item}</ColItem>)}
            </ColList>
          </div>
          <div>
            <ColTitle>{t.contacts[lang]}</ColTitle>
            <ColList>
              <ColItem><PhoneIcon /> +998 71 200 00 20</ColItem>
              <ColItem><EmailIcon /> info@texnomarkaz.uz</ColItem>
              <ColItem><LocationOnIcon /> Toshkent, Chilonzor tumani, Bunyodkor ko'chasi, 17</ColItem>
            </ColList>
          </div>
        </Grid>
        <Divider />
        <Bottom>
          <Copyright>{t.rights[lang]}</Copyright>
          <Copyright>Made with ❤️ in Uzbekistan</Copyright>
        </Bottom>
      </div>
    </FooterWrap>
  );
}