
import { pgTable, serial, text, integer, timestamp, doublePrecision, pgEnum } from 'drizzle-orm/pg-core';

// 1. Define the Enums (Must match the SQL types we created)
export const tierEnum = pgEnum('hatua_tier', ['Cheetah', 'Chui', 'Simba', 'Nyati']);
export const statusEnum = pgEnum('sub_status', ['active', 'expired', 'pending_payment', 'cancelled']);

// 2. The Users Table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  auth0Id: text('auth0_id').unique().notNull(),
  email: text('email').notNull(),
  displayName: text('display_name'),
  currentTier: tierEnum('current_tier').default('Cheetah'),
  totalPoints: integer('total_points').default(0),
  totalDistanceKm: doublePrecision('total_distance_km').default(0.0),
  createdAt: timestamp('created_at').defaultNow(),
});

// 3. The Subscriptions Table
export const subscriptions = pgTable('subscriptions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  tierPurchased: tierEnum('tier_purchased').notNull(),
  amountPaid: integer('amount_paid').notNull(),
  mpesaReceipt: text('mpesa_receipt_number').unique(),
  status: statusEnum('status').default('pending_payment'),
  startDate: timestamp('start_date').defaultNow(),
  expiryDate: timestamp('expiry_date'),
});
