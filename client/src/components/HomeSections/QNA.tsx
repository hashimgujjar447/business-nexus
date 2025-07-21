import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface IQNA {
  id: number;
  question: string;
  answer: string;
}

const QNA = () => {
  const [whichQuestion, setWhichQuestion] = useState<number | null>(0);
  const qna: IQNA[] = [
    {
      id: 1,
      question: "What is Business Nexus?",
      answer:
        "Business Nexus is a networking platform that connects entrepreneurs with investors for collaboration and startup funding opportunities.",
    },
    {
      id: 2,
      question: "Who can join Business Nexus?",
      answer:
        "Both entrepreneurs seeking investment and investors looking for promising startups can join the platform.",
    },
    {
      id: 3,
      question: "Is my profile information secure?",
      answer:
        "Yes, we take data privacy seriously. Your information is protected and only visible to verified users within the platform.",
    },
    {
      id: 4,
      question: "How does the collaboration request work?",
      answer:
        "Investors can view entrepreneur profiles and send collaboration requests. Entrepreneurs can then accept or reject these requests.",
    },
    {
      id: 5,
      question: "Is there a cost to join?",
      answer:
        "No, signing up and using the core features of Business Nexus is completely free for both entrepreneurs and investors.",
    },
  ];

  return (
    <div className="container mx-auto flex items-center justify-center  flex-col px-3 sm:px-6">
      <h2 className="sm:text-3xl text-2xl font-bold text-center text-gray-900 mb-5 sm:mb-12">
        Most asked questions?
      </h2>
      {qna.map((question) => {
        return (
          <div
            key={question.id}
            className="bg-white w-full sm:w-[700px] mb-4 p-3 sm:p-5 rounded-lg"
          >
            <div className=" flex items-center justify-between">
              <h1 className="text-[14px] sm:text-[20px]">
                {question.question}
              </h1>
              {whichQuestion === question.id ? (
                <ChevronUp
                  className="cursor-pointer"
                  onClick={() => {
                    setWhichQuestion((prev) => {
                      if (prev === question.id) {
                        return null;
                      }

                      return question.id;
                    });
                  }}
                />
              ) : (
                <ChevronDown
                  className="cursor-pointer"
                  onClick={() => {
                    setWhichQuestion((prev) => {
                      if (prev === question.id) {
                        return null;
                      }

                      return question.id;
                    });
                  }}
                />
              )}
            </div>
            {question.id === whichQuestion && (
              <li className="pt-3 list-disc">{question.answer}</li>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QNA;
