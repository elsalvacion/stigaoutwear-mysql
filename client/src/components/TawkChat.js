import React from "react";

const TawkChat = () => {
  const tawk = () => {
    var Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/61e3abdbb84f7301d32b3d41/1fpglekvo";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  };
  return <>{tawk()}</>;
};

export default TawkChat;
