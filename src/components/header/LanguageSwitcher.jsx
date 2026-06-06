import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Menu, MenuItem, Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const languages = [
    { code: 'uz', label: "O'z", flag: '🇺🇿' },
    { code: 'ru', label: 'Ру', flag: '🇷🇺' },
    { code: 'en', label: 'Eng', flag: '🇬🇧' },
];

function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const currentLang = languages.find(
        (l) => l.code === i18n.language?.split('-')[0]
    ) || languages[0];

    const handleOpen = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleSelect = (code) => {
        i18n.changeLanguage(code);
        handleClose();
    };

    return (
        <>
            <Button
                onClick={handleOpen}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                    color: 'white',
                    border: '1px solid white',
                    borderRadius: '6px',
                    textTransform: 'none',
                    fontSize: '14px',
                    gap: '6px',
                    '&:hover': {
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid white',
                    },
                }}
            >
                <span>{currentLang.flag}</span>
                <span style={{color:'#000'}}>{currentLang.label}</span>
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: '140px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    },
                }}
            >
                {languages.map((lang) => (
                    <MenuItem
                        key={lang.code}
                        onClick={() => handleSelect(lang.code)}
                        selected={lang.code === currentLang.code}
                        sx={{
                            gap: 1,
                            fontSize: '14px',
                            '&.Mui-selected': {
                                background: '#f0f0f0',
                                fontWeight: 'bold',
                            },
                            '&:hover': {
                                background: '#f5f5f5',
                            },
                        }}
                    >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default LanguageSwitcher;