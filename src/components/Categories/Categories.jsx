import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/global";
import { useTranslation } from "react-i18next";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LaptopIcon from "@mui/icons-material/Laptop";
import TabletIcon from "@mui/icons-material/Tablet";
import WatchIcon from "@mui/icons-material/Watch";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import MemoryIcon from "@mui/icons-material/Memory";

const Section = styled.section`
  padding: 40px 0;
  background: ${colors.grayLight};
  border-top: 1px solid ${colors.border};
  border-bottom: 1px solid ${colors.border};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  @media(max-width: 900px) { grid-template-columns: repeat(3, 1fr); }
  @media(max-width: 480px) { grid-template-columns: repeat(2, 1fr); }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px 12px;
  background: #fff;
  border: 1.5px solid ${colors.border};
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    border-color: ${colors.primary};
    box-shadow: 0 4px 16px rgba(37,99,235,0.1);
    transform: translateY(-3px);
  }
`;

const IconBox = styled.div`
  width: 60px;
  height: 60px;
  background: ${colors.primaryLight};
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg { color: ${colors.primary}; font-size: 28px; }
  transition: all 0.2s;
  ${Card}:hover & {
    background: ${colors.primary};
    svg { color: #fff; }
  }
`;

const ImgBox = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  img { width: 100%; height: 100%; object-fit: contain; }
`;

const CatName = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: ${colors.dark};
  text-align: center;
`;

const categories = [
  { id: 1, name: { uz: "Smartfonlar", ru: "Смартфоны", en: "Smartphones" }, icon: <SmartphoneIcon />, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=200&hei=200&fmt=p-jpg" },
  { id: 2, name: { uz: "Kompyuterlar", ru: "Компьютеры", en: "Computers" }, icon: <LaptopIcon />, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202310?wid=200&hei=200&fmt=jpeg" },
  { id: 3, name: { uz: "Planshetlar", ru: "Планшеты", en: "Tablets" }, icon: <TabletIcon />, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-13-select-wifi-spacegray-202405?wid=200&hei=200&fmt=jpeg" },
  { id: 4, name: { uz: "Aqlli soat", ru: "Умные часы", en: "Smart Watch" }, icon: <WatchIcon />, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MR9A3?wid=200&hei=200&fmt=jpeg" },
  { id: 5, name: { uz: "Naushniklar", ru: "Наушники", en: "Headphones" }, icon: <HeadphonesIcon />, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=200&hei=200&fmt=jpeg" },
  { id: 6, name: { uz: "Aksessuarlar", ru: "Аксессуары", en: "Accessories" }, icon: <MemoryIcon />, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQGU3?wid=200&hei=200&fmt=jpeg" },
];

export default function Categories() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] || "uz";

  return (
    <Section>
      <div className="container">
        <Grid>
          {categories.map((cat) => (
            <Card key={cat.id}>
              <ImgBox>
                <img src={cat.img} alt={cat.name[lang]} />
              </ImgBox>
              <CatName>{cat.name[lang]}</CatName>
            </Card>
          ))}
        </Grid>
      </div>
    </Section>
  );
}