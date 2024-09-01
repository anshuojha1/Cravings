import React from "react";

export default function Price({ price, locale, currency }) {
  const formatprice = () =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
    }).format(price);
  return <span>{formatprice()}</span>;
}
Price.defaultsProps = {
  locale: "en-US",
  currency: "USD",
};
