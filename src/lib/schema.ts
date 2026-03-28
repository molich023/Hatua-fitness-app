import { 
  pgTable, 
  text, 
  integer, 
  timestamp, 
  doublePrecision, 
  uuid, 
  boolean,
  pgEnum 
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 1. Define Enums for Tiers and Activity Types
export const tierEnum = pgEnum("tier", ["Msingi", "Nguvu", "Dhahabu"]);
export const activityEnum = pgEnum("activity_type", ["Walking", "Jogging", "Cycling", "Racing"]);

// 2. Users Table: The core profile
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(), // For M-Pesa integration
  password: text("password").notNull(), // Hashed
  avatar: text("avatar").default("Simba"), // Simba, Chui, etc.
  tier: tierEnum("tier").default("Msingi"),
  points: integer("points").default(0),
  referralCode: text("referral_code").unique().notNull(),
  referredBy: uuid("referred_by"), // Track who invited them
  createdAt: timestamp("created_at").defaultNow(),
});

// 3. Activities Table: Every step counts
export const activities = pgTable("activities", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  type: activityEnum("type").default("Walking"),
  distanceMeters: integer("distance_meters").notNull(),
  distanceKm: doublePrecision("distance_km").notNull(),
  isOutdoor: boolean("is_outdoor").default(true),
  pointsEarned: integer("points_earned").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

// 4. Subscriptions Table: Track KSH payments
export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  amountKsh: integer("amount_ksh").notNull(), // 100, 500, or 1000
  expiryDate: timestamp("expiry_date").notNull(),
  isActive: boolean("is_active").default(true),
  paymentRef: text("payment_ref").unique(), // M-Pesa Transaction ID
});

// 5. Relations: For easy data fetching
export const userRelations = relations(users, ({ many, one }) => ({
  activities: many(activities),
  subscriptions: many(subscriptions),
  inviter: one(users, {
    fields: [users.referredBy],
    references: [users.id],
    relationName: "referral",
  }),
}));
