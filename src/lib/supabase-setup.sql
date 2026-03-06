-- Create boards table
CREATE TABLE boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create strokes table
CREATE TABLE strokes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id UUID NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_color TEXT NOT NULL,
  tool TEXT NOT NULL CHECK (tool IN ('pen', 'eraser', 'rectangle', 'circle', 'line', 'arrow')),
  color TEXT,
  stroke_width INT,
  points JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  version INT DEFAULT 1
);

-- Create user_presence table (real-time cursors)
CREATE TABLE user_presence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id UUID NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_color TEXT NOT NULL,
  cursor_x FLOAT,
  cursor_y FLOAT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_strokes_board_id ON strokes(board_id);
CREATE INDEX idx_user_presence_board_id ON user_presence(board_id);
CREATE INDEX idx_strokes_created_at ON strokes(created_at DESC);

-- Enable Realtime on strokes and user_presence
ALTER PUBLICATION supabase_realtime ADD TABLE strokes;
ALTER PUBLICATION supabase_realtime ADD TABLE user_presence;
