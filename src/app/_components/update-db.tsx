"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";
export function UpdateDb() {
  const router = useRouter() ;
  const updateDB = api.courses.insert_all_data_lmao.useMutation({
    onSuccess: ()=>{
      //console.log(updateDB.data?.toString())
      router.refresh();
    }
  })

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          updateDB.mutate()
        }}
        className="flex flex-col gap-2"
      >
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        >
        </button>
      </form>
    </div>
  )
}