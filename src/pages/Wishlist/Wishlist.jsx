import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/global";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { removeFromWishlist } from "../../store/wishlistSlice";
import { addToCart } from "../../store/cartSlice";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const PageWrap = styled.div`background: #f8fafc; min-height: 100vh; padding-bottom: 60px;`;

const Breadcrumb = styled.nav`
  padding: 14px 0; display: flex; align-items: center;
  gap: 6px; font-size: 13px; color: ${colors.gray};
`;

const BreadItem = styled.span`
  cursor: pointer; transition: color 0.2s;
  &:hover { color: ${colors.primary}; }
  &.active { color: ${colors.dark}; font-weight: 500; }
`;

const TopBar = styled.div`
  background: #fff; border-bottom: 1px solid ${colors.border}; padding: 16px 0;
`;

const TitleRow = styled.div`display: flex; align-items: center; gap: 10px;`;

const PageTitle = styled.h1`
  font-size: clamp(18px, 3vw, 24px); font-weight: 800; color: ${colors.dark};
`;

const ItemCount = styled.span`
  background: #ef4444; color: #fff;
  font-size: 12px; font-weight: 700;
  padding: 3px 9px; border-radius: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px; margin-top: 24px;
  @media(max-width: 1100px) { grid-template-columns: repeat(3, 1fr); }
  @media(max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  @media(max-width: 480px) { grid-template-columns: repeat(2, 1fr); gap: 10px; }
`;

const Card = styled.div`
  background: #fff; border: 1.5px solid ${colors.border};
  border-radius: 14px; overflow: hidden;
  transition: all 0.22s;
  &:hover { border-color: ${colors.primary}; box-shadow: 0 6px 24px rgba(37,99,235,0.1); transform: translateY(-3px); }
`;

const ImgBox = styled.div`
  background: ${colors.grayLight}; height: 180px;
  position: relative; padding: 16px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  img { width: 100%; height: 100%; object-fit: contain; }
`;

const RemoveBtn = styled.button`
  position: absolute; top: 10px; right: 10px;
  width: 30px; height: 30px;
  background: #fff; border: 1px solid ${colors.border};
  border-radius: 8px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.2s;
  svg { font-size: 16px; color: #aaa; }
  &:hover { border-color: #ef4444; svg { color: #ef4444; } }
`;

const Body = styled.div`padding: 12px;`;
const Brand = styled.p`font-size: 11px; color: ${colors.gray}; margin-bottom: 4px;`;
const Name = styled.p`
  font-size: 13px; font-weight: 600; color: ${colors.dark};
  margin-bottom: 10px; line-height: 1.4;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
`;

const PriceRow = styled.div`
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
`;

const Price = styled.p`font-size: 14px; font-weight: 700; color: ${colors.primary};`;

const CartBtn = styled.button`
  width: 34px; height: 34px; flex-shrink: 0;
  background: ${colors.primaryLight}; border: none; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.2s;
  svg { font-size: 17px; color: ${colors.primary}; }
  &:hover { background: ${colors.primary}; svg { color: #fff; } }
`;

// Empty state
const EmptyWrap = styled.div`
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 80px 20px; text-align: center;
  grid-column: 1 / -1;
`;

const IconBox = styled.div`
  width: 100px; height: 100px;
  background: #fef2f2; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 24px;
  svg { font-size: 48px; color: #ef4444; }
`;

const EmptyTitle = styled.h2`font-size: 22px; font-weight: 800; color: ${colors.dark}; margin-bottom: 8px;`;
const EmptyDesc = styled.p`font-size: 14px; color: ${colors.gray}; margin-bottom: 28px;`;
const EmptyBtn = styled.button`
  background: ${colors.primary}; color: #fff;
  border: none; border-radius: 12px;
  padding: 14px 32px; font-size: 15px; font-weight: 700;
  cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s;
  &:hover { background: #1d4ed8; transform: translateY(-1px); }
`;

export default function Wishlist() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] || "uz";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.wishlist.items);

  const t = {
    wishlist: { uz: "Sevimlilar", ru: "Избранное", en: "Wishlist" },
    home: { uz: "Asosiy sahifa", ru: "Главная", en: "Home" },
    emptyTitle: { uz: "Sevimlilar bo'sh", ru: "Избранное пусто", en: "Wishlist is empty" },
    emptyDesc: { uz: "Yoqqan mahsulotlarni yurak belgisiga bosib saqlang", ru: "Сохраняйте понравившиеся товары", en: "Save products you like by tapping the heart" },
    emptyBtn: { uz: "Mahsulotlarni ko'rish", ru: "Смотреть товары", en: "Browse products" },
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart({
      cartId: `${item.id}-${Date.now()}`,
      id: item.id,
      name: item.name,
      brand: item.brand || "",
      price: item.price,
      img: item.img,
    }));
  };

  return (
    <PageWrap>
      <div className="container">
        <Breadcrumb>
          <BreadItem onClick={() => navigate("/")}>{t.home[lang]}</BreadItem>
          <NavigateNextIcon sx={{ fontSize: 16 }} />
          <BreadItem className="active">{t.wishlist[lang]}</BreadItem>
        </Breadcrumb>
      </div>

      <TopBar>
        <div className="container">
          <TitleRow>
            <PageTitle>{t.wishlist[lang]}</PageTitle>
            {items.length > 0 && <ItemCount>{items.length}</ItemCount>}
          </TitleRow>
        </div>
      </TopBar>

      <div className="container">
        <Grid>
          {items.length === 0 ? (
            <EmptyWrap>
              <IconBox><FavoriteIcon /></IconBox>
              <EmptyTitle>{t.emptyTitle[lang]}</EmptyTitle>
              <EmptyDesc>{t.emptyDesc[lang]}</EmptyDesc>
              <EmptyBtn onClick={() => navigate("/catalog")}>{t.emptyBtn[lang]}</EmptyBtn>
            </EmptyWrap>
          ) : (
            items.map((item) => (
              <Card key={item.id}>
                <ImgBox onClick={() => navigate(`/product/${item.id}`)}>
                  <RemoveBtn onClick={(e) => { e.stopPropagation(); dispatch(removeFromWishlist(item.id)); }}>
                    {/* <DeleteOutlineIcon /> */} remove
                  </RemoveBtn>
                  <img src={item.img} alt={item.name} />
                </ImgBox>
                <Body>
                  <Brand>{item.brand}</Brand>
                  <Name>{item.name}</Name>
                  <PriceRow>
                    <Price>{item.price} so'm</Price>
                    <CartBtn onClick={() => handleAddToCart(item)}>
                      <ShoppingCartOutlinedIcon />
                    </CartBtn>
                  </PriceRow>
                </Body>
              </Card>
            ))
          )}
        </Grid>
      </div>
    </PageWrap>
  );
}