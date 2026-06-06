import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../styles/global";
import { useTranslation } from "react-i18next";

const Section = styled.section`
  padding: 40px 0;
  background: #fff;
`;

const TabsRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 28px;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  border: 1.5px solid ${({ active }) => active ? colors.primary : colors.border};
  background: ${({ active }) => active ? colors.primaryLight : "#fff"};
  color: ${({ active }) => active ? colors.primary : colors.gray};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  transition: all 0.2s;
  &:hover {
    border-color: ${colors.primary};
    color: ${colors.primary};
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
  align-items: start;
  @media(max-width: 768px) { grid-template-columns: 1fr; }
`;

const ContentLeft = styled.div``;

const ContentTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.dark};
  margin-bottom: 10px;
  line-height: 1.5;
`;

const ContentDesc = styled.p`
  font-size: 13px;
  color: ${colors.gray};
  line-height: 1.7;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  @media(max-width: 1100px) { grid-template-columns: repeat(4, 1fr); }
  @media(max-width: 768px) { grid-template-columns: repeat(3, 1fr); }
  @media(max-width: 480px) { grid-template-columns: repeat(2, 1fr); }
`;

const ProductCard = styled.div`
  border: 1.5px solid ${colors.border};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  background: #fff;
  &:hover {
    border-color: ${colors.primary};
    box-shadow: 0 4px 16px rgba(37,99,235,0.1);
    transform: translateY(-2px);
  }
`;

const ProductImgBox = styled.div`
  background: ${colors.grayLight};
  padding: 12px;
  position: relative;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const TejamBadge = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  background: #ef4444;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 6px;
`;

const ProductInfo = styled.div`padding: 10px`;

const ProductName = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.dark};
  margin-bottom: 6px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceRow = styled.div`display: flex; flex-direction: column; gap: 2px;`;

const OldPrice = styled.span`
  font-size: 11px;
  color: #aaa;
  text-decoration: line-through;
`;

