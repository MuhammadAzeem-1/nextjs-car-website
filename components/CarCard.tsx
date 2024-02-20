"use client";

import { useState } from "react";
import { CarProps } from "@/types";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { CalculateRent } from "@/utils";
import CardDetails from "./CardDetails";

interface carCardProps {
  car: CarProps;
}

const CarCard = ({ car }: carCardProps) => {
  const { city_mpg, year, make, model, transmission, drive } = car;

  const [isOpen, setIsOpen] = useState(false);

  const carRent = CalculateRent(city_mpg, year);

  return (
    <div className="car-card group">
      <div className="card-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>

      <p className="flex mt-66 text-[32px] leading-[36px] font-extrabold">
        <span className="self-start text-[14px] leading-[17px] font-semibold">
          $
        </span>
        {carRent}
        <span className="self-end text-[14px] leading-[14px] font-medium">
          /day
        </span>
      </p>

      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src="/hero.png"
          alt="Car Image"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-grey">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/steering-wheel.svg"
              alt="steering wheel"
              width={20}
              height={20}
            />
            <p className="text-[14px] leading-[17px]">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>

          <div className="car-card__icon">
            <Image src="/tire.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{drive.toUpperCase()}</p>
          </div>

          <div>
            <Image src="/gas.svg" width={20} height={20} alt="gas" />
            <p className="car-card__icon-text">{city_mpg} MPG</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full rounded-full bg-primary-blue py-[16px]"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => {
              setIsOpen(true);
            }}
          />
        </div>
      </div>

      <CardDetails
        isOpen={isOpen}
        closeModel={() => {
          setIsOpen(false);
        }}
        car={car}
      />
    </div>
  );
};

export default CarCard;
