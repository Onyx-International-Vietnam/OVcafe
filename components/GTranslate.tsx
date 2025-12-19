'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const GTranslate = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* Đây là cái hộp sẽ chứa nút dịch */}
      <div className="gtranslate_wrapper"></div>
      
      <Script
        id="gtranslate-settings"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.gtranslateSettings = {
              default_language: "vi",
              native_language_names: true,
              detect_browser_language: true,
              languages: [
                "vi",    // Tiếng Việt
                "en",    // Tiếng Anh (English)
                "zh-CN", // Trung Quốc - Giản thể (Chinese Simplified)
                "zh-TW", // Trung Quốc - Phồn thể (Chinese Traditional)
                "ja",    // Nhật Bản (Japanese)
                "ko",    // Hàn Quốc (Korean)
                "fr",    // Pháp (French)
                "de",    // Đức (German)
                "ru",    // Nga (Russian)
                "es",    // Tây Ban Nha (Spanish)
                "th",    // Thái Lan (Thai)
                "km",    // Campuchia (Khmer)
                "lo",    // Lào (Lao)
                "id"     // Indonesia
              ],
              wrapper_selector: ".gtranslate_wrapper",
              flag_style: "3d",
              alt_flags: { "en": "usa" },
              // XÓA các dòng switcher_horizontal_position để nó không tự nhảy vị trí
            };
          `,
        }}
      />
      
      <Script
        src="https://cdn.gtranslate.net/widgets/latest/dropdown.js" 
        strategy="lazyOnload"
      />
    </>
  );
};

export default GTranslate;