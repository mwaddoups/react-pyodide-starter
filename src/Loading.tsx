import React from "react";
import { Disc } from "react-bootstrap-icons";

interface LoadingProps {
  loading: string,
  children: React.ReactNode
}

export default function Loading({loading, children}: LoadingProps) {
  return (
    <div className="relative">
      <div className={loading ? "blur" : ""}>
        {children}
      </div>
      {loading && (
        <div className="absolute inset-1/2 w-full h-full">
          <div className="flex">
            <Disc className="origin-center animate-spin w-5 h-5 text-slate-500" />
            <p className="ml-1 ">{loading}</p>
          </div>
        </div>
      )}
    </div>
  )
}