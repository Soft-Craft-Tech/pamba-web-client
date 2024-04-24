"use client";
import { questions } from "@/ui/faqQuestions";
import { useState } from "react";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";

export default function PambaFAQS() {
  const [expanders, setExpanders] = useState([
    { id: 0, expanded: false },
    { id: 1, expanded: false },
    { id: 2, expanded: false },
    { id: 3, expanded: false },
  ]);
  const toggleExpander = (id: number) => {
    setExpanders((prevState) =>
      prevState.map((expander) =>
        expander.id === id
          ? { ...expander, expanded: !expander.expanded }
          : expander
      )
    );
  };

  return (
    <div className="flex flex-col gap-5 p-5 items-center  bg-white sm:p-10 lg:p-20">
      <h2 className="text-4xl font-extrabold w-max">FAQs</h2>
      <div className="flex flex-col justify-center items-ceuninter gap-5 w-full lg:w-2/3">
        {expanders.map((expander) => (
          <div
            key={expander.id}
            className="p-5 rounded-md bg-[#FAF1F5] flex flex-col w-full gap-2"
            onClick={() => toggleExpander(expander.id)}
          >
            <div className="flex h-6 justify-between items-center">
              <p className="text-base lg:font-bold lg:text-lg mb-2">
                {questions[expander.id].qn}
              </p>
              <div className="">
                {expander.expanded ? (
                  <RxCaretUp color="#DB1471" size={40} />
                ) : (
                  <RxCaretDown color="#DB1471" size={40} />
                )}
              </div>
            </div>
            {expander.expanded && (
              <div className="w-full text-justify font-medium text-sm text-secondary lg:w-11/12">
                {questions[expander.id].ans}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
