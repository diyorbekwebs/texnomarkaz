// src/components/brands/Brands.jsx
import React from "react";
import styled, { keyframes } from "styled-components";
import { colors } from "../../styles/global";

const scroll = keyframes`
  from{transform:translateX(0)}
  to{transform:translateX(-50%)}
`;

const BrandsSection = styled.section`
  padding: 32px 0;
  border-bottom: 1px solid ${colors.border};
  background: #fff;
`;

const Track = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  overflow: hidden;
  position: relative;
  &::before,&::after{
    content:'';position:absolute;top:0;bottom:0;width:80px;z-index:2;
  }
  &::before{left:0;background:linear-gradient(to right,#fff,transparent)}
  &::after{right:0;background:linear-gradient(to left,#fff,transparent)}
`;

const Slider = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  animation: ${scroll} 20s linear infinite;
  &:hover{animation-play-state:paused}
`;

const BrandItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 40px;
  border-right: 1px solid ${colors.border};
  filter: grayscale(100%);
  opacity: 0.5;
  transition: all 0.3s;
  cursor: pointer;
  white-space: nowrap;
  &:hover{filter:grayscale(0%);opacity:1}
  img{height:28px;object-fit:contain}
`;

const brands = [
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
  { name: "Xiaomi", logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg" },
  { name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" },
  { name: "Huawei", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Huawei_Logo.svg" },
  { name: "LG", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg" },
  { name: "JBL", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7a/JBL_logo.svg" },
];

export default function Brands() {
  return (
    <BrandsSection>
      <Track>
        <Slider>
          {[...brands, ...brands].map((b, i) => (
            <BrandItem key={i}>
              <img src={b.logo} alt={b.name} />
            </BrandItem>
          ))}
        </Slider>
      </Track>
    </BrandsSection>
  );
}