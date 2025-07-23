import CurrencyFormatter from "@/ui/CurrencyParser";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

interface KPIProps {
  title: string;
  value: number;
  change: number;
  positiveChange: boolean;
  financial: boolean;
  className?: string;
}

const KPI: React.FC<KPIProps> = ({
  title,
  value,
  change,
  positiveChange,
  financial,
  className,
}: KPIProps) => {
  return (
    <div className={`max-h-60 px-6 py-3 rounded-lg flex flex-col justify-between bg-white shadow-sm border ${className}`}>
      <h3 className="text-xs text-muted font-light">{title}</h3>
      <div className="flex flex-col sm:flex-row gap-2 h-max items-start sm:items-center">
        <h3 className="text-secondary text-xl font-bold">
          {financial ? CurrencyFormatter(value) : value}
        </h3>
        <p
          className={`flex gap-1 h-max items-center text-xs font-semibold ${
            positiveChange ? "text-green-500" : "text-red-500"
          }`}
        >
          {!positiveChange ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
          {change}%
        </p>
      </div>
    </div>
  );
};

export default KPI;
