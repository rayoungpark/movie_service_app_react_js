import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ColorThief from "colorthief";
import Banner from "../components/Banner";
import styles from "./Detail.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Detail() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const baseUrl = "https://yts.mx/api/v2/movie_details.json?with_images=true&with_cast=true&movie_id=";

  const getColor = () => {
    const colorThief = new ColorThief();
    const $img = new Image();
    $img.addEventListener("load", function () {
      const result = colorThief.getColor($img);
      document.documentElement.style.setProperty("--color-background", `rgb(${result.join(",")})`);
    });
    let imageURL = data.background_image_original;
    let googleProxyURL = "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";

    $img.crossOrigin = "Anonymous";
    $img.src = googleProxyURL + encodeURIComponent(imageURL);
  };

  const getMovie = async () => {
    const response = await fetch(baseUrl + id);
    const json = await response.json();
    setData(json.data.movie);
    console.log(json.data);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  useEffect(() => {
    if (!loading) {
      getColor();
    }
  }, [loading]);

  return (
    <div className={styles.container}>
      {loading ? null : (
        <>
          <div className={styles.content_top}>
            <div className={styles.content_top__visual} style={{ backgroundImage: `url(${data.background_image_original})` }}>
              {/* <img src={data.background_image_original} alt={data.title} ref={imgRef} /> */}
            </div>
          </div>

          <div className={styles.content_body}>
            <div className={styles.content_body__wrapper}>
              <h1 className={styles.title}>{data.title}</h1>
              <p className={styles.title_en}>{data.title_english}</p>
              <div className={styles.movie_info}>
                <img src={data.large_cover_image} alt={data.title} />
                <div className={styles.movie_spec}>
                  <p className={styles.description}>{data.description_full}</p>
                  <ul className={styles.info}>
                    <li>
                      <span className={styles.screen_out}>rating</span>⭐ {data.rating}
                    </li>
                    <li>
                      <span className={styles.screen_out}>year</span>
                      {data.year}
                    </li>
                    <li>
                      <span className={styles.screen_out}>language</span>
                      {data.language.toUpperCase()}
                    </li>
                    <li>
                      <span className={styles.screen_out}>runtime</span>
                      {data.runtime}
                    </li>
                  </ul>

                  {/* <h3>cast</h3> */}
                  <div className={styles.cast_container}>
                    {data.cast?.map((c) => {
                      return (
                        <div key={c.name}>
                          <img src={c.url_small_image} alt={c.name} />
                          <p className={styles.c_name}>{c.character_name}</p>
                          <p className={styles.name}>{c.name}</p>
                        </div>
                      );
                    })}
                  </div>
                  <ul>
                    {data.genres.map((g) => (
                      <Banner key={g} text={g} />
                    ))}
                  </ul>
                </div>
              </div>

              <Swiper
                className={styles.swiper_wrapper}
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                  "--swiper-pagination-bullet-width": "10px",
                  "--swiper-pagination-bullet-height": "10px",
                }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination, Autoplay]}
              >
                <SwiperSlide className={styles.swiper}>
                  <img src={data.large_screenshot_image1} alt="screenshot1" />
                </SwiperSlide>
                <SwiperSlide className={styles.swiper}>
                  <img src={data.large_screenshot_image2} alt="screenshot2" />
                </SwiperSlide>
                <SwiperSlide className={styles.swiper}>
                  <img src={data.large_screenshot_image3} alt="screenshot3" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
