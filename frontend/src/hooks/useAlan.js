import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import alanBtn from "@alan-ai/alan-sdk-web";

const COMMANDS = {
  OPEN_CART: "open-cart",
  CLOSE_CART: "close-cart",
  ADD_ITEM: "add-item",
};

export default function useAlan(props) {


  const roomUUID = window.location.pathname;
const productID = roomUUID.replace("/product/", "");
  const [alanInstance, setAlanInstance] = useState();
 
  const openCart = useCallback(() => {
    alanInstance.playText("Opening Cart");

    setTimeout(() => {
      window.location.href = "/cart";
    }, 1000);
  }, [alanInstance]);
  const closeCart = useCallback(() => {
    alanInstance.playText("Closing Cart");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }, [alanInstance]);

  const addItem = useCallback(
    ({ detail: { name, quantity } }) => {
      if (/product/.test(window.location.href)) {
        alanInstance.playText("Adding item");
        setTimeout(() => {
          window.location.href =
            "/cart/" + productID + "?qty=" + quantity;
        }, 1000);
      } else {
        // Change this to select item by name, if on homepage
        alanInstance.playText("No item displayed");
      
      }
    },
    [alanInstance]
  );
  useEffect(() => {
    window.addEventListener(COMMANDS.OPEN_CART, openCart);
    window.addEventListener(COMMANDS.CLOSE_CART, closeCart);
    window.addEventListener(COMMANDS.ADD_ITEM, addItem);
    return () => {
      window.removeEventListener(COMMANDS.OPEN_CART, openCart);
      window.removeEventListener(COMMANDS.CLOSE_CART, closeCart);
      window.removeEventListener(COMMANDS.ADD_ITEM, addItem);
    };
  }, [openCart, closeCart,addItem]);
  useEffect(() => {
    if (alanInstance != null) return;
   
    setAlanInstance(
      alanBtn({
        // top:'15px',
        // left:'15px',
        key:
         "41ca5b74b8ee684bbd428a5ffe6c64a52e956eca572e1d8b807a3e2338fdd0dc/stage",

        onCommand: ({ command, payload }) => {
          window.dispatchEvent(new CustomEvent(command, { detail: payload }));
        },
      })
    );
  }, []);
    
  return null;
}
