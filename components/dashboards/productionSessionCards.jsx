'use client';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export default function ProductionSessionKpiCards() {
  const { sessionProducts = [] } = useSelector((state) => state.sessionProduct || {});

  const kpis = useMemo(() => {
    let total = 0;
    let today = 0;
    const todayStr = new Date().toISOString().split('T')[0];

    sessionProducts.forEach((p) => {
      total += Number(p.quantity);
      const dateStr = new Date(p.production_date).toISOString().split('T')[0];
      if (dateStr === todayStr) today += Number(p.quantity);
    });
return { total, today };
  }, [sessionProducts]);
   return (
    <div className="grid grid-cols-2 md:grid-cols-4">
      <Card title="Total Units Produced" value={kpis.total} />
      {/* <Card title="Today’s Production" value={kpis.today} /> */}
    </div>
  );
}
function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg ">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
  );
}
