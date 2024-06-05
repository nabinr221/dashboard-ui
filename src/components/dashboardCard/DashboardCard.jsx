// import Container from "postcss/lib/container";
import { Eye } from 'lucide-react';
const DashboardCard = ({ className = '', children }) => {
  return (
    <div className={`w-full border p-10 card-shadow  relative ${className} `}>
      <div className="space-y-3 text-indigo-50">
        <p className="text-lg font-bold">Publcation</p>
        <h1 className="text-4xl font-bold">
          1009 <span className="text-sm">views</span>
        </h1>
      </div>

      <div className="absolute top-5 right-10">
        <div className="flex items-center justify-center  rounded-full w-16 h-16 bg-orange-600">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
