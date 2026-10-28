# Runs the review dashboard on any container host (Render, Railway, Fly.io).
# Mount a persistent disk at /data so renders and approvals survive restarts.
FROM python:3.13-slim
RUN apt-get update \
    && apt-get install -y --no-install-recommends ffmpeg fonts-liberation \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
ENV HOST=0.0.0.0 PORT=4319 REELS_DATA=/data
RUN mkdir -p /data
EXPOSE 4319
CMD ["python3", "review/server.py"]
