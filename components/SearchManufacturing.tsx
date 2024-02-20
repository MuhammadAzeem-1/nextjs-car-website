"use client";

import React, { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { SearchManufacturing } from "@/types";
import Image from "next/image";
import { manufacturers } from "@/constants";

const SearchManufacturing = ({
  manufacturer,
  setManuFacturer,
}: SearchManufacturing) => {
  const [query, setQuery] = useState("");

  // we have to filter the list coming from the constants according to user input
  const filteredManufacturing =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLocaleLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLocaleLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManuFacturer}>
        <div className="relative w-full">
          {/* Button which shows the image inside the search bar */}
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              alt="Search bar logo"
              width={20}
              height={20}
            />
          </Combobox.Button>

          {/* Input feild to get input from user */}
          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Toyota"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* Transition as in Doscs */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            {/* like Html options to display when user right some text in input feild */}
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredManufacturing.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredManufacturing.map((item) => (
                  <Combobox.Option
                    key={item}
                    value={item}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                  >
                    {item}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturing;

//  {
//    ({ selected, active }) => (
//      <>
//        <span
//          className={`block truncate ${
//            selected ? "font-medium" : "font-normal"
//          }`}
//        >
//          {item}
//        </span>
//        {selected ? (
//          <span
//            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
//              active ? "text-white" : "text-teal-600"
//            }`}
//          >
//            {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
//          </span>
//        ) : null}
//      </>
//    );
//  }
