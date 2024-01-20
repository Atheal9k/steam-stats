"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, X } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useState } from "react";

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: `/steamid/${value}`,
        query: { steamid: value },
      },
      { skipEmptyString: true }
    );
    router.push(url);
  };

  const onClear = () => {
    setValue("");
  };

  return (
    <form className="relative w-full flex items-center" onSubmit={onSubmit}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter Steam ID or Vanity Name"
        className="rounded-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 appearance-none"
      />
      {value && (
        <X
          className="absolute top-2.5 right-[4.3rem] h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
          onClick={onClear}
        />
      )}
      <Button
        type="submit"
        size="default"
        variant="primary"
        className="rounded-none"
      >
        <ArrowRight className="h-6 w-6 text-muted-foreground" />
      </Button>
    </form>
  );
};
