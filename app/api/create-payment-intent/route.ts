import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: Request) {
  try {
    const { items, relayPoint } = await request.json();
    
    // Calculer le montant total en centimes
    const amount = items.reduce((total: number, item: { price: number; quantity: number; }) => {
      return total + (item.price * 100 * item.quantity);
    }, 0);

    // Créer une intention de paiement
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      metadata: {
        relay_point_id: relayPoint.id,
        relay_point_name: relayPoint.name,
        relay_point_address: `${relayPoint.address}, ${relayPoint.zipCode} ${relayPoint.city}`,
      },
      // Ajoutez d'autres paramètres selon vos besoins
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'intention de paiement:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'intention de paiement' },
      { status: 500 }
    );
  }
}
