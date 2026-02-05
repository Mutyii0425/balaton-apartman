'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext'; 
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star, MessageSquareQuote, Send, Quote } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  createdAt: string;
}

export default function ReviewsPage() {
  const { t, language } = useLanguage(); 
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form, setForm] = useState({ name: '', text: '', rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  // Vélemények betöltése
  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => setReviews(data));
  }, []);

  // Küldés
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSubmitted(true);
    setForm({ name: '', text: '', rating: 5 });
  }

  // Segédfüggvény a dátum formázásához
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    let locale = 'hu-HU';
    if (language === 'de') locale = 'de-DE';
    if (language === 'en') locale = 'en-US';
    return date.toLocaleDateString(locale);
  };

  return (
    // FONTOS: pt-28 a felső menü miatt
    <main className="min-h-screen bg-gray-50/50 pt-28 pb-12 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        
        {/* FEJLÉC */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
             <div className="p-3 bg-blue-100 rounded-full text-blue-600 shadow-sm">
                <MessageSquareQuote className="w-8 h-8" />
             </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {t.reviews.title}
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light">
            {t.reviews.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 items-start">
          
          {/* BAL OLDAL: VÉLEMÉNYEK LISTA (Szélesebb) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-2xl font-bold text-slate-800">{t.reviews.list_title}</h2>
               <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                 {reviews.length} db vélemény
               </span>
            </div>
            
            {reviews.length === 0 ? (
              <div className="bg-white p-10 rounded-3xl text-center border border-dashed border-gray-300">
                 <p className="text-gray-400 italic text-lg">{t.reviews.empty}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id} className="bg-white shadow-sm border border-gray-100 rounded-2xl hover:shadow-md transition-shadow duration-300 overflow-hidden group">
                    <CardContent className="p-6 md:p-8 relative">
                      {/* Díszítő idézőjel a háttérben */}
                      <Quote className="absolute top-4 right-6 text-gray-100 w-16 h-16 transform rotate-180 group-hover:text-blue-50 transition-colors" />
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 relative z-10 gap-2">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                              {review.name.charAt(0).toUpperCase()}
                           </div>
                           <div>
                              <h3 className="font-bold text-slate-900 text-lg leading-tight">{review.name}</h3>
                              <p className="text-xs text-slate-400 font-medium">{formatDate(review.createdAt)}</p>
                           </div>
                        </div>
                        <div className="flex text-yellow-400 bg-yellow-50 px-2 py-1 rounded-lg">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                          ))}
                        </div>
                      </div>
                      
                      <div className="relative z-10 pl-2 border-l-2 border-blue-100">
                         <p className="text-slate-600 text-base leading-relaxed italic">"{review.text}"</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* JOBB OLDAL: ÚJ VÉLEMÉNY ŰRLAP (Keskenyebb, ragadós) */}
          <div className="lg:col-span-1 sticky top-24">
            <Card className="shadow-xl border-t-8 border-t-blue-600 rounded-[2rem] bg-white overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-100 p-6 text-center">
                <CardTitle className="text-xl font-bold text-slate-800">{t.reviews.form_title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {submitted ? (
                  <div className="bg-green-50 p-6 rounded-2xl text-green-800 text-center border border-green-100 animate-in fade-in zoom-in duration-300">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Star className="w-6 h-6 text-green-600 fill-current" />
                    </div>
                    <p className="font-bold text-lg mb-1">{t.reviews.success_title}</p>
                    <p className="text-sm opacity-90 mb-4">{t.reviews.success_msg}</p>
                    <Button variant="outline" size="sm" className="bg-white border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800 font-semibold" onClick={() => setSubmitted(false)}>
                      {t.reviews.write_new}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider pl-1">{t.reviews.label_name}</label>
                      <Input 
                        required 
                        value={form.name} 
                        onChange={e => setForm({...form, name: e.target.value})} 
                        placeholder={t.reviews.placeholder_name}
                        className="h-12 border-gray-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl transition-all"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider pl-1">{t.reviews.label_rating}</label>
                      <div className="flex justify-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setForm({...form, rating: star})}
                            className="focus:outline-none transition transform hover:scale-125 active:scale-95 p-1"
                          >
                            <Star 
                              className={`w-8 h-8 ${star <= form.rating ? 'text-yellow-400 fill-current drop-shadow-sm' : 'text-gray-200'}`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider pl-1">{t.reviews.label_text}</label>
                      <Textarea 
                        required 
                        rows={5}
                        value={form.text} 
                        onChange={e => setForm({...form, text: e.target.value})} 
                        placeholder={t.reviews.placeholder_text}
                        className="border-gray-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl transition-all resize-none p-3 text-base"
                      />
                    </div>

                    <Button type="submit" className="w-full h-12 text-lg font-bold bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5 transition-all">
                      <Send className="w-4 h-4 mr-2" /> {t.reviews.submit}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </main>
  );
}