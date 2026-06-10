import React from "react";
import styled, { keyframes } from "styled-components";
import { colors } from "../../styles/global";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.97); }
  to   { opacity: 1; transform: scale(1); }
`;

const Wrap = styled.div`display: flex; gap: 12px;`;

const Thumbs = styled.div`display: flex; flex-direction: column; gap: 8px;`;

const Thumb = styled.div`
  width: 64px; height: 64px;
  border-radius: 10px;
  border: 2px solid ${({ active }) => active ? colors.primary : colors.border};
  background: ${colors.grayLight};
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; padding: 6px;
  transition: border 0.2s;
  img { width: 100%; height: 100%; object-fit: contain; }
  &:hover { border-color: ${colors.primary}; }
`;

const MoreThumb = styled(Thumb)`
  font-size: 11px; font-weight: 700;
  color: ${colors.primary};
  flex-direction: column; gap: 2px;
`;

const MainImg = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%);
  border-radius: 20px;
  display: flex; align-items: center; justify-content: center;
  padding: 32px;
  min-height: 360px;
  position: relative;
  img {
    width: 100%; max-width: 280px;
    object-fit: contain;
    animation: ${fadeIn} 0.3s ease;
    filter: drop-shadow(0 20px 40px rgba(0,0,0,0.15));
  }
`;

const NewBadge = styled.span`
  position: absolute; top: 16px; left: 16px;
  background: ${colors.primary}; color: #fff;
  font-size: 11px; font-weight: 700;
  padding: 4px 10px; border-radius: 8px;
  text-transform: uppercase;
`;

export default function Gallery({ images, badge, activeImg, onSelect }) {
  return (
    <Wrap>
      <Thumbs>
        {images.map((img, i) => (
          <Thumb key={i} active={i === activeImg} onClick={() => onSelect(i)}>
            <img src={img} alt="" />
          </Thumb>
        ))}
        <MoreThumb>
          <span>+2</span>
          <span style={{ fontSize: 9 }}>rasm</span>
        </MoreThumb>
      </Thumbs>
      <MainImg>
        <NewBadge>{badge}</NewBadge>
        <img src={images[activeImg]} alt="product" key={activeImg} />
      </MainImg>
    </Wrap>
  );
}