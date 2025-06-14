
import React from 'react';
import { Shield, Sword } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-iron-900 to-background border-t border-gold-700/30 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-8 w-8 text-gold-500 mr-3" />
            <h3 className="text-2xl font-cinzel font-bold text-gold-400">
              The Master Armourer
            </h3>
            <Sword className="h-8 w-8 text-gold-500 ml-3" />
          </div>
          
          <div className="max-w-2xl mx-auto mb-8">
            <blockquote className="text-lg font-cormorant italic text-gold-200 mb-4">
              "A mind needs books as a sword needs a whetstone, if it is to keep its edge."
            </blockquote>
            <cite className="text-gold-400 font-cormorant">— Tyrion Lannister</cite>
          </div>

          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent w-32" />
            <Shield className="mx-4 h-4 w-4 text-gold-500" />
            <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent w-32" />
          </div>

          <p className="font-cormorant text-foreground/60 mb-4">
            Built for the students of warfare and the lovers of the Seven Kingdoms
          </p>
          
          <p className="font-cormorant text-foreground/40 text-sm">
            © 2024 The Master Armourer. Winter is Coming.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
