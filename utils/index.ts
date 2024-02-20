import { filterProps } from "@/types";

export const CalculateRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerday = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerday.toFixed();
};

export async function fetchCars(filters: filterProps) {
  const { manufacturer, model, limit, fuel, year } = filters;

  console.log(manufacturer);
  const headers: HeadersInit = {
    "X-RapidAPI-Key": process.env.RAPID_API_KEY || "",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&model=${model}&fuel_type=gas&limit=${limit}`,
    { headers }
  );

  const result = await response.json();

  return result;
}

export const deleteSearchParams = () => {
  const newSearchParams = new URLSearchParams(window.location.search);

  newSearchParams.delete("manufacturer");
  newSearchParams.delete("model");

  const newPathName = `${
    window.location.pathname
  }?${newSearchParams.toString()}`;

  return newPathName;
};
