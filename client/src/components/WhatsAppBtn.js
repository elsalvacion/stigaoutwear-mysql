import React from "react";
import FloatingWhatsApp from "react-floating-whatsapp";

const WhatsAppBtn = () => {
  return (
    <div className="whatsappBtn">
      <FloatingWhatsApp
        phoneNumber="+2203193829"
        accountName="Stiga Outwear"
        allowClickAway
        avatar="/images/icon.jpeg"
        styles={{
          zIndex: 20000,
        }}
      />
    </div>
  );
};

export default WhatsAppBtn;
