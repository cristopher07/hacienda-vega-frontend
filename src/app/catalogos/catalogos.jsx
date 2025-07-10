import { useState } from "react";

export default function Catalogos() {
   const [verForm, setVerForm] = useState('Nestor');
   const [title] = useState("CATÁLOGOS");


  return (
      <div sx={{ padding: 2, backgroundColor: 'red' }}>
     <h2>
   {verForm === 'Nestor' ? title : 'No Nestor'}
  </h2>;
  </div>
  );

 
}