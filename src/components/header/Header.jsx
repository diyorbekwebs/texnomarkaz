import React, { useState, useRef, useEffect } from "react";
import { Logo } from "../../assets/img/img";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  Box, IconButton, Drawer, List, ListItem,
  ListItemText, Collapse,
} from "@mui/material";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { tophead } from "../../constant/header";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PhoneIcon from "@mui/icons-material/Phone";

// ── Google Font ──────────────────────────────────────
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { font-family: 'Inter', sans-serif; box-sizing: border-box; }
`;

// ── Animations ───────────────────────────────────────
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;
const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-24px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;
const fadeInDown = keyframes`
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ── Search Modal ─────────────────────────────────────
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(6px);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 90px;
  animation: ${fadeIn} 0.18s ease;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 20px;
  width: 100%;
  max-width: 640px;
  margin: 0 16px;
  box-shadow: 0 32px 80px rgba(0,0,0,0.22);
  overflow: hidden;
  animation: ${slideDown} 0.28s cubic-bezier(0.34, 1.4, 0.64, 1);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 22px;
  border-bottom: 1px solid #f0f0f0;
`;

const ModalInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 17px;
  color: #111;
  background: transparent;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  &::placeholder { color: #c0c0c0; font-weight: 400; }
`;

const Kbd = styled.kbd`
  background: #f4f4f4;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 3px 7px;
  font-size: 11px;
  color: #777;
  font-family: 'Inter', sans-serif;
`;

const ModalBody = styled.div`
  padding: 16px 22px 22px;
`;

const QuickLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: #bbb;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

const QuickTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.button`
  background: #f5f7fa;
  border: 1px solid #eee;
  border-radius: 20px;
  padding: 7px 15px;
  font-size: 13px;
  color: #444;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  transition: all 0.15s;
  &:hover {
    background: #e8f0fe;
    border-color: #1976d2;
    color: #1976d2;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(25,118,210,0.15);
  }
`;

// ── TopBar ───────────────────────────────────────────
const TopBar = styled.div`
  background: linear-gradient(90deg, #0d47a1 0%, #1565c0 100%);
  padding: 7px 0;
`;

const TopBarInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const TopBarLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 6px;
  list-style: none;
  margin: 0; padding: 0;
  li {
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    color: rgba(255,255,255,0.75);
    padding: 3px 8px;
    border-radius: 6px;
    transition: all 0.2s;
    &:hover { color: #fff; background: rgba(255,255,255,0.12); }
  }
  @media (max-width: 768px) { display: none; }
`;

const SocialRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  svg {
    font-size: 16px;
    color: rgba(255,255,255,0.65);
    cursor: pointer;
    transition: all 0.2s;
    &:hover { color: #fff; transform: scale(1.2); }
  }
`;

const PhoneText = styled.a`
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.2s;
  &:hover { color: #fff; }
  @media (max-width: 900px) { display: none; }
`;

// ── Main + Nav merged bar ────────────────────────────
const MainBar = styled.div`
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const MainBarInner = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  height: 64px;
`;

const LogoImg = styled.img`
  width: 110px;
  height: auto;
  cursor: pointer;
  flex-shrink: 0;
  margin-right: 24px;
  @media (max-width: 768px) { width: 80px; margin-right: 12px; }
`;

// Nav links (desktop)
const NavList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0; padding: 0;
  height: 100%;
  gap: 0;
  flex-shrink: 0;
  @media (max-width: 1100px) { display: none; }
`;

const NavItem = styled.li`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 14px;
  color: #333;
  cursor: pointer;
  font-size: 13.5px;
  font-weight: 500;
  gap: 3px;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  white-space: nowrap;
  &:hover {
    color: #1976d2;
    border-bottom: 2px solid #1976d2;
    > ul { display: block; }
  }
  svg { font-size: 14px; color: #bbb; margin-top: 1px; }
`;

const DropdownMenu = styled.ul`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 0 0 14px 14px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
  list-style: none;
  margin: 0; padding: 8px 0;
  min-width: 200px;
  z-index: 9999;
  border-top: 2px solid #1976d2;
  animation: ${fadeInDown} 0.18s ease;
  li {
    padding: 10px 18px;
    font-size: 13px;
    color: #444;
    cursor: pointer;
    white-space: nowrap;
    font-weight: 500;
    transition: all 0.15s;
    &:hover { background: #f0f7ff; color: #1976d2; padding-left: 24px; }
  }
`;

// Search trigger (flex: 1, grows)
const SearchTrigger = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
  margin: 0 16px;
  background: #f5f7fa;
  border: 1.5px solid #eee;
  border-radius: 10px;
  padding: 9px 14px;
  cursor: pointer;
  font-size: 13.5px;
  color: #bbb;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  transition: all 0.2s;
  &:hover {
    border-color: #1976d2;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(25,118,210,0.08);
    color: #999;
  }
  @media (max-width: 768px) { margin: 0 8px; }
`;

const ShortcutHint = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;
  @media (max-width: 600px) { display: none; }
`;

// Icon buttons right side
const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
`;

const IconBtn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 10px;
  transition: all 0.2s;
  &:hover { background: #f0f7ff; transform: translateY(-2px); }
  span {
    font-size: 10px;
    color: #999;
    font-weight: 500;
    line-height: 1;
  }
  svg { color: #444; font-size: 21px; }
  @media (max-width: 900px) {
    span { display: none; }
    padding: 6px;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 3px; right: 7px;
  background: #e53935;
  color: #fff;
  font-size: 9px;
  min-width: 15px;
  height: 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
  font-weight: 700;
  @media (max-width: 900px) { right: 3px; }
`;

const Divider = styled.div`
  width: 1px; height: 28px;
  background: #eee;
  margin: 0 2px;
  @media (max-width: 900px) { display: none; }
`;

const MobileMenuBtn = styled(IconButton)`
  display: none !important;
  @media (max-width: 1100px) { display: flex !important; }
`;

// ── Data ─────────────────────────────────────────────
const navCategories = [
  { id: 1, label: { uz: "Hammasi", ru: "Все", en: "All" }, children: [
    { id: 11, label: { uz: "iPhone", ru: "iPhone", en: "iPhone" } },
    { id: 12, label: { uz: "MacBook", ru: "MacBook", en: "MacBook" } },
    { id: 13, label: { uz: "iPad", ru: "iPad", en: "iPad" } },
  ]},
  { id: 2, label: { uz: "Smartfonlar", ru: "Смартфоны", en: "Phones" }, children: [
    { id: 21, label: { uz: "Apple", ru: "Apple", en: "Apple" } },
    { id: 22, label: { uz: "Samsung", ru: "Samsung", en: "Samsung" } },
    { id: 23, label: { uz: "Xiaomi", ru: "Xiaomi", en: "Xiaomi" } },
  ]},
  { id: 3, label: { uz: "Noutbuklar", ru: "Ноутбуки", en: "Laptops" }, children: [
    { id: 31, label: { uz: "MacBook", ru: "MacBook", en: "MacBook" } },
    { id: 32, label: { uz: "Dell", ru: "Dell", en: "Dell" } },
  ]},
  { id: 4, label: { uz: "Aksessuarlar", ru: "Аксессуары", en: "Accessories" }, children: [
    { id: 41, label: { uz: "Quloqchinlar", ru: "Наушники", en: "Earphones" } },
    { id: 42, label: { uz: "Chexollar", ru: "Чехлы", en: "Cases" } },
  ]},
  { id: 5, label: { uz: "🔥 Aksiya", ru: "🔥 Акции", en: "🔥 Sales" }, children: [] },
  { id: 6, label: { uz: "Yangiliklar", ru: "Новости", en: "News" }, children: [] },
];

const quickSearches = ["iPhone 15", "MacBook Pro", "Samsung S24", "AirPods Pro", "iPad Air"];

// ── Search Modal Component ────────────────────────────
function SearchModal({ open, onClose, lang }) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  if (!open) return null;

  const placeholder =
    lang === "uz" ? "Mahsulot qidirish..." :
    lang === "ru" ? "Поиск товаров..." : "Search products...";

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <SearchIcon sx={{ color: "#1976d2", fontSize: 22, flexShrink: 0 }} />
          <ModalInput
            ref={inputRef}
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
            <Kbd>ESC</Kbd>
          </Box>
          <IconButton size="small" onClick={onClose} sx={{ color: "#ccc", "&:hover": { color: "#333", transform: "rotate(90deg)" }, transition: "all 0.2s" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </ModalHeader>
        <ModalBody>
          <QuickLabel>
            {lang === "uz" ? "Tezkor qidiruv" : lang === "ru" ? "Быстрый поиск" : "Quick search"}
          </QuickLabel>
          <QuickTags>
            {quickSearches.map((tag) => (
              <Tag key={tag} onClick={() => setQuery(tag)}>🔍 {tag}</Tag>
            ))}
          </QuickTags>
        </ModalBody>
      </ModalBox>
    </Overlay>
  );
}

// ── Main Header ──────────────────────────────────────
export default function Header() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] || "uz";
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(null);

  const isMac = typeof navigator !== "undefined" &&
    navigator.platform?.toUpperCase().includes("MAC");

  const placeholder =
    lang === "uz" ? "Mahsulot qidirish..." :
    lang === "ru" ? "Поиск товаров..." : "Search products...";

  useEffect(() => {
    const fn = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <>
      <GlobalStyle />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} lang={lang} />

      <header>
        {/* ── TopBar ── */}
        <TopBar>
          <div className="container">
            <TopBarInner>
              <TopBarLinks>
                {tophead?.map((e) => (
                  <li key={e.id}>{e.title[lang]?.text}</li>
                ))}
              </TopBarLinks>
              <Box sx={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <PhoneText href="tel:+998712345678">
                  <PhoneIcon sx={{ fontSize: 13 }} />
                  +998 71 234 56 78
                </PhoneText>
                <SocialRow>
                  <TelegramIcon />
                  <InstagramIcon />
                  <FacebookIcon />
                  <YouTubeIcon />
                </SocialRow>
                <LanguageSwitcher />
              </Box>
            </TopBarInner>
          </div>
        </TopBar>

        {/* ── MainBar (Logo + Nav + Search + Icons) ── */}
        <MainBar>
          <div className="container">
            <MainBarInner>

              {/* Logo */}
              <LogoImg src={Logo} alt="Logo" />

              {/* Nav links */}
              <NavList>
                {navCategories.map((cat) => (
                  <NavItem key={cat.id}>
                    {cat.label[lang]}
                    {cat.children.length > 0 && <ExpandMoreIcon />}
                    {cat.children.length > 0 && (
                      <DropdownMenu>
                        {cat.children.map((child) => (
                          <li key={child.id}>→ {child.label[lang]}</li>
                        ))}
                      </DropdownMenu>
                    )}
                  </NavItem>
                ))}
              </NavList>

              {/* Search trigger */}
              <SearchTrigger onClick={() => setSearchOpen(true)}>
                <SearchIcon sx={{ color: "#bbb", fontSize: 18, flexShrink: 0 }} />
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {placeholder}
                </span>
                <ShortcutHint>
                  <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
                  <Kbd>K</Kbd>
                </ShortcutHint>
              </SearchTrigger>

              {/* Icons */}
              <IconGroup>
                <IconBtn>
                  <FavoriteIcon />
                  <span>{lang === "uz" ? "Sevimli" : lang === "ru" ? "Избранное" : "Wishlist"}</span>
                </IconBtn>
                <Divider />
                <IconBtn>
                  <ShoppingCartIcon />
                  <Badge>3</Badge>
                  <span>{lang === "uz" ? "Savat" : lang === "ru" ? "Корзина" : "Cart"}</span>
                </IconBtn>
                <MobileMenuBtn onClick={() => setDrawerOpen(true)} sx={{ ml: 1 }}>
                  <MenuIcon />
                </MobileMenuBtn>
              </IconGroup>

            </MainBarInner>
          </div>
        </MainBar>

        {/* ── Mobile Drawer ── */}
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 300, height: "100%", display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, background: "linear-gradient(90deg,#0d47a1,#1565c0)" }}>
              <LogoImg src={Logo} alt="Logo" style={{ width: 85, filter: "brightness(10)", margin: 0 }} />
              <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "white" }}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ p: 2, borderBottom: "1px solid #f0f0f0" }}>
              <SearchTrigger style={{ margin: 0, width: "100%" }} onClick={() => { setDrawerOpen(false); setSearchOpen(true); }}>
                <SearchIcon sx={{ color: "#bbb", fontSize: 17 }} />
                <span style={{ fontSize: 13 }}>{placeholder}</span>
              </SearchTrigger>
            </Box>

            <List sx={{ flex: 1, overflow: "auto", pt: 0 }}>
              {navCategories.map((cat) => (
                <React.Fragment key={cat.id}>
                  <ListItem
                    button
                    onClick={() => cat.children.length > 0 && setOpenMobileMenu(openMobileMenu === cat.id ? null : cat.id)}
                    sx={{ borderBottom: "1px solid #f5f5f5", py: 1.5 }}
                  >
                    <ListItemText
                      primary={cat.label[lang]}
                      primaryTypographyProps={{ fontSize: 14, fontWeight: 500, fontFamily: "Inter" }}
                    />
                    {cat.children.length > 0 && (
                      openMobileMenu === cat.id
                        ? <ExpandLessIcon sx={{ color: "#1976d2" }} />
                        : <ExpandMoreIcon sx={{ color: "#ccc" }} />
                    )}
                  </ListItem>
                  <Collapse in={openMobileMenu === cat.id}>
                    <List disablePadding sx={{ background: "#fafafa" }}>
                      {cat.children.map((child) => (
                        <ListItem key={child.id} button sx={{ pl: 4, borderBottom: "1px solid #f0f0f0" }}>
                          <ListItemText
                            primary={child.label[lang]}
                            primaryTypographyProps={{ fontSize: 13, color: "#666", fontFamily: "Inter" }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              ))}
            </List>

            <Box sx={{ p: 2, borderTop: "1px solid #f0f0f0", display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconBtn><FavoriteIcon sx={{ fontSize: 20 }} /></IconBtn>
                <IconBtn style={{ position: "relative" }}>
                  <ShoppingCartIcon sx={{ fontSize: 20 }} />
                  <Badge>3</Badge>
                </IconBtn>
              </Box>
              <SocialRow>
                <TelegramIcon sx={{ color: "#1976d2 !important" }} />
                <InstagramIcon sx={{ color: "#e91e63 !important" }} />
                <FacebookIcon sx={{ color: "#1565c0 !important" }} />
                <YouTubeIcon sx={{ color: "#e53935 !important" }} />
              </SocialRow>
              <LanguageSwitcher />
            </Box>
          </Box>
        </Drawer>
      </header>
    </>
  );
}