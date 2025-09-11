import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Vérification de la clé secrète Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: Request) {
  try {
    const { items, relayPoint } = await request.json();
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Aucun article dans le panier' },
        { status: 400 }
      );
    }

    if (!relayPoint) {
      return NextResponse.json(
        { error: 'Aucun point relais sélectionné' },
        { status: 400 }
      );
    }
    
    // Calculer le montant total en centimes
    const amount = items.reduce((total: number, item: { price: number; quantity: number; }) => {
      return total + Math.round(item.price * 100 * item.quantity);
    }, 0);

    // Vérifier que le montant est valide
    if (amount < 50) { // Minimum 0.50€
      return NextResponse.json(
        { error: 'Le montant minimum est de 0.50€' },
        { status: 400 }
      );
    }

    // Créer une intention de paiement
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        relay_point_id: relayPoint.id,
        relay_point_name: relayPoint.name,
        relay_point_address: `${relayPoint.address}, ${relayPoint.zipCode} ${relayPoint.city}`,
        items: JSON.stringify(items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })))
      },
    });

    if (!paymentIntent.client_secret) {
      throw new Error('Failed to create payment intent');
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'intention de paiement:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}
