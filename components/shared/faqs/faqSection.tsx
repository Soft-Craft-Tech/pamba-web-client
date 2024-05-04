"use client";
import { questions } from "@/ui/faqQuestions";
import { useState } from "react";
import {RxCaretDown, RxCaretUp} from "react-icons/rx";

const FAQS = () => {
    const [expandedQn, setExpandedQn] = useState<number | null>(null);
    const toggleExpander = (index: number) => {
        setExpandedQn(prev => (prev === index && prev !== null ? null: index));
    }
    return (
        <div className="flex flex-col gap-5 p-5 items-center  bg-white sm:p-10 lg:p-20">
            <h2 className="text-4xl font-extrabold w-max sm:text-5xl ">FAQs</h2>
            <div className="flex flex-col justify-center items-center gap-5 w-full lg:w-2/3 ">
                {questions.map((question, index) => (
                    <div className="p-5  cursor-pointer rounded-md bg-[#FAF1F5] flex flex-col w-full gap-2" key={question.id} onClick={() => {toggleExpander(index)}} >
                        <div className="flex h-6 justify-between items-center">
                            <p className="mb-2 text-base lg:font-bold lg:text-lg">{question.qn}</p>
                            <div className="text-secondary">
                                {expandedQn === index ? <RxCaretUp size={40} /> :<RxCaretDown  size={40} />}
                            </div>
                        </div>
                        <div className={`w-full text-justify font-medium  text-sm text-secondary ${expandedQn === index ? 'block': 'hidden'} lg:w-11/12`}>
                            {question.ans}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FAQS;