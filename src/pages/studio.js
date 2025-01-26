"use client";

import { Tabs } from "@mantine/core";
import studioJson from "../stuido.json";
import { useState } from "react";
import Image from "next/image";

export default function Studio() {
  const [activeTab, setActiveTab] = useState(studioJson[0].id);

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <Tabs.List>
        {studioJson.map((item) => {
          return (
            <Tabs.Tab value={item.id} key={item.id}>
              {item.name}
            </Tabs.Tab>
          );
        })}
      </Tabs.List>
      {studioJson.map((item) => {
        return (
          <Tabs.Panel
            value={item.id}
            key={item.id}
            className="p-8 flex flex-col justify-start items-center gap-5"
          >
            <Image
              className="rounded-lg"
              src={item.thumbnail}
              alt={item.name}
              width={100}
              height={100}
              priority
            />
            <div>{item.name}</div>
            <div className="flex justify-center items-center gap-12 mb-12">
              {item.hosts.map((h) => (
                <div
                  key={h.name}
                  className="flex justify-center items-center flex-col gap-4"
                >
                  <Image
                    className="rounded-lg"
                    src={h.image}
                    alt={h.name}
                    width={100}
                    height={100}
                    priority
                  />
                  <div className="text-xl">{h.name}</div>
                </div>
              ))}
            </div>
          </Tabs.Panel>
        );
      })}
    </Tabs>
  );
}
