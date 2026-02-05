'use client';

import { useLanguage } from '../context/LanguageContext'; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, ChevronDown } from "lucide-react";

export default function FAQPage() {
  const { t } = useLanguage(); 

  return (
    // FONTOS: pt-28 a felső menü miatt
    <main className="min-h-screen bg-gray-50/50 pt-28 pb-12 px-6 lg:px-12">
      <div className="max-w-[1000px] mx-auto">
        
        {/* FEJLÉC */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
             <div className="p-3 bg-blue-100 rounded-full text-blue-600 shadow-sm">
                <HelpCircle className="w-10 h-10" />
             </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {t.faq.title}
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light">
            {t.faq.subtitle}
          </p>
        </div>

        {/* GYIK KÁRTYA */}
        <Card className="shadow-xl border-gray-100 rounded-[2rem] overflow-hidden bg-white">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
            <CardTitle className="text-2xl font-bold text-blue-900 flex items-center gap-3">
               <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
               {t.faq.card_title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-4">
              
              <FaqItem 
                question={t.faq.q_checkin} 
                answer={t.faq.a_checkin}
              />

              <FaqItem 
                question={t.faq.q_checkout} 
                answer={t.faq.a_checkout}
              />

              <FaqItem 
                question={t.faq.q_towels} 
                answer={t.faq.a_towels}
              />

              <FaqItem 
                question={t.faq.q_dog} 
                answer={t.faq.a_dog}
              />

              <FaqItem 
                question={t.faq.q_bbq} 
                answer={t.faq.a_bbq}
              />

              <FaqItem 
                question={t.faq.q_beach} 
                answer={t.faq.a_beach}
              />

               <FaqItem 
                question={t.faq.q_ac} 
                answer={t.faq.a_ac}
              />

            </div>
          </CardContent>
        </Card>

      </div>
    </main>
  );
}

// Modern, animált FaqItem komponens
function FaqItem({ question, answer }: { question: string, answer: string }) {
  return (
    <details className="group border border-gray-100 rounded-2xl bg-white overflow-hidden transition-all duration-300 open:shadow-md open:ring-1 open:ring-blue-100 hover:border-blue-200">
      <summary className="flex cursor-pointer items-center justify-between p-5 font-bold text-lg text-slate-800 group-open:text-blue-600 transition-colors select-none">
        {question}
        <span className="ml-4 flex-shrink-0 transition-transform duration-300 group-open:-rotate-180 bg-slate-50 p-2 rounded-full group-open:bg-blue-50 group-open:text-blue-600">
          <ChevronDown className="w-5 h-5" />
        </span>
      </summary>
      <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed text-base border-t border-transparent group-open:border-slate-50 animate-in slide-in-from-top-2 fade-in duration-200">
        <div className="pt-3">
           {answer}
        </div>
      </div>
    </details>
  );
}