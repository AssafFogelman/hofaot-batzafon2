import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "store/auth";

const initialData = [
  {
    name: "הפטריה",
    email: "pitria@pitria.com",
    password: "Aa123456!",
    biz: true,
    phone: "0507305398",
    bizUrl: "https://www.facebook.com/PytriaPub/",
    wazeLocation: "https://waze.com/ul/hsvcm56cys",
    shows: [
      {
        performanceTitle: "berry saharof",
        subTitle: "30 שנה לחלליות",
        description: "חיכינו וחיכינו והנה זה בא!",
        wazeLocation: "https://waze.com/ul/hsvcm56cys",
        performanceDate: "12/11/2022",

        url: "https://i1.sndcdn.com/artworks-000242498594-027td1-t500x500.jpg",
        alt: "alternative description to the picture",
      },
      {
        performanceTitle: "מוניקה סקס",
        subTitle: "על הרצפה",
        description: "ביקשתם וקיבלתם! מוניקה סקס עכשיו על הבמה!",
        wazeLocation: "https://waze.com/ul/hsvcm56cys",
        performanceDate: "30/11/2022",
        bizName: "הפטריה",

        url: "https://img.ex.co/image/upload/ar_1,c_crop/q_auto:good,f_auto,fl_lossy,w_640,c_limit,dpr_2.5/v1646309208/nnqebus4qgapd4u6k67p.png",
        alt: "Pic Of מוניקה סקס",
      },
    ],
  },
  {
    name: "Haoman 17",
    email: "haoman17@haoman17.com",
    password: "Aa123456!",
    biz: true,
    phone: "03-6813636",
    bizUrl: "https://www.facebook.com/haoman17telaviv/",
    wazeLocation:
      "https://www.waze.com/en/live-map/directions/il/tel-aviv-district/tel-aviv-yafo/haoman-17?latlng=32.05389450321726%2C34.764057397842414",
    shows: [
      {
        performanceTitle: "ארכדי דוכין",
        subTitle: "מי אוהב אותך יותר ממני",
        description: "ערב מרגש ובלתי נשכח!",
        wazeLocation: "https://waze.com/ul/hsvcm56cys",
        performanceDate: "10/11/2022",

        url: "https://img.mako.co.il/2009/07/24/night_2007_arkadi_c.jpg",
        alt: "Pic Of החברים של נטאשה",
      },

      {
        performanceTitle: "שרון חזיז",
        subTitle: "הספוט עליי",
        description: "הקאמבק של העשור מגיע להופעה חד-פעמית!",
        wazeLocation:
          "https://www.waze.com/en/live-map/directions/il/tel-aviv-district/tel-aviv-yafo/haoman-17?latlng=32.05389450321726%2C34.764057397842414",
        performanceDate: "11/12/2022",

        url: "https://i.scdn.co/image/ab67616d0000b27354cea2c156a293a31c8b7a30",
        alt: "איגי וקסמן - הספוט עליי",
      },
    ],
  },
];

const useAddCardsToSite = () => {
  const dispatch = useDispatch();

  const returnCleanUser = (user) => {
    const { shows, ...rest } = user;
    return rest;
  };
  const hookFunction = async () => {
    try {
      dispatch(authActions.logout);
      localStorage.clear();
      for (let user of initialData) {
        let response = await axios.post(
          "/users/register",
          returnCleanUser(user)
        );
        for (let show of user) {
          let response = await axios.post("/cards/", show);
        }
      }
    } catch (error) {
      console.log("could not upload shows", error);
    }
    return;
  };
  return hookFunction;
};

export default useAddCardsToSite;
