import PropTypes from 'prop-types';
import SimpleBarReact from 'simplebar-react';
// @mui
import {  styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
  overflowX: 'hidden',
  overflowY: 'hidden'
}));

// const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  // const theme = useTheme();
  // maxHeight: '100%',
  // '& .simplebar-scrollbar': {
  //   '&:before': {
  //     // backgroundColor: alpha(theme.palette.grey[600], 0.48)
      // backgroundColor: theme.palette.mode === 'light' 
      //   ? alpha(theme.palette.grey[600], 0.48) 
      //   : alpha(theme.palette.common.white, 0.24),
  //     backgroundColor: "#c1c1c1",
  //     // backgroundColor: alpha({theme.pallete.mode = "light"?theme.palette.grey[600]: theme.palette.background.paper }),
  //   },
  //   '&.simplebar-visible:before': {
  //     opacity: 1,
  //   },
  // },
  // '& .simplebar-track.simplebar-vertical': {
  //   width: 1,  right: 8,
  // },
  // '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
  //   height: 6,
  // },
  // '& .simplebar-mask': {
  //   zIndex: 'inherit',
  // },
  // "& .simplebar-placeholder": {
  //   height: '0 !important',
  // }
  const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  "& .simplebar-content-wrapper": {
    overflowX: "hidden !important",
  },

  "& .simplebar-track.simplebar-vertical": {
    width: "8px !important",
    right: "4px !important",
    top: "8px",
    bottom: "8px",
  },

  "& .simplebar-scrollbar:before": {
    background: "#c1c1c1 !important",
    borderRadius: "10px",
    left: "2px",
    right: "2px",
  },

  "& .simplebar-track.simplebar-horizontal": {
    display: "none",
  },
}));
// }));

// ----------------------------------------------------------------------

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default function Scrollbar({ children, sx, ...other }) {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <RootStyle>
      <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  );
}

export {SimpleBarStyle};
