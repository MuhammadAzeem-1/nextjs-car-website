"use client";

import React, { useState } from "react";
import SearchManufacturing from "./SearchManufacturing";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteSearchParams } from "@/utils";

const SearchButton = ({ moreCss }: { moreCss: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${moreCss}`}>
    <Image
      src={"/magnifying-glass.svg"}
      alt="Search icon"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

const SearchBar = () => {
  const [manufacturer, setManuFacturer] = useState("");
  const [model, setModel] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer.trim() === "" && model.trim() === "") {
      return alert("Please Enter some Thing");
    }

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    deleteSearchParams();

    const searchParams = new URLSearchParams(window.location.search);

    // Adding and Removing Search Params
    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    // Adding and Removing Search Params
    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
      searchParams.delete("manufacturer");
    }

    const newPathName = `${window.location.search}?${searchParams.toString()}`;
    router.push(newPathName);
  };

  return (
    <form action="searchbar" onSubmit={handleSubmit} className="searchbar">
      <div className="searchbar__item">
        <SearchManufacturing
          manufacturer={manufacturer}
          setManuFacturer={setManuFacturer}
        />

        <SearchButton moreCss="sm:hidden" />
      </div>

      <div className=" searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[25px] h-[20px] ml-4"
          alt="Car Model"
        />

        <input
          type="text"
          name="model"
          placeholder="camery"
          value={model}
          className="searchbar__input"
          onChange={(e) => setModel(e.target.value)}
        />

        <SearchButton moreCss="sm:hidden" />
      </div>
      <SearchButton moreCss="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
