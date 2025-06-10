-- JAY Real Estate Database Schema
-- Run this SQL in your Supabase SQL editor to create the necessary tables

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'manager', 'agent')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'manager', 'agent')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(50),
  property_type VARCHAR(50),
  budget VARCHAR(20),
  message TEXT NOT NULL,
  source VARCHAR(50) NOT NULL DEFAULT 'contact-page',
  status VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
  
  -- Property inquiry specific fields
  property_id VARCHAR(100),
  property_name VARCHAR(255),
  inquiry_type VARCHAR(50),
  preferred_contact_time VARCHAR(20),
  
  -- Newsletter specific fields
  interests TEXT[], -- Array of interests
  
  -- Callback specific fields
  preferred_time VARCHAR(20),
  reason TEXT,
  
  -- Metadata
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lead notes table
CREATE TABLE IF NOT EXISTS lead_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  admin_id UUID REFERENCES admin_users(id),
  note TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create WhatsApp interactions table
CREATE TABLE IF NOT EXISTS whatsapp_interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  action VARCHAR(50) NOT NULL DEFAULT 'whatsapp_click',
  message_type VARCHAR(50) NOT NULL DEFAULT 'general',
  page_url TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id VARCHAR(100) UNIQUE NOT NULL,
  user_name VARCHAR(100),
  user_email VARCHAR(255),
  user_phone VARCHAR(20),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'waiting_for_human', 'completed')),
  context JSONB DEFAULT '{}',
  lead_captured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  message_id VARCHAR(100) NOT NULL,
  type VARCHAR(10) NOT NULL CHECK (type IN ('user', 'bot')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create property views table
CREATE TABLE IF NOT EXISTS property_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id INTEGER NOT NULL,
  property_name VARCHAR(255),
  developer VARCHAR(255),
  area VARCHAR(255),
  ip_address INET,
  user_agent TEXT,
  page_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_property_id ON leads(property_id) WHERE property_id IS NOT NULL;

-- Admin users indexes
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);

-- Lead notes indexes
CREATE INDEX IF NOT EXISTS idx_lead_notes_lead_id ON lead_notes(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_notes_admin_id ON lead_notes(admin_id);
CREATE INDEX IF NOT EXISTS idx_lead_notes_created_at ON lead_notes(created_at DESC);

-- WhatsApp interactions indexes
CREATE INDEX IF NOT EXISTS idx_whatsapp_interactions_action ON whatsapp_interactions(action);
CREATE INDEX IF NOT EXISTS idx_whatsapp_interactions_message_type ON whatsapp_interactions(message_type);
CREATE INDEX IF NOT EXISTS idx_whatsapp_interactions_created_at ON whatsapp_interactions(created_at DESC);

-- Chat sessions indexes
CREATE INDEX IF NOT EXISTS idx_chat_sessions_session_id ON chat_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_status ON chat_sessions(status);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_created_at ON chat_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_email ON chat_sessions(user_email);

-- Chat messages indexes
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_type ON chat_messages(type);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at DESC);

