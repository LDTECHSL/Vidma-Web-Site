import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        products: "Products",
        projects: "Projects",
        contact: "Contact Us",
        about: "About Us",
        order: "Order Now",
      },
    },
    si: {
      translation: {
        products: "නිෂ්පාදන",
        projects: "ව්‍යාපෘති",
        contact: "අප හා සම්බන්ධ වන්න",
        about: "අප ගැන",
        order: "ඇණවුම් කරන්න",
      },
    },
    ta: {
      translation: {
        products: "தயாரிப்புகள்",
        projects: "திட்டங்கள்",
        contact: "எங்களை தொடர்பு கொள்ள",
        about: "எங்களை பற்றி",
        order: "இப்போது ஆர்டர் செய்",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
