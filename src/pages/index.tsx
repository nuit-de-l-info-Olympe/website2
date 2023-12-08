import { Button, Container, Typography, AppBar, Toolbar, IconButton, Menu, MenuItem, styled } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";
import React, { useState } from "react";

const getColor = (index: number) => {
  const colors = ['red', 'green', 'blue']; // Ajoutez autant de couleurs que vous le souhaitez
  return colors[index % colors.length];
};

const getRainbowStyle = () => ({
  background: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  display: 'inline-block',
  backgroundImage: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)',
  animation: 'rainbowAnimation 3s linear infinite',
  '@keyframes rainbowAnimation': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
});

const StyledText = styled('span')(({ mode }: { mode: string }) => {
  if (mode === 'Mode Stylé') {
    return getRainbowStyle();
  } else {
    return {
      color: mode === 'Mode Sombre' ? '#ffffff' : mode === 'Mode Coloré' ? '#1976d2' : 'inherit',
    };
  }
});

const AnimatedButton: React.FC<{ children: React.ReactNode; onClick: () => void; disabled?: boolean }> = ({ children, onClick, disabled }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled}
      sx={{
        marginTop: '16px',
        backgroundColor: disabled ? '#757575' : '#2196f3',
        "&:hover": {
          backgroundColor: disabled ? '#757575' : '#1976d2',
        },
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '8px',
        border: '1px solid #2196f3',
        "&::before": {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#ffffff',
          transformOrigin: '0 50%',
          transform: disabled ? 'scaleX(0)' : 'scaleX(1)',
          transition: 'transform 0.3s ease-in-out',
        },
      }}
    >
      {children}
    </Button>
  );
};

const MotionContainer = motion(Container);

const App: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [mode, setMode] = useState<string>('Mode Sombre');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleButtonClick = () => {
    setIsClicked(true);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (selectedMode: string) => {
    setMode(selectedMode);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getBackgroundColor = () => {
    switch (mode) {
      case 'Mode Sombre':
        return '#121212';
      case 'Mode Coloré':
      case 'Mode Stylé':
        return '#000000';
      default:
        return '#121212';
    }
  };

  const getColorStyle = () => {
    switch (mode) {
      case 'Mode Sombre':
        return { color: '#ffffff' };
      case 'Mode Coloré':
        return { color: '#1976d2' };
      case 'Mode Stylé':
        return getRainbowStyle();
      default:
        return { color: '#ffffff' };
    }
  };

  const variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: getBackgroundColor(), borderBottom: '1px solid #444' }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" style={{ marginRight: 2 }} onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={getColorStyle()}>Un Site Incroyable</Typography>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleMenuItemClick('Mode Sombre')}>Mode Sombre</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Mode Coloré')}>Mode Coloré</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Mode Stylé')}>Mode Stylé</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <MotionContainer
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
        style={{ color: getColorStyle().color, backgroundColor: getBackgroundColor(), padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      >
        <Typography variant="h3">
          <StyledText mode={mode}>Bienvenue sur notre Site Minimaliste</StyledText>
        </Typography>
        <Typography variant="body1" style={{ marginTop: '16px' }}>
          <StyledText mode={mode}>Explorez les fonctionnalités du site dans un environnement sombre et minimaliste.</StyledText>
        </Typography>
        <AnimatedButton onClick={handleButtonClick} disabled={isClicked}>
          {isClicked ? "Clic ! Clic !" : "Cliquez-moi !"}
        </AnimatedButton>
      </MotionContainer>

      <MotionContainer
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
        style={{ color: getColorStyle().color, backgroundColor: getBackgroundColor(), padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      >
        <Typography variant="h3">
          <StyledText mode={mode}>Economisez 20L d'eau et urinez sous la douche</StyledText>
        </Typography>
        <Typography variant="body1" style={{ marginTop: '16px' }}>
          <StyledText mode={mode}>Le Saviez vous ? 85% des gens se reconnaîtrons dans le fact ci-dessus</StyledText>
        </Typography>
      </MotionContainer>

      <footer style={{ textAlign: 'center', backgroundColor: getBackgroundColor(), color: getColorStyle().color, padding: '20px', marginTop: '20px', borderTop: '1px solid #444' }}>
        <StyledText mode={mode}>© 2023 Mon Site à moi, il est à moi. Tous droits réservés.</StyledText>
      </footer>
    </>
  );
}

export default App;
