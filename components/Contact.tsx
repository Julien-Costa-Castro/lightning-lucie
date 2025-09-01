'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MessageCircle, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler l'envoi
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-400">
            Une question ? Une suggestion ? Nous sommes là pour vous écouter !
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <Card className="bg-gray-800/50 border-blue-500/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
                <MessageCircle className="h-6 w-6 mr-2" />
                Envoyez-nous un message
              </h2>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">✅</span>
                  </div>
                  <p className="text-green-400 font-semibold">Message envoyé avec succès !</p>
                  <p className="text-gray-400 mt-2">Nous vous répondrons dans les plus brefs délais.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-300">Nom</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-gray-700/50 border-gray-600 text-white focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-300">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-gray-700/50 border-gray-600 text-white focus:border-blue-400"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-gray-300">Sujet</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-gray-700/50 border-gray-600 text-white focus:border-blue-400"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-gray-300">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-gray-700/50 border-gray-600 text-white focus:border-blue-400"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group"
                  >
                    <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    Envoyer le message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Informations de contact */}
          <div className="space-y-8">
            <Card className="bg-gray-800/50 border-purple-500/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Informations
                </h3>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <p className="font-semibold">Email :</p>
                    <p className="text-blue-400">contact@lightning-lucie.com</p>
                  </div>
                  <div>
                    <p className="font-semibold">Réponse :</p>
                    <p>Sous 24-48 heures ouvrées</p>
                  </div>
                  <div>
                    <p className="font-semibold">Langues :</p>
                    <p>Français, Anglais</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-green-500/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-green-400 mb-4">Support client</h3>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Notre équipe est disponible pour vous aider avec vos commandes, 
                    questions sur les produits, ou tout autre sujet lié à Lightning Lucie.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-500/20 text-blue-300">Commandes</Badge>
                    <Badge className="bg-purple-500/20 text-purple-300">Produits</Badge>
                    <Badge className="bg-green-500/20 text-green-300">Support</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-yellow-500/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Presse & Médias</h3>
                <p className="text-gray-300 mb-4">
                  Journalistes et blogueurs, contactez-nous pour recevoir du matériel 
                  promotionnel et organiser des interviews avec l'équipe créative.
                </p>
                <Badge className="bg-yellow-500/20 text-yellow-300">Kit presse disponible</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}