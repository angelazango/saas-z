import Link from "next/link";

 export default function Home () {
  return (
    <div className="flex items-center justify-center
     min-h-screen flex-col ">
      
      <h2 className="text-5xl  mb-4"> inventory system</h2>
      <Link href="/dashboard/home/overview" > view dashboard</Link>
       </div>
  )
 }