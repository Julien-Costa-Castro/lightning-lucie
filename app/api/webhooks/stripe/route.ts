import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: Request) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature') || '';
  
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err) {
    console.error(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }

  // Gérer les événements de paiement
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Paiement réussi:', paymentIntent.id);
      // Mettez à jour votre base de données ici
      break;
      
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.log('Paiement échoué:', failedPayment.id);
      // Gérer l'échec du paiement
      break;
      
    default:
      console.log(`Événement non géré: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

export const dynamic = 'force-dynamic';
