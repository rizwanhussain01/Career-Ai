-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

-- Profiles table policies
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Quiz results policies
CREATE POLICY "Users can view own quiz results" ON quiz_results
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz results" ON quiz_results
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quiz results" ON quiz_results
    FOR UPDATE USING (auth.uid() = user_id);

-- AI analysis policies
CREATE POLICY "Users can view own AI analysis" ON ai_analysis
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own AI analysis" ON ai_analysis
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Mentor conversations policies
CREATE POLICY "Users can view own conversations" ON mentor_conversations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversations" ON mentor_conversations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conversations" ON mentor_conversations
    FOR UPDATE USING (auth.uid() = user_id);

-- Mentor messages policies
CREATE POLICY "Users can view own messages" ON mentor_messages
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own messages" ON mentor_messages
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Document verifications policies
CREATE POLICY "Users can view own documents" ON document_verifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents" ON document_verifications
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents" ON document_verifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Feedback policies
CREATE POLICY "Users can view own feedback" ON feedback
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own feedback" ON feedback
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own feedback" ON feedback
    FOR UPDATE USING (auth.uid() = user_id);

-- Quiz questions policies (public read for all authenticated users)
CREATE POLICY "Authenticated users can view quiz questions" ON quiz_questions
    FOR SELECT USING (auth.role() = 'authenticated');

-- Service role can manage quiz questions
CREATE POLICY "Service role can manage quiz questions" ON quiz_questions
    FOR ALL USING (auth.role() = 'service_role');
