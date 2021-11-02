import { useEffect } from "react";
import { Compose, Header, Sidebar, Main, Snackbar, ViewMail } from "..";
import { useAppContext } from "../../context/context";

import "./Home.css";

const Home = ({ mailData, showMails = true }) => {
  const changeBg = () => {
    const images = [
      "url('https://cdn.pixabay.com/photo/2017/07/24/12/43/schrecksee-2534484__340.jpg')",
      "url('https://cdn.pixabay.com/photo/2017/12/13/12/37/panorama-3016694__340.jpg')",
      "url('https://cdn.pixabay.com/photo/2017/05/29/16/47/panorama-2354183__340.jpg')",
      "url('https://cdn.pixabay.com/photo/2018/06/01/23/06/lusen-3447459__340.jpg')",
      "url('https://cdn.pixabay.com/photo/2017/06/08/15/39/winter-2383930__340.jpg')",
      "url('https://cdn.pixabay.com/photo/2017/03/09/21/06/winter-mountain-2130872__340.jpg')",
      "url('https://cdn.pixabay.com/photo/2020/05/19/02/24/mountain-5188966__340.jpg')",
      "url('https://cdn.pixabay.com/photo/2021/02/01/08/59/winter-5969819__340.jpg')",
      "url('https://cdn.pixabay.com/photo/2020/04/12/14/08/panoramic-5034352__340.jpg')",
      "url('https://cdn.pixabay.com/photo/2020/06/14/18/53/hamburg-5298969__340.jpg')",
      "url('https://cdn.pixabay.com/photo/2017/11/23/14/17/ireland-2972920__340.jpg')",
      "url('https://cdn.pixabay.com/photo/2019/02/17/16/37/flamborough-head-4002608__340.jpg')",
      "url('https://cdn.pixabay.com/photo/2019/08/12/09/11/swamp-4400792__340.jpg')",
      "url('https://cdn.pixabay.com/photo/2017/05/31/00/36/spain-2358746__340.jpg')",
      "url('https://cdn.pixabay.com/photo/2018/03/20/11/25/background-3242951__340.jpg')",
      "url('https://cdn.pixabay.com/photo/2017/10/13/04/02/new-york-2846770__340.jpg')",
      "url('https://cdn.pixabay.com/photo/2021/08/08/10/34/ocean-6530523__340.jpg')",
      "url('https://cdn.pixabay.com/photo/2021/09/26/14/37/milky-way-6657951__340.jpg')",
      "url('https://cdn.pixabay.com/photo/2021/08/19/14/00/field-6558125__340.jpg')",
      "url('https://cdn.pixabay.com/photo/2021/09/07/07/11/game-console-6603120__340.jpg')",
      "url('https://cdn.pixabay.com/photo/2018/09/29/11/13/evening-3711228__340.jpg')",
    ];
    const bg = images[Math.floor(Math.random() * images.length)];
    const home = document.querySelector(".home");
    home.style.backgroundImage = bg;
  };
  useEffect(() => {
    setInterval(() => {
      changeBg();
    }, 180000);
  }, []);
  const { composeOpen } = useAppContext();
  return (
    <div className="home">
      {composeOpen && <Compose />}
      <Header />
      <Sidebar>
        {showMails ? <Main /> : <ViewMail mailData={mailData} />}
      </Sidebar>
      <Snackbar />
    </div>
  );
};

export default Home;
