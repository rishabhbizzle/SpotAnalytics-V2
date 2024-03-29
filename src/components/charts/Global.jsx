'use client';

import Head from "@/assets/global.jpg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const Global = () => {
  const url =
    "https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-global-200/recent.json";
  const [data, setData] = useState({
    date: "YYYY-DD-MM",
    data: [
      {
        name: "string",
        artist: "string",
        image: "string",
        rank: "number",
        last_week_rank: "number | null",
        peak_rank: "number",
        weeks_on_chart: "number",
      },
    ],
  });

  useEffect(() => {
    fetch(url)
      .then(async (response) => {
        if (!response.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error('Failed to fetch data')
        }
        setData(await response.json());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [startList, setStartList] = useState(0);
  const [endList, setEndList] = useState(10);
  const date = data.date;
  const songs = data.data;

  const nextList = () => {
    setStartList(startList + 10);
    setEndList(endList + 10);
  };

  const prevList = () => {
    setStartList(startList - 10);
    setEndList(endList - 10);
  };

  let songsList = songs.slice(startList, endList);

  const handleChange = (rank, last_week_rank) => {
    if (last_week_rank === null) {
      return ["text-center bg-blue-100", "NEW"];
    } else {
      if (rank > last_week_rank) {
        return ["text-center bg-red-100", `-${rank - last_week_rank}`];
        //Down
      } else if (rank === last_week_rank) {
        return ["text-center bg-blue-100", "="];
      } else {
        return ["text-center bg-green-100", `+${last_week_rank - rank}`];
        //UP
      }
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="text-[8px] sm:text-[10px] md:text-[15px] box max-w-[700px] p-2 md:p-6 my-10">
        <div className="head w-full shadow-2xl">
        <img className="items-center" src='/global.jpg' alt="HOT100" />
        </div>
        <div className="bg-[#2922C6] text-xs md:text-sm text-muted-foreground text-end pr-3">
          @StatsCrave
        </div>
        {/* <div className="hot">
        <img src={Hot} alt="" />
        </div> */}
        <div className="p-[14px] md:p-5 global-bg w-full flex justify-center shadow-2xl">
          <table className=" w-full ">
            <tbody>
              <tr>
                <th className="bg-[#2922C6] text-white text-left md:px-2">
                  RANK
                </th>
                <th className="bg-[#2922C6] text-white text-left px-1 md:px-2">
                  +/-
                </th>
                <th className="bg-[#2922C6] text-white text-left"></th>
                <th className="bg-[#2922C6] text-white text-left px-1 md:px-2 ">
                  SONG
                </th>
                <th className="bg-[#2922C6] text-white text-left px-1 md:px-2">
                  ARTIST
                </th>
                <th className="bg-[#2922C6] text-white text-left px-1 md:px-2">
                  PEAK
                </th>
                <th className="bg-[#2922C6] text-white text-left px-1">
                  W.O.C
                </th>
              </tr>

              {songsList.map((song, i) => (
                <tr className="even:bg-white odd:bg-gray-100 text-black font-medium" key={i}>
                  <td className="pr-1 md:pr-3  text-end border-r-2 border-dashed">
                    {song.rank}
                  </td>
                  <td
                    className={handleChange(song.rank, song.last_week_rank)[0]}
                  >
                    {handleChange(song.rank, song.last_week_rank)[1]}
                  </td>
                  <td className="w-8 h-8 md:w-10 md:h-10">
                    <img
                      src={song.image}
                      alt="cover"
                      className="w-8 h-8 md:w-10 md:h-10"
                    />
                  </td>
                  <td className="px-1 h-3 md:px-2 md:h-10 border-r-2 border-dashed">
                    {song.name}
                  </td>
                  <td className="px-1 h-3 md:px-2 md:h-10 border-r-2 border-dashed">
                    {song.artist}
                  </td>
                  <td className="px-1 md:px-2 border-r-2 border-dashed">
                    {song.peak_rank}
                  </td>
                  <td
                    className={
                      song.weeks_on_chart < 60 ? "px-2" : "bg-yellow-100 px-2"
                    }
                  >
                    {song.weeks_on_chart}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="date text-right">
          <h3 className="">{date}</h3>
        </div>
        <div className="flex justify-between my-6">
          <button
            disabled={startList <= 0}
            onClick={prevList}
            className={
              startList <= 0
                ? "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l opacity-50 cursor-not-allowed"
                : "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            }
          >
            Prev
          </button>
          <button
            disabled={endList >= 200}
            onClick={nextList}
            className={
              endList >= 200
                ? "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l opacity-50 cursor-not-allowed"
                : "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Global;
