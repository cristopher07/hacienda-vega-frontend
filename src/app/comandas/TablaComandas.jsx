import React from 'react';
import Listar from '../components/modulesComponents/Listar';
import { Button, Typography } from '@mui/material';

export default function TablaComandas({ data, columns, rowsPerPage, setRowsPerPage, count, pageFix, setpageFix, onCerrar }) {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Comandas Recientes</h2>
        <Button variant="contained" color="secondary" onClick={onCerrar}>Cerrar</Button>
      </div>
      {(!data || data.length === 0) ? (
        <Typography variant="h6" color="text.secondary" align="center">
          No hay comandas para mostrar.
        </Typography>
      ) : (
        <Listar
          data={data}
          columns={columns}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          count={count}
          pageFix={pageFix}
          setpageFix={setpageFix}
        />
      )}
    </div>
  );
}
