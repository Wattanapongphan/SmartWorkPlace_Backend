#!/bin/bash

# พอร์ตที่ใช้
PORT=3000

# หา PID ของโปรเซสที่ใช้พอร์ตนี้
PID=$(lsof -ti tcp:$PORT)

# ถ้ามีโปรเซสที่ใช้พอร์ตนี้ ให้ kill ก่อน
if [ -n "$PID" ]; then
  echo "Killing process on port $PORT (PID: $PID)..."
  kill -9 $PID
else
  echo "No process running on port $PORT."
fi

# รัน npm start
echo "Starting the project..."
npm start
