import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/global";
import { useNavigate } from "react-router-dom";

const Title = styled.h3`
  font-size: 16px; font-weight: 700; color: ${colors.dark};
  margin-bottom: 16px;
`;

const List = styled.div`display: flex; flex-direction: column; gap: 12px;`;

const Card = styled.div`
  display: flex; gap: 12px; padding: 12px;
  background: #fff; border: 1.5px solid ${colors.border};
  border-radius: 14px; cursor: pointer; transition: all 0.2s;
  &:hover { border-color: ${colors.primary}; box-shadow: 0 4px 12px rgba(37,99,235,0.1); }
`;

const Img = styled.div`
  width: 70px; height: 70px; background: ${colors.grayLight};
  border-radius: 10px; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; padding: 8px;
  img { width: 100%; height: 100%; object-fit: contain; }
`;

const Info = styled.div`flex: 1;`;
const Name = styled.p`font-size: 13px; font-weight: 600; color: ${colors.dark}; margin-bottom: 4px; line-height: 1.4;`;
const Price = styled.p`font-size: 14px; font-weight: 700; color: ${colors.primary};`;
const OldPrice = styled.span`font-size: 12px; color: #aaa; text-decoration: line-through; margin-left: 6px;`;

export default function SimilarProducts({ products, lang }) {
  const navigate = useNavigate();

  const title = { uz: "Sizga yoqishi mumkin 🔥", ru: "Вам может понравиться 🔥", en: "You may also like 🔥" };

  return (
    <div>
      <Title>{title[lang]}</Title>
      <List>
        {products.map((p) => (
          <Card key={p.id} onClick={() => navigate(`/product/${p.id}`)}>
            <Img><img src={p.img} alt={p.name} /></Img>
            <Info>
              <Name>{p.name}</Name>
              <Price>
                {p.price} so'm
                {p.oldPrice && <OldPrice>{p.oldPrice} so'm</OldPrice>}
              </Price>
            </Info>
          </Card>
        ))}
      </List>
    </div>
  );
}