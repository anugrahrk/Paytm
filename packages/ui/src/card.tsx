import { JSX, type ReactNode } from "react";

export function Card({
  title,
  children,
}:{
  title: string;
  children: ReactNode;
}){
  return (
   <div className=" p-4 rounded-lg border-0 bg-white">
    <h1 className="border-b pb-4 border-slate-400 text-lg font-semibold">{title}</h1>
    <p>{children}</p>
   </div>
  );
}
