import React from "react";
import {
  Box,
  Drawer,
  Typography,
  Hidden,
  useTheme
} from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs"; // O usa tu propio Breadcrumb
import clsx from "clsx";

/**
 * MainLayout adaptable para módulos internos.
 *
 * Props:
 * - title: string
 * - subtitle: string
 * - subtitleItemsLeft: [{ title: '', text: '' }]
 * - subtitleItemsRight: [{ title: '', text: '' }]
 * - meta: JSX → barra superior
 * - metacontent: JSX → contenido principal
 * - metasidebar: JSX → contenido lateral
 * - breadcrumb: [{ label: '', href: '' }]
 * - disabledContent: bool → desactiva interacción
 */
export default function MainLayout({
  title,
  subtitle,
  subtitleItemsLeft,
  subtitleItemsRight,
  meta,
  metacontent,
  metasidebar,
  breadcrumb,
  disabledContent,
  className
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
      className={className}
    >
      {/* Sidebar */}
      {metasidebar && (
        <Hidden mdDown>
          <Box
            sx={{
              flex: "none",
              width: "250px",
              p: 2,
              borderRight: `1px solid ${theme.palette.divider}`,
              boxSizing: "border-box",
              opacity: disabledContent ? 0.5 : 1,
              pointerEvents: disabledContent ? "none" : "auto",
            }}
          >
            {metasidebar}
          </Box>
        </Hidden>
      )}

      {/* Content */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: { xs: 2, sm: 4 },
          pt: { xs: 6, sm: 10 }, // Espacio superior para AppBar
        }}
      >
        {/* Breadcrumb */}
        {breadcrumb && (
          <Breadcrumbs sx={{ mb: 2 }}>
            {breadcrumb.map((b, idx) => (
              <Typography key={idx} color="inherit">{b.label}</Typography>
            ))}
          </Breadcrumbs>
        )}

        {/* Title + Meta */}
        <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
          <Typography variant="h5" color="primary" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>

          {meta && (
            <Box sx={{ mt: { xs: 2, sm: 0 } }}>
              {meta}
            </Box>
          )}
        </Box>

        {/* Subtitle */}
        {(subtitle || subtitleItemsLeft || subtitleItemsRight) && (
          <Box sx={{ mt: 1 }}>
            {subtitle && (
              <Typography variant="body1" color="textSecondary" >
                {subtitle}
              </Typography>
            )}

            {(subtitleItemsLeft || subtitleItemsRight) && (
              <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", mt: 1 }}>
                <Box>
                  {subtitleItemsLeft?.map((item, idx) => (
                    <Typography key={idx} sx={{ mr: 2 }} variant="subtitle2" component="span">
                      {item.title}: <strong>{item.text}</strong>
                    </Typography>
                  ))}
                </Box>
                <Box>
                  {subtitleItemsRight?.map((item, idx) => (
                    <Typography key={idx} sx={{ ml: 2 }} variant="subtitle2" component="span">
                      {item.title}: <strong>{item.text}</strong>
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        )}

        {/* Main content */}
        <Box
          sx={{
            mt: 2,
            opacity: disabledContent ? 0.5 : 1,
            pointerEvents: disabledContent ? "none" : "auto",
          }}
        >
          {metacontent}
        </Box>
      </Box>

      {/* Responsive Drawer */}
      <Drawer
        anchor="left"
        open={false}
        onClose={() => {}}
        sx={{ display: { md: "none" } }}
      >
        {metasidebar}
      </Drawer>
    </Box>
  );
}