-- Property views indexes
CREATE INDEX IF NOT EXISTS idx_property_views_property_id ON property_views(property_id);
CREATE INDEX IF NOT EXISTS idx_property_views_developer ON property_views(developer);
CREATE INDEX IF NOT EXISTS idx_property_views_area ON property_views(area);
CREATE INDEX IF NOT EXISTS idx_property_views_created_at ON property_views(created_at DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at 
    BEFORE UPDATE ON leads 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create RLS (Row Level Security) policies
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_views ENABLE ROW LEVEL SECURITY;

-- Leads policies
CREATE POLICY "Service role can do everything on leads" ON leads
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Authenticated users can read leads" ON leads
    FOR SELECT USING (auth.role() = 'authenticated');

-- Admin users policies
CREATE POLICY "Service role can do everything on admin_users" ON admin_users
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Authenticated users can read admin_users" ON admin_users
    FOR SELECT USING (auth.role() = 'authenticated');

-- Lead notes policies
CREATE POLICY "Service role can do everything on lead_notes" ON lead_notes
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Authenticated users can read lead_notes" ON lead_notes
    FOR SELECT USING (auth.role() = 'authenticated');

-- WhatsApp interactions policies
CREATE POLICY "Service role can do everything on whatsapp_interactions" ON whatsapp_interactions
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Authenticated users can read whatsapp_interactions" ON whatsapp_interactions
    FOR SELECT USING (auth.role() = 'authenticated');

-- Chat sessions policies
CREATE POLICY "Service role can do everything on chat_sessions" ON chat_sessions
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Authenticated users can read chat_sessions" ON chat_sessions
    FOR SELECT USING (auth.role() = 'authenticated');

-- Chat messages policies
CREATE POLICY "Service role can do everything on chat_messages" ON chat_messages
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Authenticated users can read chat_messages" ON chat_messages
    FOR SELECT USING (auth.role() = 'authenticated');

-- Property views policies
CREATE POLICY "Service role can do everything on property_views" ON property_views
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Authenticated users can read property_views" ON property_views
    FOR SELECT USING (auth.role() = 'authenticated');

-- Create a view for lead statistics
CREATE OR REPLACE VIEW lead_stats AS
SELECT 
    COUNT(*) as total_leads,
    COUNT(*) FILTER (WHERE status = 'new') as new_leads,
    COUNT(*) FILTER (WHERE status = 'contacted') as contacted_leads,
    COUNT(*) FILTER (WHERE status = 'qualified') as qualified_leads,
    COUNT(*) FILTER (WHERE status = 'closed') as closed_leads,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE) as today_leads,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as week_leads,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as month_leads
FROM leads;

-- Create a view for source statistics
CREATE OR REPLACE VIEW source_stats AS
SELECT 
    source,
    COUNT(*) as lead_count,
    COUNT(*) FILTER (WHERE status = 'qualified') as qualified_count,
    ROUND(
        (COUNT(*) FILTER (WHERE status = 'qualified')::DECIMAL / COUNT(*)) * 100, 
        2
    ) as conversion_rate
FROM leads
GROUP BY source
ORDER BY lead_count DESC;

-- Insert sample data (optional - remove in production)
-- INSERT INTO leads (name, email, phone, subject, message, source, status) VALUES
-- ('John Doe', 'john@example.com', '+971501234567', 'buying', 'I am interested in buying a villa in Dubai Marina.', 'contact-page', 'new'),
-- ('Sarah Smith', 'sarah@example.com', '+971507654321', 'investment', 'Looking for investment opportunities in Downtown Dubai.', 'property-inquiry', 'contacted'),
-- ('Ahmed Al-Rashid', 'ahmed@example.com', '+971509876543', 'selling', 'Want to sell my apartment in JBR.', 'contact-page', 'qualified');

-- Grant necessary permissions
GRANT ALL ON leads TO service_role;
GRANT ALL ON admin_users TO service_role;
GRANT ALL ON lead_notes TO service_role;
GRANT ALL ON whatsapp_interactions TO service_role;
GRANT ALL ON chat_sessions TO service_role;
GRANT ALL ON chat_messages TO service_role;
GRANT ALL ON property_views TO service_role;

GRANT SELECT ON leads TO authenticated;
GRANT SELECT ON admin_users TO authenticated;
GRANT SELECT ON lead_notes TO authenticated;
GRANT SELECT ON whatsapp_interactions TO authenticated;
GRANT SELECT ON chat_sessions TO authenticated;
GRANT SELECT ON chat_messages TO authenticated;
GRANT SELECT ON property_views TO authenticated;
GRANT SELECT ON lead_stats TO authenticated;
GRANT SELECT ON source_stats TO authenticated;

-- Insert default admin user (password: admin123 - CHANGE THIS IN PRODUCTION!)
-- Password hash for 'admin123' using bcrypt with 12 rounds
INSERT INTO admin_users (email, password_hash, name, role) VALUES
('admin@jayrealestate.ae', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.Gm.F5W', 'JAY Admin', 'admin')
ON CONFLICT (email) DO NOTHING;
