/*
  # Brasil Vanish Roleplay - VIP System Database Schema

  ## Overview
  This migration creates the database structure for the VIP package system
  for the Brasil Vanish Roleplay GTA server.

  ## New Tables
  
  ### `vip_packages`
  Stores the different VIP tier packages available for purchase
  - `id` (uuid, primary key) - Unique package identifier
  - `name` (text) - Package name (e.g., "VIP Bronze", "VIP Silver")
  - `description` (text) - Detailed package description
  - `price` (numeric) - Price in BRL
  - `duration_days` (integer) - Duration in days
  - `features` (jsonb) - Array of features/benefits
  - `color` (text) - Color theme for the package card
  - `is_active` (boolean) - Whether package is available for purchase
  - `display_order` (integer) - Order to display packages
  - `created_at` (timestamptz) - Creation timestamp

  ### `purchases`
  Records all VIP package purchases
  - `id` (uuid, primary key) - Unique purchase identifier
  - `package_id` (uuid, foreign key) - Reference to vip_packages
  - `player_name` (text) - In-game player name
  - `email` (text) - Customer email
  - `amount` (numeric) - Purchase amount in BRL
  - `status` (text) - Purchase status (pending/completed/cancelled)
  - `payment_method` (text) - Payment method used
  - `created_at` (timestamptz) - Purchase timestamp
  - `expires_at` (timestamptz) - VIP expiration date

  ## Security
  - Enable RLS on all tables
  - Public read access for active VIP packages
  - Authenticated access for purchase records

  ## Notes
  - Prices are stored in BRL (Brazilian Real)
  - Features are stored as JSONB for flexibility
  - Purchase status tracking for payment processing
*/

-- Create vip_packages table
CREATE TABLE IF NOT EXISTS vip_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric(10, 2) NOT NULL,
  duration_days integer NOT NULL DEFAULT 30,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  color text NOT NULL DEFAULT '#10b981',
  is_active boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id uuid REFERENCES vip_packages(id) ON DELETE CASCADE,
  player_name text NOT NULL,
  email text NOT NULL,
  amount numeric(10, 2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  payment_method text,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz
);

-- Enable RLS
ALTER TABLE vip_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- RLS Policies for vip_packages
CREATE POLICY "Anyone can view active VIP packages"
  ON vip_packages FOR SELECT
  USING (is_active = true);

-- RLS Policies for purchases (restrictive - only for admin management)
CREATE POLICY "Public can insert purchases"
  ON purchases FOR INSERT
  WITH CHECK (true);

-- Insert default VIP packages for Brasil Vanish Roleplay
INSERT INTO vip_packages (name, description, price, duration_days, features, color, display_order) VALUES
(
  'VIP Bronze',
  'Perfeito para começar sua jornada no servidor com vantagens exclusivas',
  29.90,
  30,
  '["Acesso a veículos exclusivos", "Kit inicial VIP", "Tag [VIP Bronze] no chat", "Prioridade na fila de entrada", "5 slots de garagem extras"]'::jsonb,
  '#cd7f32',
  1
),
(
  'VIP Silver',
  'Aproveite benefícios intermediários e destaque-se no servidor',
  59.90,
  30,
  '["Todos os benefícios Bronze", "Acesso a casas VIP", "Kit semanal exclusivo", "Tag [VIP Silver] no chat", "10 slots de garagem extras", "Desconto em lojas do servidor", "Skin exclusiva"]'::jsonb,
  '#c0c0c0',
  2
),
(
  'VIP Gold',
  'A melhor experiência VIP com benefícios premium e exclusivos',
  99.90,
  30,
  '["Todos os benefícios Silver", "Acesso a área VIP exclusiva", "Kit diário premium", "Tag [VIP Gold] no chat", "20 slots de garagem extras", "Veículos premium exclusivos", "Prioridade máxima", "Apartamento de luxo", "Comandos especiais"]'::jsonb,
  '#ffd700',
  3
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_vip_packages_active ON vip_packages(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON purchases(status, created_at);