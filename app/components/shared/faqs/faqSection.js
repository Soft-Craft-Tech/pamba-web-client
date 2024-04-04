"use client";
import {questions} from "@/app/utils/faqQuestions";
import { useState } from "react";
import {RxCaretDown, RxCaretUp} from "react-icons/rx";
import uniqid from "uniqid";

export default function PambaFAQS() {
    const [expanders, setExpanders] = useState([
        { id: 0, expanded: false },
        { id: 1, expanded: false },
        { id: 2, expanded: false },
        { id: 3, expanded: false }
    ]);
    const toggleExpander = (id) => {
    setExpanders((prevState) =>
        prevState.map((expander) =>
        expander.id === id ? { ...expander, expanded: !expander.expanded } : expander
        )
    );
    };

    return (
        <div className="flex flex-col gap-5 p-20 items-center  bg-white">
            <h2 className="text-4xl font-extrabold w-max">FAQs</h2>
            <div className="flex flex-col justify-center items-center gap-5 w-2/3">
            {expanders.map((expander) => (
                <div className="p-5 rounded-md bg-[#FAF1F5] flex flex-col w-full gap-2"   onClick={() => toggleExpander(expander.id)} key={uniqid()}>
                    <div className="flex h-6 justify-between items-center">
                        <p className="text-base md:font-bold md:text-lg mb-2">{questions[expander.id].qn}</p>
                        <div className="">
                            {expander.expanded ? <RxCaretUp color="#DB1471" size={40} /> : <RxCaretDown color="#DB1471" size={40} />}
                        </div>
                    </div>
                    {expander.expanded && (
                        <div className="w-full text-justify font-medium text-sm text-secondary md:w-11/12">
                        {questions[expander.id].ans}
                        </div>
                    )}
                </div>
            ))}
            </div>
        </div>
    )
}