const NewPrice = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${colors.primary};
`;

const tabs = [
  {
    id: 1,
    label: { uz: "Maktab o'quvchilari va talabalar uchun", ru: "Для школьников и студентов", en: "For students" },
    title: { uz: "Eng so'nggi smartfon aksessuarlari va qurilmalari bilan videografiyangizni yaxshilang!", ru: "Улучшите свою видеографию!", en: "Upgrade your videography!" },
    desc: {
      uz: "Videografiyangizni keyingi bosqichga olib chiqishga tayyormisiz? Boshqa qaramang! Biz smartfon uchun zarur aksessuarlarning keng assortimentini va video suratga olish tajribangizni yaxshilash uchun eng yangi smartfonlarni taklif etamiz.",
      ru: "Готовы вывести видеографию на новый уровень? Мы предлагаем широкий ассортимент аксессуаров для смартфонов.",
      en: "Ready to take your videography to the next level? We offer a wide range of smartphone accessories.",
    },
    products: [
      { id: 1, name: "Apple iPhone 13 smartfoni", price: "6 990 000", oldPrice: "7 600 000", tejam: "8%", img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-6-1inch-midnight?wid=400&hei=400&fmt=p-jpg" },
      { id: 2, name: "Apple Mac mini M2 ish stoli kompyuteri", price: "9 372 000", oldPrice: null, tejam: null, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-mini-hero-202301?wid=400&hei=400&fmt=jpeg" },
      { id: 3, name: "Noutbuk Apple MacBook Air 13 dyuymli M1", price: "9 792 000", oldPrice: null, tejam: null, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=400&hei=400&fmt=jpeg" },
      { id: 4, name: "iPhone 16", price: "11 299 000", oldPrice: "12 399 000", tejam: "9%", img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=400&hei=400&fmt=p-jpg" },
      { id: 5, name: "iPhone 16 Plus", price: "14 160 000", oldPrice: null, tejam: null, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-plus-finish-select-202409-6-7inch-black?wid=400&hei=400&fmt=p-jpg" },
      { id: 6, name: "iPhone 16e", price: "10 390 000", oldPrice: null, tejam: null, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16e-finish-select-202502-6-1inch-black?wid=400&hei=400&fmt=p-jpg" },
    ],
  },
  {
    id: 2,
    label: { uz: "O'rnatish va dizayn", ru: "Установка и дизайн", en: "Setup & Design" },
    title: { uz: "Professional o'rnatish xizmatlari", ru: "Профессиональные услуги установки", en: "Professional installation services" },
    desc: { uz: "Qurilmalaringizni professional tarzda sozlash va o'rnatish xizmatlarini taqdim etamiz.", ru: "Предоставляем услуги профессиональной настройки устройств.", en: "We provide professional device setup and installation services." },
    products: [
      { id: 7, name: "iPhone 16 Pro", price: "17 500 000", oldPrice: null, tejam: null, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-deserttitanium?wid=400&hei=400&fmt=p-jpg" },
      { id: 8, name: "MacBook Pro 14\"", price: "22 999 000", oldPrice: null, tejam: null, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202310?wid=400&hei=400&fmt=jpeg" },
    ],
  },
  {
    id: 3,
    label: { uz: "Marketing", ru: "Маркетинг", en: "Marketing" },
    title: { uz: "Marketing uchun eng yaxshi qurilmalar", ru: "Лучшие устройства для маркетинга", en: "Best devices for marketing" },
    desc: { uz: "Marketing mutaxassislari uchun maxsus tanlangan qurilmalar va aksessuarlar.", ru: "Специально подобранные устройства для маркетологов.", en: "Specially selected devices for marketing professionals." },
    products: [
      { id: 9, name: "iPad Pro M4", price: "16 500 000", oldPrice: null, tejam: null, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-13-select-wifi-spacegray-202405?wid=400&hei=400&fmt=jpeg" },
      { id: 10, name: "Apple Pencil Pro", price: "1 890 000", oldPrice: "2 100 000", tejam: "10%", img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQGU3?wid=400&hei=400&fmt=jpeg" },
    ],
  },
  {
    id: 4,
    label: { uz: "IT dasturlash", ru: "IT разработка", en: "IT Development" },
    title: { uz: "IT dasturchilar uchun qurilmalar", ru: "Устройства для IT-разработчиков", en: "Devices for IT developers" },
    desc: { uz: "Dasturchilar va IT mutaxassislari uchun maxsus tanlangan yuqori unumli qurilmalar.", ru: "Высокопроизводительные устройства для разработчиков.", en: "High-performance devices for developers and IT professionals." },
    products: [
      { id: 11, name: "MacBook Pro 16\" M3 Max", price: "32 999 000", oldPrice: null, tejam: null, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spaceblack-select-202310?wid=400&hei=400&fmt=jpeg" },
      { id: 12, name: "Mac Studio M2 Ultra", price: "28 500 000", oldPrice: null, tejam: null, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-studio-select-202306?wid=400&hei=400&fmt=jpeg" },
    ],
  },
];

export default function TabsSection() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] || "uz";
  const [active, setActive] = useState(0);

  const current = tabs[active];

  return (
    <Section>
      <div className="container">
        <TabsRow>
          {tabs.map((tab, i) => (
            <Tab key={tab.id} active={i === active} onClick={() => setActive(i)}>
              {tab.label[lang]}
            </Tab>
          ))}
        </TabsRow>
        <Content>
          <ContentLeft>
            <ContentTitle>{current.title[lang]}</ContentTitle>
            <ContentDesc>{current.desc[lang]}</ContentDesc>
          </ContentLeft>
          <ProductsGrid>
            {current.products.map((p) => (
              <ProductCard key={p.id}>
                <ProductImgBox>
                  {p.tejam && <TejamBadge>{p.tejam} tejang</TejamBadge>}
                  <img src={p.img} alt={p.name} />
                </ProductImgBox>
                <ProductInfo>
                  <ProductName>{p.name}</ProductName>
                  <PriceRow>
                    {p.oldPrice && <OldPrice>{p.oldPrice} so'm</OldPrice>}
                    <NewPrice>{p.price} so'm</NewPrice>
                  </PriceRow>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductsGrid>
        </Content>
      </div>
    </Section>
  );
}