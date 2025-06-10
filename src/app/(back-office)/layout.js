// import Header from '../../components/dashboard/Header';
// import './globals.css'; 

import Header from "../../../components/dashboard/Header";
import HomeNav from "../../../components/HomeNav";
import Sidebar from "../../../components/dashboard/Sidebar";



export default function Layout

 ({ children }) {
  return (
   
      <div className="flex">
       <Sidebar />
        <main className="w-full 
         bg-slate-100
         min-h-screen">
             <Header />
             <HomeNav/>
             { children }
        </main>
      </div>
 
  );

}
