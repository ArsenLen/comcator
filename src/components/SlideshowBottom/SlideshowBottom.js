import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import ServiceApi from "../../services/ServiceApi";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Slideshow.css";

import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

const SlideshowBottom = () => {
  const [banners, setBanners] = useState([]);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    ServiceApi.getBanners().then(setBanners);
  }, []);

  if (banners.length === 0) {
    return null;
  }

  return (
    <div className="Slideshow">
      {t("current") == "ru" && (
        <Carousel showStatus={false} showThumbs={false} infiniteLoop autoPlay>
          {banners.map((item, index) => {
            return (
              <div key={index}>
                <img src={item.url} />
              </div>
            );
          })}
        </Carousel>
      )}
      {t("current") == "ky" && (
        <Carousel showStatus={false} showThumbs={false} infiniteLoop autoPlay>
          {banners.map((item, index) => {
            return (
              <div key={index}>
                <img src={item.url_ky} />
              </div>
            );
          })}
        </Carousel>
      )}
      {t("current") == "kz" && (
        <Carousel showStatus={false} showThumbs={false} infiniteLoop autoPlay>
          {banners.map((item, index) => {
            return (
              <div key={index}>
                <img src={item.url_kz} />
              </div>
            );
          })}
        </Carousel>
      )}
    </div>
  );
};

export default Slideshow;
