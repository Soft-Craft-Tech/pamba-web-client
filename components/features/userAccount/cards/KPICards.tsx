import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import CurrencyFormatter from "@/app/utils/CurrencyParser";

export default function KPI({title, value, change, positiveChange, financial}) {
    return (
        <div className="max-w-60 max-h-56 p-7 rounded-md flex flex-col justify-between bg-white shadow-sm">
            <h3 className="text-xs text-muted font-light">{title}</h3>
            <div className="flex gap-2 h-max items-center">
                <h3 className="text-secondary text-xl font-bold">{financial ? CurrencyFormatter(value) : value}</h3>
                <p className={`flex gap-1 h-max items-center text-xs font-semibold ${positiveChange ? 'text-green-500' : 'text-red-500'}`}>
                    {!positiveChange ? <AiOutlineArrowDown /> : <AiOutlineArrowUp /> }
                    {change}%
                </p>
            </div>
        </div>
    )
}