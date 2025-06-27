

'use client'

import Header from "../../../components/dashboard/Header";
import HomeNav from "../../../components/HomeNav";
import Sidebar from "../../../components/dashboard/Sidebar";
import { Provider } from "react-redux";
import store from "@/src/redux/store";

export default function Layout({ children }) {
  return (
    <Provider store={store}>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 bg-slate-100 min-h-screen ml-64"> {/* Adjust margin to match sidebar width */}
          <Header />
          <HomeNav />
          {children}
        </main>
      </div>
    </Provider>
  );
}