"use client";

import React, {
  useState,
  experimental_useOptimistic as useOptimistic,
} from "react";
import { Button } from "./ui/button";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import axios from "axios";

const FavouriteButton = ({
  type,
  id,
  spotifyId,
  isFavourite,
  image,
  name,
  setIsFavourite,
}) => {
  const [loading, setLoading] = useState(false);
  // const [optimisticValue, setOptimisticValue] = useOptimistic(isFavourite,
  //   (state, newVal) => {
  //     return newVal}
  //   );

  const handleMarkFavourite = async () => {
    try {
      
      if (!id){
        toast.warning("Please login to mark favourite")
        return
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/markFavourite`,
        {
          type,
          spotifyId,
          id: id,
          image,
          name,
        }
      );
      if (res.status !== 200) {
        throw new Error("Failed to mark favourite");
      }
      toast.success(res?.data?.data?.message);
      setIsFavourite((prev) => !prev);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Button
        size="icon"
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          // setOptimisticValue(!isFavourite);
          await handleMarkFavourite();
          setLoading(false);
        }}
      >
        {isFavourite ? <HeartFilledIcon /> : <HeartIcon />}
      </Button>
    </>
  );
};

export default FavouriteButton;
